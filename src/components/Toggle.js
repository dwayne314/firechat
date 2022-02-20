import React from "react";
import useDarkMode from "../hooks/useDarkMode";

function Toggle() {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="relative w-12 h-6 bg-red-300 rounded-full">
      <div
        className={`h-full w-6 duration-100 ${
          isDarkMode ? "translate-x-full" : ""
        }`}
      >
        <span
          className={`absolute left-[2px] top-[2px] h-5 w-5 rounded-full bg-white`}
        ></span>
      </div>
    </div>
  );
}

export default Toggle;
