import React, { useState } from "react";

function FallbackImg({ alt, src, className, FallbackComponent }) {
  const [shouldUseDefault, setShouldUseDefault] = useState(true);

  function generateSrc() {
    if (src) return src;
    else setShouldUseDefault(false);
  }
  return shouldUseDefault ? (
    <img
      alt={alt}
      src={generateSrc()}
      onError={() => setShouldUseDefault(false)}
      className={className}
    ></img>
  ) : (
    FallbackComponent
  );
}

export default FallbackImg;
