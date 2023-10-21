"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const AuthForm = ({ type }) => {
  //TODO: submit form
  const handleSubmit = (e) => {};

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        className="w-[280px] sm:w-[350px] md:w-[400px] flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <h1 className="text-5xl font-black text-gray-600 mb-10">Welcome</h1>
        <button
          type="button"
          className="flex items-center justify-center gap-3 rounded-md shadow-md shadow-gray-200 py-2 w-full"
        >
          <FcGoogle />
          <p className="font-bold text-sm">
            {type == "register" ? "Sign up with Google" : "Log in with Google"}
          </p>
        </button>
        <div className="w-full flex items-center my-6">
          <div className="bg-gray-200 w-full h-[1px]" />
          <p className="bg-white px-3 text-gray-500">or</p>
          <div className="bg-gray-200 w-full h-[1px]" />
        </div>
        <div className="w-full space-y-3 mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full bg-white border rounded-md px-3 py-2 placeholder:text-black placeholder:font-semibold placeholder:text-sm font-semibold text-sm"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full bg-white border rounded-md px-3 py-2 placeholder:text-black placeholder:font-semibold placeholder:text-sm font-semibold text-sm"
          />
        </div>
        <button
          type="submit"
          className="font-semibold text-sm bg-black text-white w-full rounded-md py-2 mb-5"
        >
          {type === "register" ? "Sign up" : "Log in"}
        </button>
        <div className="flex items-center justify-between text-xs gap-3">
          <p>
            {type === "register"
              ? "Already have an account?"
              : "Don't have an account?"}
          </p>
          <Link
            className="p-1 rounded-md bg-gray-50 border font-bold"
            href={type == "register" ? "/login" : "/register"}
          >
            {type == "register" ? "Login" : "Sign up"}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
