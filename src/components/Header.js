import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useDarkMode from "../hooks/useDarkMode";
import useOnOutsideClick from "../hooks/useOnOutsideClick";
import ProfilePopup from "./ProfilePopup";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "../assets/logo.png";
import LogoDark from "../assets/logo-dark.png";

function Header() {
  const { currentUser } = useAuth();
  const { isDarkMode } = useDarkMode();
  const { ref, excludeRef } = useOnOutsideClick(handleClick);
  const [isPopupOpen, setPopupOpen] = useState(false);

  function handleClick() {
    setPopupOpen(!isPopupOpen);
  }

  function togglePopup() {
    setPopupOpen(!isPopupOpen);
  }

  return (
    <div className="relative flex items-center justify-between w-full h-16 p-4 bg-red-100 dark:bg-primaryDark dark:border-b dark:border-secondaryDark">
      <Link to={currentUser?.id ? "/" : "/login"}>
        <span className="flex items-center">
          <span className="text-2xl font-bold text-black dark:text-red-300">
            Firechat
          </span>
          <img
            src={isDarkMode ? LogoDark : Logo}
            alt="logo"
            className="h-8 mb-3 ml-1"
          ></img>
        </span>
      </Link>
      <span ref={excludeRef}>
        <GiHamburgerMenu
          className="w-5 h-5 cursor-pointer dark:fill-white"
          onClick={togglePopup}
        />
      </span>
      {isPopupOpen && <ProfilePopup ref={ref} togglePopup={togglePopup} />}
    </div>
  );
}

export default Header;
