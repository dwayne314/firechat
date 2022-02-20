import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useDarkMode from "../hooks/useDarkMode";
import { getIsSigningIn } from "../redux/selectors";
import Loading from "../components/Loading";
import Logo from "../assets/logo.png";
import LogoDark from "../assets/logo-dark.png";

function Login() {
  const { currentUser, signInWithGoogle } = useAuth();
  const { isDarkMode } = useDarkMode();
  const isSigningIn = useSelector(getIsSigningIn);
  const navigate = useNavigate();

  function login(evt) {
    evt.preventDefault();
    signInWithGoogle();
  }

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);
  return !isSigningIn ? (
    <div className="h-full-minus-header">
      <div className="pt-10">
        <form className="flex flex-col items-center mx-auto border-2 border-gray-200 rounded dark:border-red-300 h-80 w-80 box-shadow">
          <span className="mt-4 mb-8 text-xl font-bold dark:text-white">
            Welcome to Firechat
          </span>
          <span className="p-4 bg-red-100 border-2 rounded-full h-28 w-28 dark:bg-secondaryDark dark:border-secondaryDark">
            <img
              src={isDarkMode ? LogoDark : Logo}
              alt="firechat-logo"
              className="h-full mx-auto"
            ></img>
          </span>
          <button
            onClick={login}
            className="items-center w-40 h-8 mt-auto mb-4 text-black bg-red-300 rounded cursor-pointer"
          >
            Login With Google
          </button>
        </form>
      </div>
    </div>
  ) : (
    <div className="h-full-minus-header">
      <div className="absolute -translate-x-1/2 top-1/3 left-1/2">
        <Loading text="Signing In" />
      </div>
    </div>
  );
}

export default Login;
