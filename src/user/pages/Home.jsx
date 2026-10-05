import React from "react";
import Header from "../components/Header";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Header />

      {/* Banner */}
      <div
        style={{ height: "600px" }}
        className="bg-[url('/banner.png')] bg-cover bg-center text-white"
      >
        <div
          style={{
            height: "600px",
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
          className="w-full flex flex-col justify-center items-center"
        >
          <h1 className="text-6xl font-bold">Wonderful Books</h1>

          <p className="my-2">Gift your family and friends a book</p>

          {/* Search */}
          <div className="bg-white rounded-full p-2 w-1/3 flex mt-3">
            <input
              type="text"
              placeholder="Search A Book"
              className="w-full outline-none text-black px-2"
            />

            <FaSearch className="text-gray-500 mt-1 mr-2" />
          </div>
        </div>
      </div>

      {/* New Arrivals */}
      <section className="px-5 md:px-20 my-5 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">NEW ARRIVALS</h1>

        <h2 className="text-3xl my-2">Explore Our Latest Collection</h2>

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

              <p className="font-bold text-red-500">Price</p>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="text-center my-10">
          <Link to="/books" className="bg-black p-3 text-white font-black">
            Explore More...
          </Link>
        </div>
      </section>

      {/* Authors */}
      <section className="md:grid grid-cols-2 items-center gap-10 p-5 md:px-40">
        <div className="text-center">
          <h2 className="text-2xl font-bold">FEATURED AUTHORS</h2>

          <h3 className="text-xl">Captivates with every word</h3>

          <p className="my-5 text-justify">
            Welcome to the Author Spotlight section of our bookstore website!
            This feature is designed to celebrate writers, showcase their
            creative journeys, and help readers discover the minds behind their
            favorite books.
          </p>

          <p className="text-justify">Our Author Features include:</p>

          <p className="text-justify my-3">
            <span className="font-black">Author Profiles:</span> Get to know
            each author through detailed profiles that highlight their
            biography, writing style, achievements, and personal inspirations.
          </p>

          <p className="text-justify my-3">
            <span className="font-black">Published Works:</span> Explore a
            curated list of books written by the author with quick access to
            book details, reviews, and purchase options.
          </p>

          <p className="text-justify my-3">
            <span className="font-black">Interviews & Insights:</span>
            Exclusive interviews, behind-the-scenes stories, and writing tips
            that offer a deeper look into the author's creative world.
          </p>
        </div>

        <div className="p-5 flex items-center justify-center">
          <img
            alt="Author"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHq063ePmK-_Ys3Fb3k-Gl0osfDgbZWNIY-juxaec3CQ&s=10"
          />
        </div>
      </section>
      {/* Testimonials */}
      <section className="md:px-40 my-5 p-5 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">TESTIMONIALS</h1>

        <h1 className="text-3xl my-2">See What Others Are Saying</h1>

        <div className="my-5 flex flex-col justify-center items-center">
          <img
            width={"200px"}
            height={"200px"}
            style={{ borderRadius: "50%" }}
            src="https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg"
            alt="User"
          />

          <h3 className="my-3">Luca</h3>

          <p className="text-center">
            This bookstore has completely changed the way I discover new books.
            The recommendations are always spot-on, and the delivery is super
            fast. I love the clean interface and the huge collection! The user
            experience is amazing! Easy navigation, great deals, and beautifully
            organized categories. I appreciate how quickly customer support
            responds too.
          </p>
        </div>
      </section>
    </>
  );
}

export default Home;
