import React from "react";
import { Link } from "react-router-dom";
import Header from "../user/components/Header";


function Pnf() {
  return (
    <>
      <Header />
<div className="flex flex-col justify-center items-center text-center min-h-screen p-5">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZrrzI2M90-aeN-cNbwdIuNYAc3JnZ1HOTrxvnv8y6eA&s=10"
          alt="Page Not Found"
          className="w-75 mb-5"
        />

        <h2 className="text-3xl font-bold text-blue-800">
          Page Not Found
        </h2>

        <p className="text-gray-500 my-3">
          Sorry, the page you are looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="bg-blue-800 text-white px-5 py-2 rounded"
        >
          Back to Home
        </Link>
      </div>
    </>
  );
}

export default Pnf