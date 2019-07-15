import React from "react";
import { Image } from "mdx-deck";

const BgImage = ({ src, children, color, opacity }) => {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: color || (opacity < 1 ? "black" : "white"),
        backgroundColor: "white"
      }}
    >
      <Image src={src} style={{ position: "absolute", opacity }} />
      <div style={{ position: "relative" }}>{children}</div>
    </div>
  );
};

BgImage.defaultProps = {
  opacity: 1
};

export default BgImage;
