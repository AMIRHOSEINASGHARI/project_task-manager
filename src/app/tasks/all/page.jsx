"use client";

//* React
import { useContext, useState } from "react";
import { MainContext } from "@/context/MainContextProvider";
//* React Icons
import { PiInfinityLight } from "react-icons/pi";
import { BsPlusLg } from "react-icons/bs";
//* Components
import { CustomButton, TextField } from "@/components";
//* firebase
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { generateUniqueId } from "@/utils";

const All = () => {
  const { showMenu } = useContext(MainContext);
  const [inputValue, setInputValue] = useState("");
  const [user] = useAuthState(auth);

  const changeHandler = (e) => {
    setInputValue(e.target.value);
  };

  //TODO: submit task input
  const handleSubmitTask = async (e) => {
    e.preventDefault();

    await useAddTask(inputValue, user.uid);
  };

  return (
    <div
      className={`mt-[60px] pt-[10px] pr-3 sm:pr-6 min-h-screen ${
        showMenu ? "pl-[260px]" : "pl-[70px] sm:pl-[90px]"
      }`}
    >
      <div className="flex items-center gap-2 text-blue-500 mb-7">
        <div className="text-2xl">
          <PiInfinityLight />
        </div>
        <p className="text-lg font-bold">All</p>
      </div>
      <form onSubmit={handleSubmitTask}>
        <TextField
          name="add"
          type="text"
          placeholder="Add a task here"
          inputValue={inputValue}
          changeHandler={changeHandler}
          containerStyles="shadow rounded-sm flex items-center gap-3"
          containerIcon={<BsPlusLg className="text-blue-500 text-lg ml-5" />}
        />
        <div>
          <CustomButton
            type="submit"
            title="Add"
            containerStyles="border bg-gray-100 px-4 py-1.5 rounded-md text-sm font-light mt-2"
          />
        </div>
      </form>
    </div>
  );
};

export default All;

const useAddTask = async (title, userId) => {
  const userDoc = doc(db, "users", userId);
  await updateDoc(userDoc, {
    "todos.tasks": arrayUnion({
      id: generateUniqueId(),
      title: title,
      note: "",
      completed: false,
      important: false,
      category: [],
    }),
  });
  return;
};
