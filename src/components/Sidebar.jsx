"use client";

//* React
import { useContext } from "react";
//* Next
import Link from "next/link";
import { usePathname } from "next/navigation";
//* Constants
import { menuList } from "@/constants";
//* Context
import { MainContext } from "@/context/MainContextProvider";

const Sidebar = () => {
  const pathname = usePathname();
  const { showMenu } = useContext(MainContext);

  if (pathname.includes("/login") || pathname.includes("/register"))
    return null;

  return (
    <aside className="bg-white shadow flex flex-col fixed top-[60px] z-10 h-screen">
      {menuList.map((item) => (
        <Link
          key={item.name}
          href={item.link}
          className={`flex items-center gap-7 py-3 hover:bg-gray-100 transition duration-100 border-l-4 ${
            pathname.includes(item.name)
              ? "bg-blue-100 border-blue-500 text-blue-700"
              : "border-white"
          } ${showMenu ? "pr-20 pl-4 sm:pl-6" : "px-4 sm:px-6"}`}
        >
          <div className="text-xl">{item.icon}</div>
          {showMenu && (
            <p className="capitalize font-light text-sm">{item.name}</p>
          )}
        </Link>
      ))}
    </aside>
  );
};

export default Sidebar;
