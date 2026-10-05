import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-black text-white px-6 md:px-12 py-12">

      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">

        {/* About Us */}
        <div>
          <h3 className="text-xl font-bold mb-6">
            About US
          </h3>

          <p className="text-lg leading-8 text-justify">
            We believe books are more than just pages - they are
            windows into new worlds, teachers of wisdom, and
            companions for life. Our journey began with a passion
            for storytelling and a mission to make reading
            accessible, enjoyable, and inspiring for everyone.
          </p>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-bold mb-6">
            NEWS LETTER
          </h3>

          <p className="text-lg mb-7">
            Stay updated with our latest trends
          </p>

          <div className="flex w-full max-w-md">
            <input
              type="email"
              placeholder="E Mail"
              className="flex-1 px-4 py-4 bg-white text-black outline-none"
            />

            <button className="bg-yellow-500 px-5 flex items-center justify-center hover:bg-yellow-400">
              <FaArrowRight className="text-white text-xl" />
            </button>
          </div>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-xl font-bold mb-6">
            FOLLOW US
          </h3>

          <p className="text-lg mb-7">
            Let us be social
          </p>

          <div className="flex gap-7 text-xl">
            <FaFacebookF className="cursor-pointer hover:text-yellow-500" />
            <FaInstagram className="cursor-pointer hover:text-yellow-500" />
            <FaXTwitter className="cursor-pointer hover:text-yellow-500" />
            <FaEnvelope className="cursor-pointer hover:text-yellow-500" />
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-12 pt-8 text-center">
        <p className="text-sm md:text-lg">
          Copyright &copy; 2026 All rights reserved | This website is made
          with by Luminar Technolab
        </p>
      </div>

    </footer>
  );
}

export default Footer;