import React, { useState } from "react";
import Header from "../components/Header";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

function Books() {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <Header />

      <div className="flex flex-col justify-center items-center my-5">
        <h1 className="text-3xl font-bold my-5">All Books</h1>

        <div className="flex my-5">
          <input
            type="text"
            className="p-2 border border-gray-200 w-100 rounded"
            placeholder="Search by Book Title"
          />

          <button className="p-2 bg-blue-800 text-white ms-1 rounded">
            Search
          </button>
        </div>
      </div>

      {/* Grid - Filter & Book Card */}
      <div className="md:grid grid-cols-4 p-5 md:px-40 mb-10">

        {/* Filter */}
        <div className="col-span-1">

          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">Filter</h1>

            <button
              onClick={() => setToggle(!toggle)}
              className="font-bold text-2xl md:hidden"
            >
              <FaBars />
            </button>
          </div>

          {/* Filter category */}
          <div className={toggle ? "block" : "hidden md:block"}>

            <div className="mt-3">
              <input
                type="radio"
                name="filter"
                id="no-filter"
              />
              <label htmlFor="no-filter" className="ms-3">
                All
              </label>
            </div>

            <div className="mt-3">
              <input
                type="radio"
                name="filter"
                id="filter"
              />
              <label htmlFor="filter" className="ms-3">
                Book Category
              </label>
            </div>

          </div>
        </div>

        {/* Book Card */}
        <div className="col-span-3">
          <div className="md:grid grid-cols-4 md:my-0">
          {/* Card */}
          <div className="shadow rounded p-3 m-4 md:my-0">
            <img
              width="100%"
              height="300px"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUvVOFZLhBNiHITtyWWOXryyw_GOYYR6qOw8iJTABy2g&s=10"
              alt="Book"
            />

            <div className="flex flex-col justify-center items-center mt-4">
              <h2 className="text-blue-600 font-bold text-xl">Author</h2>

              <h3 className="text-lg">Title</h3>

              <Link to='/book/id' className='font-bold bg-blue-500 p-2 text-white mt-2'>View Book</Link>
            </div>
          </div>
        </div>
        </div>

      </div>
    </>
  );
}

export default Books;