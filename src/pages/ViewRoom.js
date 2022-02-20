import React, { createRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useDatabase from "../hooks/useDatabase";
import useScreenSize from "../hooks/useScreenSize";
import FallbackImg from "../components/FallbackImg";
import ViewChats from "../components/ViewChats";
import { FiSend } from "react-icons/fi";
import { ReactComponent as GenericAvatar } from "../assets/generic-avatar.svg";

function ViewRoom() {
  const { roomId } = useParams();
  const ref = createRef();
  const { currentUser } = useAuth();
  const { createChat, getUserById, getRoomById, getMembersByRoomId } =
    useDatabase();
  const { isBelowScreenSize, isAboveScreenSize } = useScreenSize();
  const { chats, name } = getRoomById(roomId);
  const chatMembers = getMembersByRoomId(roomId);
  const [message, setMessage] = useState("");

  function postMessage(evt) {
    evt.preventDefault();
    if (message) {
      const data = {
        roomId,
        userId: currentUser.id,
        message: message,
      };
      createChat(data);
      setMessage("");
    }
  }

  const submitChatForm = (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white box-shadow dark:bg-primaryDark dark:border-t dark:border-secondaryDark">
      <form
        onSubmit={(evt) => postMessage(evt)}
        className="flex items-center h-full"
      >
        <input
          type="text"
          placeholder="Enter a message"
          className="flex-grow w-full h-10 px-4 mx-4 border-2 border-gray-400 rounded-full focus:outline-none dark:border-secondaryDark dark:bg-secondaryDark"
          onChange={(evt) => setMessage(evt.target.value)}
          value={message}
        ></input>
        <button className="flex items-center justify-center w-10 h-10 mr-2 rounded">
          <FiSend className="w-5 h-5 hover:stroke-red-400" />
        </button>
      </form>
    </div>
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats, ref]);

  return (
    currentUser && (
      <div className="dark:bg-primaryDark dark:text-white">
        <div className="flex flex-col justify-end sm:flex-row-reverse">
          <div className="relative flex-grow contain-content">
            <div className="mt-4 mb-2 text-xl font-bold text-center sm:my-4">
              {name}
            </div>
            {isAboveScreenSize("sm") && (
              <>
                <div className="">
                  <ViewChats ref={ref} roomId={roomId} chats={chats} />
                </div>
                <span className="">{submitChatForm}</span>
              </>
            )}
          </div>
          <div className="border-red-300 sm:max-w-200 sm:border-r sm:dark:border-secondaryDark dark:sm:bg-secondaryDark">
            <div className="mb-2 ml-4 font-semibold text-gray-500 sm:my-4 text-md">
              Members
            </div>

            <div className="mx-4">
              <div className="flex overflow-auto sm:flex-col sm:border-b-0">
                {chatMembers.length
                  ? chatMembers.map((userId, index) => {
                      const { photoURL, fullName } = getUserById(userId);

                      return (
                        <div
                          key={`${index} Chat Member ${fullName}`}
                          className="flex items-center px-4 my-2 mb-2 border-r last:border-r-0 sm:border-r-0 first:pl-0 last:pr-0 sm:px-0 sm:mb-4 border-r-red-300"
                        >
                          <FallbackImg
                            alt={`${fullName} profile img`}
                            src={photoURL}
                            className="inline object-cover w-6 h-6 mr-2 rounded-full"
                            FallbackComponent={
                              <GenericAvatar className="w-6 h-6 p-1 mr-2 bg-gray-300 rounded-full fill-white" />
                            }
                          />
                          <span className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                            {fullName}
                          </span>
                        </div>
                      );
                    })
                  : "No Members"}
              </div>
              <hr className="mt-1 mb-2 border-red-300 sm:hidden"></hr>
            </div>
          </div>
        </div>
        {isBelowScreenSize("sm") && (
          <>
            <div className="">
              <ViewChats ref={ref} roomId={roomId} chats={chats} />
            </div>
            <span className="">{submitChatForm}</span>
          </>
        )}
      </div>
    )
  );
}

export default ViewRoom;
