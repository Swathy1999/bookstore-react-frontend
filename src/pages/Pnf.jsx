import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../user/components/Header";
import { routeContext } from "../contextApi/RouteGuard";

function Pnf() {
  const { role, setRole, authorisedUser, setAuthorisedUser } =
    useContext(routeContext);
  const navigate = useNavigate();

  const backToHome = () => {
    if (role == "user") {
      navigate("/");
    } else {
      navigate("/admin");
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center text-center min-h-screen p-5">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZrrzI2M90-aeN-cNbwdIuNYAc3JnZ1HOTrxvnv8y6eA&s=10"
          alt="Page Not Found"
          className="w-75 mb-5"
        />

        <h2 className="text-3xl font-bold text-blue-800">Page Not Found</h2>

        <p className="text-gray-500 my-3">
          Sorry, the page you are looking for doesn't exist.
        </p>

        {authorisedUser ? (
          <button onClick={backToHome} className="bg-black mt-5 px-3 py-2 text-white">
            Home
          </button>
        ) : (
          <Link
            to={"/"}
            className="bg-black mt-5 px-3 py-2
text-white"
          >
            Back to Home
          </Link>
        )}
      </div>
    </>
  );
}

export default Pnf;
