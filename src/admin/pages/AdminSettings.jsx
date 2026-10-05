import React from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import { FaPen } from "react-icons/fa6";

function AdminSettings() {
  return (
    <>
      <AdminHeader />

      <div className="md:grid grid-cols-5 gap-4">
        <div className="col-span-1">
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <div className="col-span-4 p-6 md:p-10">
          <h1 className="text-3xl font-bold text-center mb-10">
            Settings
          </h1>

          <div className="md:grid grid-cols-2 gap-10 items-start">
            {/* Left - Information */}
            <div>
              <h2 className="text-2xl mb-5 font-bold">
                Welcome, Admin 👋
              </h2>

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

                <li>
                  👥 Manage permissions based on assigned access level
                </li>

                <li>🧩 Customize dashboard visibility and layout</li>
              </ul>

              <p className="my-6 text-justify text-gray-600 leading-7">
                Your profile settings help ensure your administrative tools
                work the way you need them to — securely, efficiently, and with
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
                    type="file"
                    id="userProfile"
                    hidden
                  />

                  <img
                    className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-md"
                    src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg"
                    alt="User"
                  />

                  {/* Edit Icon */}
                  <span className="absolute bottom-2 right-2 bg-black text-white p-3 rounded-full shadow-md">
                    <FaPen />
                  </span>
                </label>
              </div>

              {/* Username */}
              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  Username
                </label>

                <input
                  type="text"
                  placeholder="Enter username"
                  className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* New Password */}
              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  New Password
                </label>

                <input
                  type="password"
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
                  placeholder="Confirm password"
                  className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2.5 rounded-lg"
                >
                  Reset
                </button>

                <button
                  type="button"
                  className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-lg"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminSettings;



