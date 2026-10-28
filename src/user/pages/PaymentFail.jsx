
import React from "react";
import { Link } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

function PaymentFailure() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-red-50 p-5">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md w-full">

        <FaTimesCircle className="text-red-500 text-7xl mx-auto mb-5" />

        <h1 className="text-3xl font-bold text-red-600">
          Payment Failed!
        </h1>

        <p className="text-gray-600 my-4">
          Sorry, your payment could not be completed. Please try again.
        </p>

        <Link
          to="/checkout"
          className="inline-block bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
        >
          Try Again
        </Link>

      </div>
    </div>
  );
}

export default PaymentFailure;
