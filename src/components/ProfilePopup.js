import React, { forwardRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useDarkMode from "../hooks/useDarkMode";
import Toggle from "./Toggle";
import FallbackImg from "./FallbackImg";
import { AiOutlinePlus } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import { BsMoonFill } from "react-icons/bs";
import { MdLogout, MdArrowForwardIos } from "react-icons/md";
import { ReactComponent as GenericAvatar } from "../assets/generic-avatar.svg";

const ProfilePopup = forwardRef((props, ref) => {
  const { togglePopup } = props;
  const { signInWithGoogle, logout, currentUser } = useAuth();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();

  function signOut() {
    logout();
    navigate("/");
  }

  return (
    <div
      ref={ref}
      className="absolute right-0 z-50 p-2 mt-1 bg-white border-2 border-r-0 border-gray-200 top-16 w-80 dark:border-primaryDark dark:bg-secondaryDark dark:text-white box-shadow"
    >
      <Link
        to={currentUser?.id ? `/users/${currentUser?.id}/edit` : "/login"}
        onClick={togglePopup}
      >
        <div className="flex p-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-500">
          <FallbackImg
            alt="profile"
            src={currentUser?.photoURL}
            className="object-cover w-16 h-16 rounded-full"
            FallbackComponent={
              <GenericAvatar className="object-cover w-16 h-16 p-2 bg-gray-300 rounded-full fill-white dark:bg-gray-400 dark:fill-gray-300" />
            }
          />
          <div className="flex flex-col justify-around pl-4">
            <span className="text-lg font-bold">
              {currentUser?.fullName || "Anonymous"}
            </span>
            <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
              {currentUser ? "Edit Profile" : "Log In"}
            </span>
          </div>
        </div>
      </Link>
      <hr className="m-2"></hr>
      <div
        className="flex items-center justify-between h-10 p-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-500"
        onClick={() => toggleDarkMode()}
      >
        <span className="flex items-center">
          <BsMoonFill />
          <span className="ml-2">{`Night Mode: ${
            isDarkMode ? "On" : "Off"
          }`}</span>
        </span>
        <Toggle />
      </div>
      <hr className="m-2"></hr>

      <div onClick={togglePopup}>
        {currentUser ? (
          <>
            <Link to="/rooms/create">
              <div className="flex items-center justify-between h-10 p-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-500">
                <span className="flex items-center">
                  <AiOutlinePlus />
                  <span className="ml-2">Create Chat Room</span>
                </span>
                <MdArrowForwardIos />
              </div>
            </Link>

            <div className="flex items-center justify-between h-10 p-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-500">
              <span className="flex items-center">
                <IoNotificationsOutline />
                <span className="ml-2">Notifications</span>
              </span>
              <MdArrowForwardIos />
            </div>
          </>
        ) : (
          ""
        )}
        <div
          className="flex items-center justify-between h-10 p-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-500"
          onClick={currentUser ? signOut : signInWithGoogle}
        >
          <span className="flex items-center">
            <MdLogout />
            <span className="ml-2">{currentUser ? "Log Out" : "Log In"}</span>
          </span>
          <MdArrowForwardIos />
        </div>
      </div>
    </div>
  );
});

export default ProfilePopup;
