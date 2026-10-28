
import React, { useState } from "react";
import { FaUserAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  registerAPI,
  loginAPI,
  googleLoginAPI,
} from "../services/allServices";
import { ToastContainer, toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Auth({ insideRegister }) {
  const navigate = useNavigate();
  const [togglePassword, setTogglePassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: insideRegister
        ? Yup.string()
            .min(3, "Must be at least 3 characters")
            .required("Username is required")
        : Yup.string(),

      email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),

      password: Yup.string()
        .required("Password is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        if (insideRegister) {
          await handleRegister(values, resetForm);
        } else {
          await handleLogin(values, resetForm);
        }
      } catch (error) {
        console.error("Authentication error:", error);
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  // Login
  const handleLogin = async (userData, resetForm) => {
    try {
      const result = await loginAPI(userData);

      console.log("Login response:", result);

      if (result?.status === 200) {
        toast.success("Successfully logged in!");

        sessionStorage.setItem("token", result.data.token);
        sessionStorage.setItem(
          "user",
          JSON.stringify(result.data.user)
        );

        resetForm();

        setTimeout(() => {
          if (result.data.user?.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        }, 1500);
      } else {
        toast.error(
          result?.response?.data?.message ||
          result?.data?.message ||
          "Login failed. Please check your details."
        );
      }
    } catch (error) {
      console.error("Login error:", error);

      toast.error(
        error.response?.data?.message ||
        "Login failed. Please try again."
      );
    }
  };

  // Register
  const handleRegister = async (userData, resetForm) => {
    try {
      const result = await registerAPI(userData);

      console.log("Register response:", result);

      if (result?.status === 201 || result?.status === 200) {
        toast.success("Successfully registered! Please log in.");
        resetForm();

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast.error(
          result?.response?.data?.message ||
          result?.data?.message ||
          "Registration failed."
        );
      }
    } catch (error) {
      console.error("Registration error:", error);

      toast.error(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );
    }
  };

  // Google Login
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      console.log("Google credential response:", credentialResponse);

      if (!credentialResponse?.credential) {
        toast.error("Unable to get Google credentials.");
        return;
      }

      const { email, name, picture } = jwtDecode(
        credentialResponse.credential
      );

      if (!email) {
        toast.error("Unable to retrieve your Google email.");
        return;
      }

      const result = await googleLoginAPI({
        username: name,
        email,
        password: "googlePassword",
        picture,
      });

      console.log("Google login response:", result);

      if (result?.status === 200 || result?.status === 201) {
        toast.success("Google login successful!");

        sessionStorage.setItem("token", result.data.token);
        sessionStorage.setItem(
          "user",
          JSON.stringify(result.data.user)
        );

        setTimeout(() => {
          if (result.data.user?.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        }, 1500);
      } else {
        toast.error(
          result?.response?.data?.message ||
          result?.data?.message ||
          "Google login failed."
        );
      }
    } catch (error) {
      console.error("Google login error:", error);

      toast.error(
        error.response?.data?.message ||
        "Google login failed. Please try again."
      );
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[url('/login.png')] bg-cover bg-center text-blue-900">
      <div className="p-10">
        <h1 className="text-center font-bold text-3xl">
          BOOKSTORE
        </h1>

        <div
          style={{ width: "400px" }}
          className="bg-blue-900 flex flex-col my-5 text-white p-5 justify-center items-center"
        >
          {/* User Icon */}
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
            }}
            className="border mb-5 flex justify-center items-center"
          >
            <FaUserAlt className="text-3xl" />
          </div>

          {/* Login / Register Heading */}
          <h1 className="text-2xl">
            {insideRegister ? "Register" : "Login"}
          </h1>

          <form
            onSubmit={formik.handleSubmit}
            className="my-5 w-full"
          >
            {/* Username */}
            {insideRegister && (
              <>
                <input
                  className="bg-white p-2 w-full rounded my-5 text-blue-900"
                  type="text"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="UserName"
                />

                {formik.touched.username &&
                  formik.errors.username && (
                    <div className="mb-5 text-yellow-400">
                      {formik.errors.username}
                    </div>
                  )}
              </>
            )}

            {/* Email */}
            <input
              className="bg-white p-2 w-full rounded my-5 text-blue-900"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="E Mail"
            />

            {formik.touched.email && formik.errors.email && (
              <div className="mb-5 text-yellow-400">
                {formik.errors.email}
              </div>
            )}

            {/* Password */}
            <div className="flex items-center">
              <input
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-white p-2 w-full rounded my-5 text-blue-900"
                type={togglePassword ? "text" : "password"}
                placeholder="Password"
              />

              {togglePassword ? (
                <FaEyeSlash
                  onClick={() => setTogglePassword(false)}
                  className="text-gray-400 cursor-pointer"
                  style={{
                    marginTop: "-2px",
                    marginLeft: "-30px",
                  }}
                />
              ) : (
                <FaEye
                  onClick={() => setTogglePassword(true)}
                  className="text-gray-400 cursor-pointer"
                  style={{
                    marginTop: "-2px",
                    marginLeft: "-30px",
                  }}
                />
              )}
            </div>

            {formik.touched.password &&
              formik.errors.password && (
                <div className="mb-5 text-yellow-400">
                  {formik.errors.password}
                </div>
              )}

            {/* Password Reminder */}
            <div className="flex justify-between mb-5">
              <p
                className={`text-xs ${
                  !insideRegister ? "text-orange-300" : ""
                }`}
              >
                *Never Share your Password
              </p>

              {insideRegister && (
                <button
                  type="button"
                  className="text-xs underline"
                  onClick={() =>
                    toast.info("Please contact support to reset your password.")
                  }
                >
                  Forgot Password
                </button>
              )}
            </div>

            {/* Login / Register Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="bg-green-600 p-2 w-full rounded disabled:opacity-50"
              >
                {formik.isSubmitting
                  ? "Please wait..."
                  : insideRegister
                  ? "Register"
                  : "Login"}
              </button>
            </div>

            {/* Google Login */}
            {!insideRegister && (
              <div className="my-5 text-center">
                <p>------ or ------</p>

                <div className="mt-2 flex justify-center items-center w-full">
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => {
                      toast.error("Google login failed.");
                    }}
                  />
                </div>
              </div>
            )}

            {/* New / Existing User */}
            <div className="text-center my-5">
              {insideRegister ? (
                <p className="text-pink-300">
                  Existing User?
                  <Link to="/login" className="underline ms-5">
                    Login
                  </Link>
                </p>
              ) : (
                <p className="text-pink-300">
                  New User?
                  <Link to="/register" className="underline ms-5">
                    Register
                  </Link>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        theme="colored"
        autoClose={3000}
      />
    </div>
  );
}

export default Auth;
