import React from "react";

function BookStatus() {
  return (
    <div className="p-10 my-15 shadow rounded">
      {/* duliplicate book*/}

      <div className="p-5 rounded mt-4 bg-blue-100">
        <div className="md:grid grid-cols-[3fr_1fr]">
          <div className="md:grid grid-cols-[3fr_1fr]">
            <div className="px-4">
              <h1 className="text-2xl">Title</h1>
              <h2 className="text-xl">Author</h2>
              <h3 className="text-lg text-blue-788">$ Discount Price</h3>
              <p className="text-justify">Abstract</p>
              {/* status image */}
              <div className="flex my-3">
                <img
                  width={"120px"}
                  height={"50%"}
                  src="https://png.pngtree.com/png-vector/20260821/ourmid/pngtree-red-pending-stamp-approval-status-business-document-label-png-image_19951470.webp"
                  alt=" Pending"
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
              </div>
            </div>
            <div className="px-4 mt-4 md:mt-0">
                <img
                  className="w-full"
                  src="https://media.karanbajaj.com/karan-live/wp-content/uploads/2015/08/18160701/book-stack.jpg"
                  alt=" Book"
                />
                <div className="mt-4 flex justify-end">
                  <button className="bg-red-700 text-white p-2 rounded">
                    DELETE
                  </button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookStatus;
