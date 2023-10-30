"use client";

//* React
import { useContext } from "react";
import { MainContext } from "@/context/MainContextProvider";

const All = () => {
  const { showMenu } = useContext(MainContext);
  return (
    <div
      className={`mt-[60px] pt-[10px] min-h-screen ${
        showMenu ? "pl-[260px]" : "pl-[70px] sm:pl-[90px]"
      }`}
    >
      All
    </div>
  );
};

export default All;
