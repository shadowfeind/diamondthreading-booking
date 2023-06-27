import { Link, useNavigate } from "react-router-dom";
import Diamond from "../diamond.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function HeaderComponent() {
  const navigate = useNavigate();
  const { authData, logout }: any = useContext(AuthContext);
  return (
    <nav className="border-gray-200 bg-diamond-gold  dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to={"/"} className="flex items-center">
          <img src={Diamond} className="mr-3" alt="Diamond Threading" />
        </Link>
        <div>
          {authData && authData?.role === "admin" && (
            <button
              type="button"
              className="text-diamond-purple bg-white  focus:ring-4 focus:ring-diamond-gold font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600  focus:outline-none dark:focus:ring-blue-800"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </button>
          )}
          {authData ? (
            <button
              type="button"
              className="text-diamond-purple bg-white  focus:ring-4 focus:ring-diamond-gold font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600  focus:outline-none dark:focus:ring-blue-800"
              onClick={() => logout()}
            >
              Logout
            </button>
          ) : (
            <button
              type="button"
              className="text-diamond-purple bg-white  focus:ring-4 focus:ring-diamond-gold font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600  focus:outline-none dark:focus:ring-blue-800"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
          {authData ? (
            ""
          ) : (
            <button
              type="button"
              className="text-white bg-diamond-purple  focus:ring-4 focus:ring-diamond-gold font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600  focus:outline-none dark:focus:ring-blue-800"
              onClick={() => navigate("/booking")}
            >
              Book Appointment
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
