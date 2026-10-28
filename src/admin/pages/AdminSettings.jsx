import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import { FaPen } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { ToastContainer, toast } from "react-toastify";

function AdminSettings() {
  const navigate = useNavigate();
  const [offCanvas, setOffCanvas] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    cPassword: "",
    bio: "",
    picture: "",
    role: "",
    id: "",
  });
  const [existingPicture, setExistingPicture] = useState("");
  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      const user = JSON.parse(sessionStorage.getItem("user"));
      setUserDetails({
        ...userDetails,
        username: user.username,
        role: user.role,
        bio: user.bio,
        id: user._id,
      });
      setExistingPicture(user.picture);
    }
  }, []);
  const [preview, setPreview] = useState("");
  // console.log(userDetails);
  // console.log(existingPicture);

  const [passwordMatch, setpasswordMatch] = useState(true);
  const [imageFile, setImageFile] = useState(false);
  const handleFileUpload = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile.type.startsWith("image/")) {
      setUserDetails({ ...userDetails, picture: e.target.files[0] });
      const url = URL.createObjectURL(e.target.files[0]);
      // console.log(url);
      setPreview(url);
      setImageFile(true);
    } else {
      setImageFile(false);
    }
  };

  const checkPassword = (data) => {
    setUserDetails({ ...userDetails, cPassword: data });
    userDetails.password == data
      ? setpasswordMatch(true)
      : setpasswordMatch(false);
  };

  const resetProfile = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    setUserDetails({
      ...userDetails,
      username: user.username,
      role: user.role,
      bio: user.bio,
      id: user._id,
    });
    setExistingPicture(user.picture);
    setPreview("");
    setImageFile(false);
    setpasswordMatch(true);
  };

  const handleUpdateUser = async () => {
    const { username, password, cPassword, bio, picture, id } = userDetails;
    if (!username || !password || !cPassword) {
      toast.info("Please fill the form Completly!!");
    } else if (passwordMatch) {
      const reqBody = new FormData();
      for (let key in userDetails) {
        if (key != picture) {
          reqBody.append(key, userDetails[key]);
        } else {
          preview
            ? reqBody.append("picture", picture)
            : reqBody.append("picture", existingPicture);
        }
      }
      // api call
      const result = await userUpdateAPI(id, reqBody);
      console.log(result);
      if (result.status == 200) {
        toast.success("Admin Profile updated Successfully!!! please login");
        setTimeout(() => {
          sessionStorage.clear();
          navigate("/login");
        }, 2500);
      }
    }
  };
  return (
    <>
      <AdminHeader />

      <div className="md:grid grid-cols-5 gap-4">
        <div className="col-span-1">
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <div className="col-span-4 p-6 md:p-10">
          <h1 className="text-3xl font-bold text-center mb-10">Settings</h1>

          <div className="md:grid grid-cols-2 gap-10 items-start">
            {/* Left - Information */}
            <div>
              <h2 className="text-2xl mb-5 font-bold">Welcome, Admin 👋</h2>

              <p className="text-justify text-gray-600 leading-7">
                This is your personal administration space where you can manage
                your account details, system preferences, and platform roles
                with ease. From here, you can update essential information such
                as your username, password, contact details, and notification
                preferences, ensuring your access remains secure and
                personalized.
              </p>

              <h4 className="text-lg my-6 font-semibold">
                🔧 What You Can Manage in This Section:
              </h4>

              <ul className="space-y-4 text-gray-600">
                <li>
                  ✏️ Update personal details (name, email, role, profile
                  picture)
                </li>

                <li>🔐 Change or reset your password</li>

                <li>📢 Configure notification and alert preferences</li>

                <li>👥 Manage permissions based on assigned access level</li>

                <li>🧩 Customize dashboard visibility and layout</li>
              </ul>

              <p className="my-6 text-justify text-gray-600 leading-7">
                Your profile settings help ensure your administrative tools work
                the way you need them to — securely, efficiently, and with
                complete control. Thank you for keeping the platform organized
                and running smoothly. Continue managing, updating, and improving
                the system — one step at a time. 🚀📚
              </p>
            </div>

            {/* Right - Edit Profile */}
            <div className="bg-blue-50 p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold text-center mb-6">
                Edit Profile
              </h2>

              {/* Profile Image */}
              <div className="flex justify-center mb-8">
                <label
                  htmlFor="userProfile"
                  className="relative cursor-pointer"
                >
                  <input
                    onChange={(e) => handleFileUpload(e)}
                    type="file"
                    id="userProfile"
                    hidden
                  />
                  {existingPicture == "" ? (
                    <img
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                      }}
                      src={
                        preview
                          ? preview
                          : "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg"
                      }
                      alt="User"
                    />
                  ) : existingPicture.startsWith(
                      "https://lh3.googleusercontent.com/",
                    ) ? (
                    <img
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                      }}
                      src={preview ? preview : existingPicture}
                      alt="User"
                    />
                  ) : (
                    <img
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                      }}
                      src={
                        preview
                          ? preview
                          : `${axiosInstance.defaults.baseURL}/uploads/${existingPicture}`
                      }
                      alt="No image"
                    />
                  )}
                  {/* <img
                    className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-md"
                    src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg"
                    alt="User"
                  /> */}

                  {/* Edit Icon */}
                  <span className="absolute bottom-2 right-2 bg-black text-white p-3 rounded-full shadow-md">
                    <FaPen />
                  </span>
                </label>
              </div>

              {/* Username */}
              <div className="mb-4">
                <label className="block mb-2 font-medium">Username</label>

                <input
                  value={userDetails.username}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      username: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Enter username"
                  className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* New Password */}
              <div className="mb-4">
                <label className="block mb-2 font-medium">New Password</label>

                <input
                  type="password"
                  value={userDetails.password}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      password: e.target.value,
                    })
                  }
                  placeholder="Enter new password"
                  className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  Confirm Password
                </label>

                <input
                  type="password"
                  value={userDetails.cPassword}
                  onChange={(e) => checkPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              {passwordMatch && (
                <div className="mt-5 text-yellow-500 text-sm">
                  *Password not Matching ... Enter Correct Password
                </div>
              )}
              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button
                onClick={resetProfile}
                  type="button"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2.5 rounded-lg"
                >
                  Reset
                </button>

                <button
                  type="button"
                  onClick={handleUpdateUser}
                  className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-lg"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
       {/* toast container */}
        <ToastContainer
          position="top-center"
          theme="colored"
          autoClose={3000}
        />
    </>
  );
}

export default AdminSettings;
