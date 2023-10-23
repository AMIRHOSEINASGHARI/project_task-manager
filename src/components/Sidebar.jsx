"use client";

//* Next
import Link from "next/link";
import { usePathname } from "next/navigation";
//* Constants
import { menuList } from "@/constants";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="shadow-md shadow-gray-300 flex flex-col fixed top-[60px] z-10 h-screen">
      {menuList.map((item) => (
        <Link
          key={item.name}
          href={item.link}
          className={`flex items-center gap-5 px-3 py-3 sm:px-6 lg:pr-20 hover:bg-gray-100 transition duration-100 border-l-4 ${
            pathname.includes(item.name)
              ? "bg-blue-100 border-blue-500 text-blue-700"
              : "border-white"
          }`}
        >
          <div className="text-xl">{item.icon}</div>
          <p className="capitalize font-light text-sm">{item.name}</p>
        </Link>
      ))}
    </aside>
  );
};

export default Sidebar;
