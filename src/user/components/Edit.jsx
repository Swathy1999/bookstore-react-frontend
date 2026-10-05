import React, { useState } from "react";
import { FaPen, FaPencilAlt } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

function Edit() {
  const [offCanvas, setOffCanvas] = useState(false);
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
                <label htmlFor="">
                  <input type="file" id="userProfile" hidden />
                  <img
                    style={{ width: "245px", height: "50%" }}
                    src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg"
                    alt="User"
                  />
                  <button
                    className="bg-black
text-white px-3 py-4 rounded z-53 fixed"
                    style={{ marginLeft: "180px", marginTop: "-88px" }}
                  >
                    <FaPen />
                  </button>
                </label>
                {/* username */}
                <div className="mt-10 mb-3 w-full px-5">
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full border border-gray-200 rounded p-2"
                  />
                </div>
                {/* new password */}
                <div className="mt-3 mb-3 w-full px-5">
                  <input
                    type="text"
                    placeholder="New Password"
                    className="w-full border border-gray-200 rounded p-2"
                  />
                </div>
                {/* confirm Password */}
                <div className="mt-3 mb-3 w-full px-5">
                  <input
                    type="text"
                    placeholder="Confirm password"
                    className="w-full border border-gray-200 rounded p-2"
                  />
                </div>
                {/* bio*/}
                <div className="mt-3 mb-3 w-full px-5">
                  <input
                    type="text"
                    placeholder="Bio"
                    className="w-full border border-gray-200 rounded p-2"
                  />
                </div>

                {/* reset and update button */}
                <div className="flex justify-end w-full px-5 mt-5">
                  <button className="bg-yellow-500 text-white p-3 rounded me-2">
                    Reset
                  </button>
                  <button className="bg-green-500 text-white p-3 rounded">
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Edit;
