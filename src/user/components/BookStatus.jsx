import React, { useEffect, useState } from "react";
import { getUserBooksAPI } from "../../services/allServices";
import { deleteUserBookAPI } from "../../services/allServices";

function BookStatus() {
  const [uploadBooks, setUploadBooks] = useState([]);

  useEffect(() => {
    getUploadBooks();
  }, []);

  const getUploadBooks = async () => {
    try {
      const result = await getUserBooksAPI();

      if (result.status == 200) {
        setUploadBooks(result.data);
      }
    } catch (error) {
      console.log("Error fetching books:", error);
    }
  };

const deleteBook = async(id)=>{
const result = await deleteUserBookAPI(id)
getUploadBooks()
}
  return (
    <div className="p-10 my-15 shadow rounded">
      {/* duplicate book */}

      {uploadBooks.map((book) => (
        <div key={book._id} className="p-5 rounded mt-4 bg-blue-100">
          <div className="md:grid grid-cols-[3fr_1fr]">
            <div className="md:grid grid-cols-[3fr_1fr]">
              <div className="px-4">
                <h1 className="text-2xl">{book.title}</h1>
                <h2 className="text-xl">{book.author}</h2>
                <h3 className="text-lg text-blue-788">
                  $ {book.discountPrice}
                </h3>
                <p className="text-justify">{book.abstract}</p>

                {/* status image */}
                {/* <div className="flex my-3">
                  <img
                    width={"120px"}
                    height={"50%"}
                    src="https://png.pngtree.com/png-vector/20260821/ourmid/pngtree-red-pending-stamp-approval-status-business-document-label-png-image_19951470.webp"
                    alt="Pending"
                  />
                  <img
                    width={"120px"}
                    height={"50%"}
                    src="https://png.pngtree.com/png-vector/20250921/ourmid/pngtree-green-approved-stamp-png-image_17542466.webp"
                    alt="Approved"
                  />
                  <img
                    width={"120px"}
                    height={"50%"}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1-DRPmi3w7tIxIlWHr57cGTLJd8v9tVJ5g1fMtnEFRQ&s=10"
                    alt="Sold"
                  />
                </div> */}

                <div className="flex my-3">
                  {book?.status == "pending" ? (
                    <img
                      width={"120px"}
                      height={"120px"}
                      src="https://t4.ftcdn.net/jpg/15/42/78/73/360_F_1542787314_EJF9wn3UH9d8BvShQ6VSKKYgaSQByuS.png"
                      alt="Pending"
                    />
                  ) : book?.status == "approved" ? (
                    <img
                      width={"120px"}
                      height={"120px"}
                      src="https://static.vecteezy.com/system/resources/previews/024/382/871/non_2x/approved-sign-symbol-icon-label-stamp-green-round-design-transparent-background-free-png.png"
                      alt="Approved"
                    />
                  ) : book?.status == "sold" ? (
                    <img
                      width={"120px"}
                      height={"120px"}
                      src="https://cdn-icons-png.flaticon.com/512/6188/6188726.png"
                      alt="Sold"
                    />
                  ) : null}
                </div>
              </div>

              <div className="px-4 mt-4 md:mt-0">
                <img className="w-full" src={book?.imageURL} alt="Book" />
                <div className="mt-4 flex justify-end">
                  <button
                    className="bg-red-700 text-white p-2 rounded"
                    onClick={() => deleteBook(book._id)}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookStatus;
