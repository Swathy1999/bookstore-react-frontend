import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { addBookAPI, getBookDetailsAIAPI } from "../../services/allServices";
import useDebounce from "../../hooks/useDebounce";
function UploadBook() {
  const initialBookDetails = {
    title: "",
    author: "",
    imageURL: "",
    pages: "",
    price: "",
    discountPrice: "",
    abstract: "",
    publisher: "",
    isbn: "",
    language: "",
    category: "",
    uploadImages: [],
  };

  const [bookDetails, setBookDetails] = useState(initialBookDetails);
  const [previewList, setPreviewList] = useState([]);
  const [preview, setPreview] = useState("");
  const debounceTitleSearch = useDebounce(bookDetails.title, 1000);

  useEffect(() => {
    if (debounceTitleSearch) {
      console.log("API call");
      generateBookAbstractAI(debounceTitleSearch);
    }
  }, [debounceTitleSearch]);

 

const generateBookAbstractAI = async () => {
  try {
    const result = await getBookDetailsAIAPI(debounceTitleSearch);
    console.log("API Response:", result.data);

    if (result.data?.content) {
      setBookDetails({
        ...bookDetails,
        abstract: result.data.content.abstract,
        isbn: result.data.content.isbn,
        author: result.data.content.author
      });
    } else {
      console.error("Abstract not found in API response:", result.data);
    }
  } catch (error) {
    console.error(
      "Error generating book abstract:",
      error.response?.data || error.message
    );
  }
};


  // Handle input changes
  const handleChange = (e) => {
    setBookDetails({
      ...bookDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Upload maximum 3 images
  const handleUploadImages = (e) => {
    const files = Array.from(e.target.files);
    const remaining = 3 - previewList.length;
    const images = files
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, remaining);

    if (images.length == 0) {
      toast.warning("Select valid images (maximum 3)");
      e.target.value = "";
      return;
    }

    const previews = images.map((file) => URL.createObjectURL(file));

    setBookDetails({
      ...bookDetails,
      uploadImages: [...bookDetails.uploadImages, ...images],
    });

    setPreviewList([...previewList, ...previews]);
    setPreview(previews[previews.length - 1]);
    e.target.value = "";
  };

  // Remove an image
  const handleRemoveImage = (index) => {
    URL.revokeObjectURL(previewList[index]);

    setBookDetails({
      ...bookDetails,
      uploadImages: bookDetails.uploadImages.filter((_, i) => i !== index),
    });

    const updated = previewList.filter((_, i) => i !== index);
    setPreviewList(updated);

    if (preview == previewList[index]) {
      setPreview(updated[updated.length - 1] || "");
    }
  };

  // Reset form
  const resetForm = () => {
    previewList.forEach((url) => URL.revokeObjectURL(url));
    setBookDetails({ ...initialBookDetails });
    setPreviewList([]);
    setPreview("");
  };

  // Add book
  const handleAddBook = async () => {
    const { uploadImages, ...details } = bookDetails;

    if (
      Object.values(details).some((value) => !value) ||
      uploadImages.length == 0
    ) {
      toast.info("Please fill all fields");
      return;
    }

    const formData = new FormData();

    Object.entries(details).forEach(([key, value]) => {
      formData.append(key, value);
    });

    uploadImages.forEach((file) => {
      formData.append("uploadImages", file);
    });

    try {
      const result = await addBookAPI(formData);

      if (result.status == 200 || result.status == 201) {
        toast.success("Book added successfully!");
        resetForm();
      } else {
        toast.error("Failed to add book");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="p-10 my-20 mx-5 bg-gray-200 rounded">
      <h1 className="text-center text-3xl font-medium">Upload Book Details</h1>

      <div className="md:grid grid-cols-2 mt-10">
        <div className="px-3">
          {[
            ["title", "Book Title"],
            ["author", "Author"],
            ["imageURL", "Book Cover Image URL"],
            ["pages", "Total Pages"],
            ["price", "Original Price"],
            ["discountPrice", "Discount Price"],
          ].map(([name, placeholder]) => (
            <input
              key={name}
              type={
                ["pages", "price", "discountPrice"].includes(name)
                  ? "number"
                  : "text"
              }
              name={name}
              value={bookDetails[name]}
              onChange={handleChange}
              placeholder={placeholder}
              className="w-full p-2 rounded bg-white mb-3"
            />
          ))}

          <textarea
            name="abstract"
            value={bookDetails.abstract}
            onChange={handleChange}
            placeholder="Abstract"
            className="w-full p-2 rounded bg-white mb-3"
            rows="5"
          />
        </div>

        <div className="px-3">
          {[
            ["publisher", "Publisher"],
            ["isbn", "ISBN"],
            ["language", "Language"],
            ["category", "Category"],
          ].map(([name, placeholder]) => (
            <input
              key={name}
              name={name}
              value={bookDetails[name]}
              onChange={handleChange}
              placeholder={placeholder}
              className="w-full p-2 rounded bg-white mb-3"
            />
          ))}

          <div className="text-center mt-5">
            <img
              src={
                preview ||
                bookDetails.imageURL ||
                "https://www.freeiconspng.com/uploads/upload-icon-15.png"
              }
              alt="Book Preview"
              className="w-48 h-48 object-contain mx-auto"
            />

            {previewList.length < 3 && (
              <label className="inline-block mt-4 bg-blue-500 text-white p-3 rounded cursor-pointer">
                <FaPlus className="inline mr-2" />
                Upload Images ({previewList.length}/3)
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={handleUploadImages}
                />
              </label>
            )}

            <div className="flex justify-center gap-3 flex-wrap mt-5">
              {previewList.map((url, index) => (
                <div key={url} className="relative">
                  <img
                    src={url}
                    alt="Book"
                    onClick={() => setPreview(url)}
                    className="w-20 h-20 object-cover rounded cursor-pointer"
                  />

                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-5 md:col-span-2">
          <button
            onClick={resetForm}
            className="bg-blue-500 text-white p-3 rounded"
          >
            Reset
          </button>

          <button
            onClick={handleAddBook}
            className="bg-green-500 text-white p-3 rounded"
          >
            Add Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadBook;
