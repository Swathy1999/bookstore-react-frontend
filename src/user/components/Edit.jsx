import React, { useState, useEffect } from "react";
import { FaPen, FaPencilAlt } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import axiosInstance from "../../api/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { userUpdateAPI } from "../../services/allServices";

function Edit() {
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
    if (!username || !password || !cPassword || !bio) {
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
        toast.success("User Profile updated Successfully!!! please login");
        setTimeout(() => {
          sessionStorage.clear();
          navigate("/login");
        }, 2500);
      }
    }
  };
  return (
    <>
      <div>
        {/* button */}
        <button
          onClick={() => setOffCanvas(true)}
          className="bg-black text-white p-2 flex items-center rounded border hover:bg-white hover:text-black"
        >
          <FaPencilAlt className="me-2" />
          Edit
        </button>
        {/* offcanvas */}
        {offCanvas && (
          <div>
            <div className="fixed inset-e bg-gray-400/75 w-full h-full"></div>
            <div className="bg-white h-full w-90 z-50 fixed top-0 left-0">
              {/* header */}
              <div className="bg-black text-white px-3 py-4 flex justify-between text-2xl">
                <h1>Update User Profile</h1>
                <FaXmark onClick={() => setOffCanvas(false)} />
              </div>

              {/* body */}
              <div className="flex justify-center items-center flex-col my-5">
                <label htmlFor="userProfile">
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
                  <button
                    className="bg-black
text-white px-3 py-4 rounded z-53 fixed"
                    style={{ marginLeft: "180px", marginTop: "-88px" }}
                  >
                    <FaPen />
                  </button>
                </label>
                {!imageFile && (
                  <div className="mt-5-text-yellow-500 text-sm">
                    {" "}
                    *Only Accepts Image File
                  </div>
                )}
                {/* username */}
                <div className="mt-10 mb-3 w-full px-5">
                  <input
                    type="text"
                    value={userDetails.username}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        username: e.target.value,
                      })
                    }
                    placeholder="Username"
                    className="w-full border border-gray-200 rounded p-2"
                  />
                </div>
                {/* new password */}
                <div className="mt-3 mb-3 w-full px-5">
                  <input
                    type="text"
                    value={userDetails.password}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        password: e.target.value,
                      })
                    }
                    placeholder="New Password"
                    className="w-full border border-gray-200 rounded p-2"
                  />
                </div>
                {/* confirm Password */}
                <div className="mt-3 mb-3 w-full px-5">
                  <input
                    type="password"
                    value={userDetails.cPassword}
                    onChange={(e) => checkPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="w-full border border-gray-200 rounded p-2"
                  />
                </div>
                {passwordMatch && (
                  <div className="mt-5 text-yellow-500 text-sm">
                    *Password not Matching ... Enter Correct Password
                  </div>
                )}
                {/* bio*/}
                <div className="mt-3 mb-3 w-full px-5">
                  <input
                    type="text"
                    value={userDetails.bio}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, bio: e.target.value })
                    }
                    placeholder="Bio"
                    className="w-full border border-gray-200 rounded p-2"
                  />
                </div>

                {/* reset and update button */}
                <div className="flex justify-end w-full px-5 mt-5">
                  <button
                    onClick={resetProfile}
                    className="bg-yellow-500 text-white p-3 rounded me-2"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleUpdateUser}
                    className="bg-green-500 text-white p-3 rounded"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* toast container */}
        <ToastContainer
          position="top-center"
          theme="colored"
          autoClose={3000}
        />
      </div>
    </>
  );
}

export default Edit;
