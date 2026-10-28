import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaFacebookF, FaUser } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { FaGear } from "react-icons/fa6";
import { FaPowerOff } from "react-icons/fa6";
import axiosInstance from "../../api/axiosInstance";

function Header() {
  const [toggle, setToggle] = useState(false);
  const [dp, setDp] = useState("");
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [dropDown, setDropDown] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("token") && sessionStorage.getItem("user")) {
      const userToken = sessionStorage.getItem("token");
      const user = JSON.parse(sessionStorage.getItem("user"));
      setToken(userToken);
      setDp(user.picture);
      setUserId(user._id);
    }
  }, [token]);

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
          {!token ? (
            <Link
              to="/login"
              className="border border-black rounded px-3 ms-3 flex items-center"
            >
              <FaUser className="me-1" />
              Login
            </Link>
          ) : (
            <div>
              <button
                onClick={() => setDropDown(!dropDown)}
                className="rounded p-1 hover:bg-gray-100"
              >
                <img
                  width={"40px"}
                  height={"40px"}
                  style={{ borderRadius: "50%" }}
                  src={
                    dp == ""
                      ? "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
                      : dp.startsWith("https://lh3.googleusercontent.com/")
                        ? dp
                        : `${axiosInstance.defaults.baseURL}/uploads/${dp}`
                  }
                  alt="Profile"
                />
              </button>
              {/* dropdownmenu */}
              {dropDown && (
                <div className="absolute right-4 z-10 mt-2 w-40 bg-white shadow rounded ring-1 ring-black/5 p-2 focus:outline-hidden">
                  {/* Profile */}
                  <Link
                    to={`/profile/${userId}`}
                    className="flex items-center text-gray-600 text-sm px-3 py-2"
                  >
                    <FaGear className="text-gray-500" />
                    Profile
                  </Link>

                  {/* Logout */}
                  <button className="flex items-center text-gray-600 text-sm px-3 py-2">
                    <FaPowerOff className="text-gray-500" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Part */}

      <nav className="bg-black w-full p-3 text-white md:flex justify-center items-center">
        {/* Menu icon + login button */}
        <div className="flex justify-between items-center text-2xl py-2 md:hidden">
          <button onClick={() => setToggle(!toggle)}>
            <IoMenu />
          </button>
          {!token ? (
            <Link
              to="/login"
              className="border border-black rounded px-3 ms-3 flex items-center"
            >
              <FaUser className="me-1" />
              Login
            </Link>
          ) : (
            <div>
              <button
                onClick={() => setDropDown(!dropDown)}
                className="rounded p-1 hover:bg-gray-100"
              >
                <img
                  width={"40px"}
                  height={"40px"}
                  style={{ borderRadius: "50%" }}
                  src={
                    dp == ""
                      ? "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
                      : dp.startsWith("https://lh3.googleusercontent.com/")
                        ? dp
                        : `${axiosInstance.defaults.baseURL}/uploads/${dp}`
                  }
                  alt="Profile"
                />
              </button>
              {/* dropdownmenu */}
              {dropDown && (
                <div className="absolute right-4 z-10 mt-2 w-40 bg-white shadow rounded ring-1 ring-black/5 p-2 focus:outline-hidden">
                  {/* Profile */}
                  <Link
                    to={`/profile/${userId}`}
                    className="flex items-center text-gray-600 text-sm px-3 py-2"
                  >
                    <FaGear className="text-gray-500" />
                    Profile
                  </Link>

                  {/* Logout */}
                  <button className="flex items-center text-gray-600 text-sm px-3 py-2">
                    <FaPowerOff className="text-gray-500" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
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
