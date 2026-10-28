
import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

function PaymentSuccess() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-green-50 p-5">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md w-full">

        <FaCheckCircle className="text-green-500 text-7xl mx-auto mb-5" />

        <h1 className="text-3xl font-bold text-green-600">
          Payment Successful!
        </h1>

        <p className="text-gray-600 my-4">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        <Link
          to="/"
          className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
        >
          Continue Shopping
        </Link>

      </div>
    </div>
  );
}

export default PaymentSuccess;
