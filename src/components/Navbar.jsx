"use client";

import Image from "next/image";
import Link from "next/link";
import { IoIosMenu } from "react-icons/io";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between p-3 sm:px-5">
      <div className="flex items-center gap-5">
        <button type="button">
          <IoIosMenu className="text-4xl p-1 rounded-full hover:bg-gray-100" />
        </button>
        <Link href="/tasks/all" className="flex items-center gap-1">
          <Image src="/logo.svg" width={25} height={25} alt="to do" priority />
          <p className="font-bold tracking-tight text-blue-500 text-sm">
            To Do
          </p>
        </Link>
      </div>
      {/* //TODO: AuthSection component */}
    </header>
  );
};

export default Navbar;
