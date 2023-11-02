"use client";

//* Next
import Link from "next/link";
//* React Icons
import { GoCircle, GoCheckCircleFill } from "react-icons/go";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

const Tasks = ({ todos }) => {
  if (todos === null) {
    return "LOADING...";
  } else if (todos?.tasks?.length !== 0) {
    return (
      <>
        {todos?.tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-6 w-full bg-white shadow rounded py-2 px-5"
          >
            <button className="text-xl text-blue-600">
              <GoCircle />
            </button>
            <div className="flex items-center justify-between w-full">
              <Link
                href={`/tasks/id/${task.id}`}
                className="font-light text-sm w-full py-2 mr-2"
              >
                {task.title}
              </Link>
              <div className="flex items-center gap-2">
                <button className="p-2 text-blue-500 hover:bg-gray-100 rounded-full">
                  <PiDotsThreeOutlineVerticalFill />
                </button>
                <button className="text-xl text-blue-600">
                  <AiOutlineStar />
                </button>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  } else {
    return null;
  }
};

export default Tasks;
