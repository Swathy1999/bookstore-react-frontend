import React, { useState } from "react";
import Header from "../components/Header";
import { FaCheckCircle } from "react-icons/fa";
import Edit from "../components/Edit";
import UploadBook from "../components/UploadBook";
import BookStatus from "../components/BookStatus";
import Purchase from "../components/Purchase";
function Profile() {
  const [currentTab, setCurrentTab] = useState(1);
  return (
    <>
      <Header />

      {/* Cover Image */}
      <div style={{ height: "200px" }} className="bg-black"></div>

      {/* Profile Image */}
      <div
        style={{
          width: "230px",
          height: "230px",
          borderRadius: "50%",
          marginTop: "-130px",
          marginLeft: "70px",
        }}
        className="bg-white p-3"
      >
        <img
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
          }}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUy-t00mImJn20OoJQGOZ-hpNBUnrKty6pmaC96C6r_Q&s=10"
          alt="user"
        />
      </div>

      {/* Profile Details */}
      <div className="px-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-black md:text-3xl">UserName</h1>

            <FaCheckCircle className="text-blue-700 ms-3" />
          </div>

          <div><Edit/></div>
        </div>

        <p className="text-justify md:px-20 px-5 my-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat non
          consequatur quibusdam numquam impedit accusamus, aperiam quidem amet
          maxime voluptate fugiat neque eum veritatis ipsa quod et praesentium
          obcaecati. Consequuntur. Eligendi modi dolorem labore sint,
          repudiandae maxime dicta quas delectus et explicabo porro, itaque id
          odit rerum minus, fuga voluptatum officiis praesentium ea magni
          perferendis corrupti aliquam. Sapiente, necessitatibus voluptatibus.
        </p>
      </div>
      <div className="md:px-40">
        {/* tabs */}
        <div className="flex justify-center items-center my-8 font-medium text-lg">
          <p
            onClick={() => setCurrentTab(1)}
            className={
              currentTab == 1
                ? "p-4 border-gray-400 border-l border-t  border-rrounded cursor-pointer"
                : "p-4 border-gray-400 border-b rounded cursor-pointer"
            }
          >
            Upload Book
          </p>

          <p
            onClick={() => setCurrentTab(2)}
            className={
              currentTab == 2
                ? "p-4 border-gray-400 border-l border-t  border-rrounded cursor-pointer"
                : "p-4 border-gray-400 border-b rounded cursor-pointer"
            }
          >
            Status
          </p>

          <p
            onClick={() => setCurrentTab(3)}
            className={
              currentTab == 3
                ? "p-4 border-gray-400 border-l border-t  border-rrounded cursor-pointer"
                : "p-4 border-gray-400 border-b rounded cursor-pointer"
            }
          >
            Purchase History
          </p>
        </div>
        {/* tab content */}
        {currentTab == 1 && <div><UploadBook/></div>}
        {currentTab == 2 && <div><BookStatus/></div>}
        {currentTab == 3 && <div><Purchase/></div>}
      </div>
    </>
  );
}

export default Profile;
