import React, { createRef, useEffect, useState } from "react";

function Loading({ text = "Loading", hydrated, liftGate }) {
  const [indicatorIndex, setIndicatorIndex] = useState(0);
  const [direction, setDirection] = useState("standard");
  const loadingIndicatorRefs = [...Array(5)].map((ref) => createRef());

  function targetNextRef() {
    let nextIndex;

    if (direction === "standard") {
      if (indicatorIndex === loadingIndicatorRefs.length - 1) {
        nextIndex = indicatorIndex - 1;
        setDirection("reverse");
      } else {
        nextIndex = indicatorIndex + 1;
      }
    } else if (direction === "reverse") {
      if (indicatorIndex === 0) {
        nextIndex = indicatorIndex + 1;
        setDirection("standard");
      } else {
        nextIndex = indicatorIndex - 1;
      }
    }

    setIndicatorIndex(nextIndex);
  }

  const loadingIndicators = loadingIndicatorRefs.map((ref, index) => {
    return (
      <span
        key={`loading indicator ${index + 1}`}
        ref={ref}
        className={`duration-200 h-10 w-4 bg-red-200 ${
          indicatorIndex === index ? "scale-y-150" : "scale-y-75"
        }`}
      ></span>
    );
  });

  useEffect(() => {
    const interval = window.setInterval(targetNextRef, 200);

    return () => clearInterval(interval);
  });
  return (
    <div className="w-40">
      <span className="block mb-8 text-center dark:text-red-300">{text}</span>
      <div className="flex items-center justify-center space-x-2">
        {loadingIndicators}
      </div>
    </div>
  );
}

export default Loading;
