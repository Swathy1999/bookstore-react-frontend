import React, { useState } from "react";
import { FaUserAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { registerAPI, loginAPI} from "../services/allServices";
import { ToastContainer, toast} from "react-toastify";

function Auth({ insideRegister }) {
  const navigate = useNavigate();
  const [togglePassword, setTogglePassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "username",
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Must Be at least 3 characters")
        .required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().required("Required"),
    }),

    onSubmit: (values, { resetForm }) => {
      console.log(values);
      if (insideRegister) {
        console.log("Register API CALL");
        handleRegister(values);
      } else {
        console.log("Login API CALL");
        handleLogin(values);
      }
      resetForm();
    },
  });

  const handleLogin = async (userData) => {
    const result = await loginAPI(userData);
    console.log(result);
    if (result.status == 200) {
      toast.success("Successfully Logged in..!!");
      sessionStorage.setItem("token", result.data.token);
      sessionStorage.setItem("user", JSON.stringify(result.data.user));
      setTimeout(() => {
        if (result.data.user.role == "admin") {
          navigate(`/admin`);
        } else {
          navigate(`/`);
        }
      }, 2500);
    } else {
      toast.error(result);
    }
  };

  const handleRegister = async (userData) => {
    const result = await registerAPI(userData);
    console.log(result);

    if (result.status == 201) {
      toast.success("Successfully Registered.. please Login!!!");
    } else {
      toast.error(result);
    }
    navigate("/login");
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[url('/login.png')] bg-cover bg-center text-blue-900">
      <div className="p-10">
        <h1 className="text-center font-bold text-3xl">BOOKSTORE</h1>

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
          <h1 className="text-2xl">{insideRegister ? "Register" : "Login"}</h1>

          <form onSubmit={formik.handleSubmit} className="my-5 w-full">
            {/* Username */}
            {insideRegister && (
              <>
                <input
                  className="bg-white p-2 w-full rounded my-5 text-blue-900"
                  type="text"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  placeholder="UserName"
                />

                {formik.touched.username && formik.errors.username && (
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
              placeholder="E Mail"
            />

            {formik.touched.email && formik.errors.email && (
              <div className="mb-5 text-yellow-400">{formik.errors.email}</div>
            )}

            {/* Password */}
            <div className="flex items-center">
              <input
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
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

            {formik.touched.password && formik.errors.password && (
              <div className="mb-5 text-yellow-400">
                {formik.errors.password}
              </div>
            )}

            {/* Forgot Password */}
            <div className="flex justify-between mb-5">
              <p
                className={`text-xs ${
                  !insideRegister ? "text-orange-300" : ""
                }`}
              >
                *Never Share your Password
              </p>

              {insideRegister && (
                <button type="button" className="text-xs underline">
                  Forgot Password
                </button>
              )}
            </div>

            {/* Login/Register Button */}
            <div className="text-center">
              {insideRegister ? (
                <button
                  type="submit"
                  className="bg-green-600 p-2 w-full rounded"
                >
                  Register
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-green-600 p-2 w-full rounded"
                >
                  Login
                </button>
              )}
            </div>

            {/* Google Login */}
            {!insideRegister && (
              <div className="my-5 text-center">
                <p>------ or ------</p>

                <div className="mt-2 flex justify-center items-center w-full">
                  Google Authentication
                </div>
              </div>
            )}

            {/* New / Already User */}
            <div className="text-center my-5">
              {insideRegister ? (
                <p className="text-pink-300">
                  Existing User?
                  <Link to={"/login"} className="underline ms-5">
                    Login
                  </Link>
                </p>
              ) : (
                <p className="text-pink-300">
                  New User?
                  <Link to={"/register"} className="underline ms-5">
                    Register
                  </Link>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* toast container */}
      <ToastContainer position="top-center" theme="colored" autoClose={3000} />
    </div>
  );
}

export default Auth;
