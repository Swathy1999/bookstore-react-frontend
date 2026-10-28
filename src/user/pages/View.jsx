import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { FaBackward, FaEye, FaCamera } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { viewBookAPI } from "../../services/allServices";
import { loadStripe } from "@stripe/stripe-js";

function View() {
  const { id } = useParams();

  const [bookDetails, setBookDetails] = useState({});
  const [modal, setModal] = useState(false);

  // Get book details from the backend
  const getBookDetails = async () => {
    try {
      const result = await viewBookAPI(id);

      if (result.status == 200) {
        setBookDetails(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const makePayment = async () => {
    // console.log(import.meta.env.VITE_STRIPE_PK);
    // load stripe
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);
    console.log(stripe);
    //api call
    const result = await buyBookAPI(id);
    window.location.href = result.data.chekoutURL;
  };
  // Call the function when the page loads
  useEffect(() => {
    getBookDetails();
  }, [id]);

  return (
    <>
      <Header />

      <div className="md:m-10 m-5">
        <div className="border p-5 shadow border-gray-400">
          <div className="md:grid grid-cols-4 gap-x-10">
            {/* Book Image */}
            <div className="col-span-1">
              <img
                className="w-full"
                src={bookDetails.imageURL}
                alt={bookDetails.title}
              />
            </div>

            {/* Book Details */}
            <div className="col-span-3">
              <div className="flex justify-between mt-5 md:mt-8">
                <h3 className="text-2xl font-bold">{bookDetails.title}</h3>

                <button
                  onClick={() => setModal(true)}
                  className="text-gray-400"
                >
                  <FaEye />
                </button>
              </div>

              <h2 className="text-blue-800 font-bold text-xl my-5">
                {bookDetails.author}
              </h2>

              <div className="md:grid grid-cols-3 gap-5 my-10">
                <p className="font-bold">Publisher: {bookDetails.publisher}</p>

                <p className="font-bold">Language: {bookDetails.language}</p>

                <p className="font-bold">No. Of Pages: {bookDetails.pages}</p>

                <p className="font-bold">Category: {bookDetails.category}</p>

                <p className="font-bold">ISBN: {bookDetails.isbn}</p>

                <p className="font-bold">Seller: {bookDetails.sellerMail}</p>
              </div>

              {/* Abstract */}
              <div>
                <h4 className="font-bold text-lg">Abstract:</h4>

                <p className="mt-2">{bookDetails.abstract}</p>
              </div>

              {/* Buttons */}
              <div className="flex justify-end mt-5">
                <Link
                  to="/books"
                  className="bg-blue-900 text-white p-2 font-black flex items-center"
                >
                  <FaBackward className="me-2" />
                  Back
                </Link>

                <button onClick={(makePayment)} className="bg-green-900 text-white font-black ms-5 p-2">
                  Buy {bookDetails.discountPrice}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Image Modal */}
        {modal && (
          <div
            className="fixed inset-0 z-50 bg-gray-500/75 overflow-y-auto"
            onClick={() => setModal(false)}
          >
            <div className="flex justify-center items-center min-h-screen p-4">
              <div
                className="bg-white rounded-2xl w-full max-w-4xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="bg-black text-white p-3 rounded-t-2xl flex justify-between">
                  <h3>Book Image</h3>
                  <button onClick={() => setModal(false)}>X</button>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-blue-600 flex items-center">
                    <FaCamera className="me-2" />
                    Book Image
                  </p>

                  <div className="flex justify-center my-4">
                    {bookDetails.imageURL ? (
                      <img
                        src={bookDetails.imageURL}
                        alt="Book"
                        className="w-48 h-60 object-contain border"
                      />
                    ) : (
                      <p>No book image available.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default View;
