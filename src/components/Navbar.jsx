"use client";

//* React
import { useContext, useEffect, useRef } from "react";
//* Next
import Image from "next/image";
import Link from "next/link";
//* Components
import { AuthSection } from ".";
//* React Icons
import { IoIosMenu } from "react-icons/io";
//* Context
import { MainContext } from "@/context/MainContextProvider";

const Navbar = () => {
  const { showMenu, setShowMenu } = useContext(MainContext);
  const deviceWidth = useRef();

  useEffect(() => {
    if (deviceWidth.current.scrollWidth < 640) setShowMenu(false);
  }, []);

  return (
    <header
      ref={deviceWidth}
      className="flex items-center justify-between p-3 sm:px-5 fixed top-0 bg-white w-full z-10"
    >
      <div className="flex items-center gap-5">
        <button type="button" onClick={() => setShowMenu(!showMenu)}>
          <IoIosMenu className="text-4xl p-1 rounded-full hover:bg-gray-100" />
        </button>
        <Link href="/tasks/all" className="flex items-center gap-1">
          <Image src="/logo.svg" width={25} height={25} alt="to do" priority />
          <p className="font-bold tracking-tight text-blue-500 text-sm">
            To Do
          </p>
        </Link>
      </div>
      <AuthSection />
    </header>
  );
};

export default Navbar;
