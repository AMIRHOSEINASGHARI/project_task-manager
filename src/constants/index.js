import { PiInfinityLight } from "react-icons/pi";
import { AiOutlineStar } from "react-icons/ai";
import { CiCircleCheck } from "react-icons/ci";

export const menuList = [
  {
    icon: <PiInfinityLight />,
    name: "all",
    link: "/tasks/all",
  },
  {
    icon: <AiOutlineStar />,
    name: "important",
    link: "/tasks/important",
  },
  {
    icon: <CiCircleCheck />,
    name: "completed",
    link: "/tasks/completed",
  },
];
