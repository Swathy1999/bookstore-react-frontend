import React from "react";
import { FaPlus } from "react-icons/fa";

function UploadBook() {
  return (
    <div className="p-10 my-20 mx-5 bg-gray-200">
      <h1 className="text-center text-3xl font-medium">Upload Book Details</h1>

      <div className="md:grid grid-cols-2 mt-10 w-full">
        <div className="px-3">
          <div className="mb-3">
            <input
              type="text"
              placeholder="Book Title"
              className="w-full p-2 rounded bg-white"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Author"
              className="w-full p-2 rounded bg-white"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Book Cover Image"
              className="w-full p-2 rounded bg-white"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Total Pages"
              className="w-full p-2 rounded bg-white"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Original Price"
              className="w-full p-2 rounded bg-white"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Discount Price"
              className="w-full p-2 rounded bg-white"
            />
          </div>
          <div className="mb-3">
            <textarea
              type="text"
              placeholder="Abstract"
              rows={"5"}
              className="w-full p-2 rounded bg-white"
            />
          </div>
        </div>
        <div className="px-3">
          <div className="mb-3">
            <input
              type="text"
              placeholder="Publisher"
              className="w-full p-2 rounded bg-white"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="ISBN"
              className="w-full p-2 rounded bg-white"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Language"
              className="w-full p-2 rounded bg-white"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Category"
              className="w-full p-2 rounded bg-white"
            />
          </div>

          {/* upload Book image */}
          <div className="mb-3 flex justify-center items-center mt-10">
            <label htmlFor="bookImage">
              <input type="file" id="bookImage" hidden />
              <img
                style={{ width: "245px", height: "50%" }}
                src="https://media.karanbajaj.com/karan-live/wp-content/uploads/2015/08/18160701/book-stack.jpg"
                alt="Book not Found"
              />
            </label>
          </div>

          {/* preview of uploaded books */}
          <div className="flex justify-center items-center">
            <img
              width={"70px"}
              height={"70px"}
              src="https://media.karanbajaj.com/karan-live/wp-content/uploads/2015/08/18160701/book-stack.jpg"
              alt="Book Image"
            />
            <label htmlFor="bookUpload">
              <input type="file" id="bookUpload" hidden />
              <FaPlus className="text-3xl ms-2" />
            </label>
          </div>
        </div>

        <div className="flex md:justify-end justify-center w-full p-5 mt-5">
          <button className="bg-blue-500 text-white p-3 rounded me-2">
            Reset
          </button>
          <button className="bg-green-500 text-white p-3 rounded">
            Add Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadBook;
