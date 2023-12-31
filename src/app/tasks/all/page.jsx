"use client";

//* React
import { useContext, useEffect, useState } from "react";
import { MainContext } from "@/context/MainContextProvider";
//* React Icons
import { PiInfinityLight } from "react-icons/pi";
import { BsPlusLg } from "react-icons/bs";
//* Components
import { CustomButton, Loader, Tasks, TextField } from "@/components";
import toast from "react-hot-toast";
//* firebase
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
//* Utility functions
import { generateUniqueId } from "@/utils";

const All = () => {
  const { showMenu } = useContext(MainContext);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [todos, setTodos] = useState(null);

  const fetchTodos = async () => {
    const userDoc = doc(db, "users", user?.email);
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
      setTodos(docSnap.data().todos);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const changeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmitTask = async (e) => {
    e.preventDefault();
    if (!inputValue) {
      toast.error("Invalid field!");
    } else {
      try {
        setLoading(true);
        const userDoc = doc(db, "users", user?.email);
        await updateDoc(userDoc, {
          "todos.tasks": arrayUnion({
            id: generateUniqueId(),
            title: inputValue,
            note: "",
            completed: false,
            important: false,
            category: [],
          }),
        });
        setInputValue("");
        setLoading(false);
        fetchTodos();
      } catch (error) {
        console.log(error);
      }
    }
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
        <div className="mb-10">
          <CustomButton
            type="submit"
            title={loading ? <Loader h={20} w={20} /> : "Add"}
            containerStyles="border bg-gray-100 px-4 py-1.5 rounded-md text-sm font-light mt-2"
          />
        </div>
      </form>
      <section className="w-full space-y-3">
        <Tasks todos={todos} />
      </section>
    </div>
  );
};

export default All;
