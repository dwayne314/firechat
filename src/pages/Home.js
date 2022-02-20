import React, { useState } from "react";
import { Link } from "react-router-dom";
import useDatabase from "../hooks/useDatabase";
import { AiOutlinePlus } from "react-icons/ai";

function Home() {
  const { allRooms } = useDatabase();
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roomCountLimit, setRoomCountLimit] = useState(15);

  function toggleSearch() {
    setIsSearching(!isSearching);
  }

  const visibleRooms = allRooms
    .filter(
      (room) => room.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    )
    .map((room, index) => {
      return (
        <Link
          to={`rooms/${room.id}`}
          key={`Search Result ${index}`}
          className="block"
        >
          <div className="px-4 py-2 border-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:border-gray-500 dark:hover:bg-gray-500 dark:border-secondaryDark dark:bg-secondaryDark">
            {room.name}
          </div>
        </Link>
      );
    });

  const filteredRooms = visibleRooms.slice(0, roomCountLimit);
  const remainingRoomCount = visibleRooms.length - roomCountLimit;

  return (
    <div className="p-4 pt-4">
      <div className="mb-4 text-xl font-bold text-center dark:text-white">
        Find Rooms
      </div>
      <div className="flex items-center justify-between mb-2">
        <input
          type="text"
          placeholder="Search Rooms"
          className={`px-2 py-1 border-2 border-red-100 rounded focus:outline-none dark:border-secondaryDark dark:bg-secondaryDark dark:text-white ${
            isSearching ? "w-full" : "w-1/2"
          }`}
          onChange={(evt) => setSearchTerm(evt.target.value)}
          onFocus={toggleSearch}
          onBlur={toggleSearch}
        ></input>
        <Link to="rooms/create">
          <span
            className={`flex flex-shrink-0 justify-center items-center h-8 ml-2 rounded bg-red-300 text-black cursor-pointer ${
              isSearching ? "w-10" : "w-40"
            }`}
          >
            {!isSearching ? "Create Room" : <AiOutlinePlus />}
          </span>
        </Link>
      </div>
      <hr className="my-6 border-red-300"></hr>
      <div className="mb-2 font-light text-black dark:text-white">{`Showing ${filteredRooms.length} of ${visibleRooms.length} rooms`}</div>
      <div className="space-y-2 overflow-y-auto max-h-scrollable-body custom-scrollbar custom-scrollbar-child dark:text-gray-300">
        {filteredRooms}
      </div>
      {remainingRoomCount > 0 ? (
        <div
          onClick={() => setRoomCountLimit(roomCountLimit + 10)}
          className="my-2 text-sm text-center text-black cursor-pointer dark:text-white"
        >
          {`Load ${remainingRoomCount > 10 ? 10 : remainingRoomCount} More`}
        </div>
      ) : (
        <div className="my-2 text-sm text-center text-black dark:text-white">
          Showing All Rooms
        </div>
      )}
    </div>
  );
}

export default Home;
