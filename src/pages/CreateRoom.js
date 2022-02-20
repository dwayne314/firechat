import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useDatabase from "../hooks/useDatabase";

function CreateRoom() {
  const { currentUser } = useAuth();
  const { createRoom } = useDatabase();
  const [roomName, setRoomName] = useState("");
  const navigate = useNavigate();

  function submitForm(evt) {
    evt.preventDefault();
    if (roomName) {
      createRoom({ creatorId: currentUser.id, name: roomName });
      setRoomName("");
      navigate("/");
    }
  }

  return (
    currentUser && (
      <div>
        <form
          className="flex flex-col max-w-xs p-8 mx-auto mt-10 border-2 border-gray-200 rounded box-shadow sm:max-w-sm dark:border-red-300"
          onSubmit={(evt) => submitForm(evt)}
        >
          <span className="mx-auto mb-4 text-xl font-bold dark:text-white">
            Create Chat Room
          </span>
          <input
            type="text"
            placeholder="Name"
            className="px-4 py-2 border-2 border-red-100 rounded dark:text-white focus:outline-none dark:border-secondaryDark dark:bg-secondaryDark"
            onChange={(evt) => setRoomName(evt.target.value)}
          ></input>
          <button className="w-full h-10 mx-auto mt-8 bg-red-300 rounded">
            Create Room
          </button>
        </form>
      </div>
    )
  );
}

export default CreateRoom;
