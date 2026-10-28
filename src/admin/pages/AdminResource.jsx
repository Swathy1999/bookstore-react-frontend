import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import { userListAPI } from "../../services/allServices";
import axiosInstance from "../../api/axiosInstance";

function AdminResource() {
  const [currentTab, setCurrentTab] = useState(1);
  const [allUsers, setAllUsers] = useState([]);
  console.log(allUsers);

  useEffect(() => {
    if (currentTab == 2) {
      getAllUsers();
    }
  }, [currentTab]);
  const getAllUsers = async () => {
    const result = await userListAPI();
    if (result.status == 200) {
      setAllUsers(result.data);
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="md:grid grid-cols-5 gap-2">
        {/* Sidebar */}
        <div className="col-span-1">
          <AdminSidebar />
        </div>
        {/* Main Content */}
        <div className="col-span-4 p-10">
          <h1 className="text-3xl font-bold text-center mb-10">
            All Resources
          </h1>
          {/* Tabs */}
          <div className="flex justify-center items-center my-8 font-medium text-lg">
            <p
              onClick={() => setCurrentTab(1)}
              className={
                currentTab === 1
                  ? "p-4 border-gray-400 border-t border-r rounded cursor-pointer"
                  : "p-4 border-gray-400 border-b rounded cursor-pointer"
              }
            >
              Books
            </p>
            <p
              onClick={() => setCurrentTab(2)}
              className={
                currentTab === 2
                  ? "p-4 border-gray-400 border-t border-r rounded cursor-pointer"
                  : "p-4 border-gray-400 border-b rounded cursor-pointer"
              }
            >
              Users
            </p>
          </div>
          {/* Tab Content */}
          {currentTab === 1 && (
            <div className="md:grid grid-cols-4 md:my-0">
              {/* Duplicating Card */}
              <div className="shadow rounded p-3 m-4 md:my-0">
                <img
                  width={"100%"}
                  height={"300px"}
                  src="https://blog-cdn.reedsy.com/directories/gallery/473/large_18701508f01e85184136629bb2479cfa.jpg"
                  alt=""
                />
                <div className="flex flex-col justify-center items-center mt-4">
                  <h2 className="text-blue-600 font-bold text-xl">Author</h2>
                  <h3 className="text-lg">Title</h3>
                  <p className="font-bold text-red-500">Price</p>
                  {/* Approve button */}
                  <button className="bg-green-600 text-white p-2 mt-2 w-full">
                    APPROVE
                  </button>
                </div>
              </div>
            </div>
          )}
          {currentTab === 2 && (
            <div>
              <div className="md:grid grid-cols-3 my-5 w-full">
                {/* Duplicating according to user */}
              {
                allUsers.length>0 ?
                allUsers?.map(user=>(
                    <div key={user._id} className="shadow rounded p-2 m-2 bg-blue-100">
                  <p className="text-red-500 font-bold text-md"> ID : {user._id}</p>
                  <div className="flex mt-3 items-center">
                    <img
                      width={"80px"}
                      height={"80px"}
                      style={{ borderRadius: "50%" }}
                      src={
              user.picture == ""
                ? "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
                : user.picture.startsWith("https://lh3.googleusercontent.com/")
                  ? user.picture
                  : `${axiosInstance.defaults.baseURL}/uploads/${user.picture}`
            }
                      alt="user"
                    />
                    <div className="flex flex-col ml-3 w-full">
                      <h4 className="text-blue-600 font-bold text-md">
                        {user?.username}
                      </h4>
                      <p className="text-xs">{user?.email}</p>
                    </div>
                  </div>
                </div>
                ))
                :
                <div></div>
              }
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default AdminResource;
