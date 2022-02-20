import React, { forwardRef } from "react";
import useAuth from "../hooks/useAuth";
import useDatabase from "../hooks/useDatabase";
import FallbackImg from "../components/FallbackImg";
import { ReactComponent as GenericAvatar } from "../assets/generic-avatar.svg";

const ViewChats = forwardRef((props, ref) => {
  const { chats } = props;
  const { currentUser } = useAuth();
  const { allUsers } = useDatabase();

  function getUserData(userId) {
    return allUsers.find((user) => user.id === userId);
  }

  return (
    <div className="relative flex flex-col text-black">
      <div className="flex flex-col p-4 overflow-y-scroll custom-scrollbar h-scrollable-view-chats sm:h-scrollable-view-chats-desktop mb-[70px]">
        {chats.map((chat, index) => {
          const isCurrentUser = chat.userId === currentUser.id;
          const { fullName, photoURL } = getUserData(chat.userId);

          return (
            <div
              id={`chat ${index === chats.length - 1}`}
              key={`chat ${index}`}
              ref={index === chats.length - 1 ? ref : null}
              className={`flex py-2 ${isCurrentUser ? "flex-row-reverse" : ""}`}
            >
              <FallbackImg
                alt={`${fullName} profile img`}
                src={photoURL}
                className={`inline h-10 w-10 rounded-full mt-auto object-cover ${
                  isCurrentUser ? "ml-2" : "mr-2"
                }`}
                FallbackComponent={
                  <GenericAvatar
                    className={`p-1 h-10 w-10 rounded-full mt-auto object-cover bg-gray-300 fill-white ${
                      isCurrentUser ? "ml-2" : "mr-2"
                    }`}
                  />
                }
              />
              <div
                className={`flex flex-col${isCurrentUser ? " items-end" : ""}`}
              >
                <div
                  className={`mt-auto text-md sm:text-sm bg-red-200 rounded-2xl px-4 py-1 max-w-200 break-words ${
                    !isCurrentUser
                      ? "bg-gray-300 dark:bg-secondaryDark dark:text-white"
                      : ""
                  }`}
                >
                  {chat.message}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default ViewChats;
