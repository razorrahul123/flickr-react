import React, { useState } from "react";
//Component for image lazy loading
const ImageLoader = ({ src }) => {
  const [loaded, setLoaded] = useState(false);
  const onLoad = () => {
    setLoaded(true);
  };
  return (
    <img
      src={src}
      alt={"gallery"}
      className={loaded ? "img-loaded" : "img-loading"}
      onLoad={onLoad}
    />
  );
};

export default ImageLoader;
