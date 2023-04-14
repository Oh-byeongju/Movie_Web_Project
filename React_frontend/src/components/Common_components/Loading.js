import React from "react";
import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <div
    style={{
        position: "fixed",
        flex:"1",
        left:"30%",
        top:"45%",
        transform: "translate(-50%, -50%)",
      }}>
    <ClipLoader
          color="#C63DEE"
          height={100}
          width={100}
          radius={2}
          margin={2}
        />
    </div>
  );
};

export default Loading;