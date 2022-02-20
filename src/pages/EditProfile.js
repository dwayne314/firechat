import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import useDatabase from "../hooks/useDatabase";

function EditProfile() {
  const { currentUser } = useAuth();
  const { updateUser } = useDatabase();
  const [fullName, setFullName] = useState(currentUser?.fullName);
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL);

  function submitForm(evt) {
    evt.preventDefault();
    const isValid = fullName && photoURL;
    if (isValid) {
      updateUser({ uid: currentUser.id, fullName, photoURL });
    }
  }

  return (
    currentUser && (
      <div>
        <form className="flex flex-col items-center mx-auto mt-10 border-2 rounded w-80 dark:border-red-300 box-shadow">
          <span className="mt-4 mb-2 text-xl font-bold dark:text-white">
            Edit Profile
          </span>
          <div className="mx-4">
            <div className="my-2">
              <label
                htmlFor="display-name"
                className="mr-auto text-sm font-bold text-gray-400"
              >
                Display Name
              </label>
              <input
                id="display-name"
                type="text"
                value={fullName}
                onChange={(evt) => setFullName(evt.target.value)}
                className="w-full px-2 py-1 mb-2 border-2 border-red-100 rounded focus:outline-none dark:border-secondaryDark dark:bg-secondaryDark dark:text-white"
              ></input>
            </div>
            <div className="my-2">
              <label
                htmlFor="display-name"
                className="mr-auto text-sm font-bold text-gray-400"
              >
                Profile Picture
              </label>
              <input
                id="display-name"
                type="text"
                value={photoURL}
                onChange={(evt) => setPhotoURL(evt.target.value)}
                className="w-full px-2 py-1 mb-2 border-2 border-red-100 rounded focus:outline-none dark:border-secondaryDark dark:bg-secondaryDark dark:text-white"
              ></input>
            </div>
            <button
              className="items-center w-full h-8 mt-2 mb-4 text-black bg-red-300 rounded cursor-pointer"
              onClick={(evt) => submitForm(evt)}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    )
  );
}

export default EditProfile;
