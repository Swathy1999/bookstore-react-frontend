import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { FaCheckCircle } from "react-icons/fa";
import Edit from "../components/Edit";
import UploadBook from "../components/UploadBook";
import BookStatus from "../components/BookStatus";
import Purchase from "../components/Purchase";
import axiosInstance from "../../api/axiosInstance";

function Profile() {
  const [currentTab, setCurrentTab] = useState(1);
  const [dp, setDp] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (sessionStorage.getItem("token") && sessionStorage.getItem("user")) {
      const user = JSON.parse(sessionStorage.getItem("user"));
      setDp(user.picture);
      setUsername(user?.username);
      setBio(user?.bio);
    }
  }, []);
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
  src={
    dp == ""
      ? "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
      : dp.startsWith("https://lh3.googleusercontent.com/")
      ? dp
      : `${axiosInstance.defaults.baseURL}/uploads/${dp}`
  }
  alt="user"
/>

      </div>

      {/* Profile Details */}
      <div className="px-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-black md:text-3xl">{username}</h1>

            <FaCheckCircle className="text-blue-700 ms-3" />
          </div>

          <div>
            <Edit />
          </div>
        </div>
<p className="text-xl font-bold px-20 mt-5">
          {bio ? bio : "No bio available"}</p>
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
        {currentTab == 1 && (
          <div>
            <UploadBook />
          </div>
        )}
        {currentTab == 2 && (
          <div>
            <BookStatus />
          </div>
        )}
        {currentTab == 3 && (
          <div>
            <Purchase />
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
