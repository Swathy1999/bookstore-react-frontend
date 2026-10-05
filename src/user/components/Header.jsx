import React, { useState } from "react";

import { Link } from "react-router-dom";

import { FaInstagram, FaTwitter, FaFacebookF, FaUser } from "react-icons/fa";

import { IoMenu } from "react-icons/io5";

function Header() {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      {/* Header Top Part */}

      <div className="grid grid-cols-3 p-3">
        {/* Logo */}
        <div className="flex items-center">
          <img
            width="50px"
            height="50px"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgLZizTiX__YdAER0r2uSJuAzdOOIY2wzFjsa8FLj49Q&s=10"
            alt="BOOKS"
          />

          {/* Mobile title */}
          <h1 className="text-2xl font-bold ms-2 md:hidden">BOOKSTORE</h1>
        </div>

        {/* Desktop title */}
        <div className="hidden md:flex justify-center items-center">
          <h1 className="text-3xl font-bold">BOOKSTORE</h1>
        </div>

        {/* Social media + Login */}
        <div className="hidden md:flex justify-end items-center">
          <FaInstagram />
          <FaTwitter className="mx-2" />
          <FaFacebookF />

          {/* Login Link */}
          <Link
            to="/login"
            className="border border-black rounded px-3 ms-3 flex items-center"
          >
            <FaUser className="me-1" />
            Login
          </Link>
        </div>
      </div>

      {/* Navigation Part */}

      <nav className="bg-black w-full p-3 text-white md:flex justify-center items-center">
        {/* Menu icon + login button */}
        <div className="flex justify-between items-center text-2xl py-2 md:hidden">
          <button onClick={() => setToggle(!toggle)}>
            <IoMenu />
          </button>

          <Link
            to="/login"
            className="border border-black rounded px-3 ms-3 flex items-center"
          >
            <FaUser className="me-1" />
            Login
          </Link>
        </div>

        <ul className={toggle ? "flex flex-col" : "md:flex hidden"}>
          <li>
            <Link to="/" className="md:mx-4 mt-2 md:mt-8">
              HOME
            </Link>
          </li>

          <li>
            <Link to="/books" className="md:mx-4 mt-2 md:mt-8">
              BOOKS
            </Link>
          </li>

          <li>
            <Link to="/contact" className="md:mx-4 mt-2 md:mt-8">
              CONTACT
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
