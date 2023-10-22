"use client";

import { Oval } from "react-loader-spinner";

const Loader = ({ h, w, text, color, containerStyles }) => {
  return (
    <div className={containerStyles || ""}>
      <Oval
        height={h}
        width={w}
        radius="9"
        color={color || "#000"}
        ariaLabel="three-dots-loading"
        visible={true}
      />
      {text && <p className="text-center tracking-tight -mt-5">{text}</p>}
    </div>
  );
};

export default Loader;
