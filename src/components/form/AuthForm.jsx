"use client";

//* React
import { useState } from "react";
//* Next
import Link from "next/link";
import { useRouter } from "next/navigation";
//* React Icons
import { FcGoogle } from "react-icons/fc";
//* Firebase
import { auth } from "@/firebase";
//* Firebase-hooks
import {
  useSignInWithGoogle,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";

const AuthForm = ({ type }) => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [
    createUserWithEmailAndPassword,
    emailUserRegister,
    emailLoadingRegister,
    emailErrorRegister,
  ] = useCreateUserWithEmailAndPassword(auth);

  const handleChangeInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //* REGISTER AUTH
    if (type === "register") {
      try {
        const newUser = await createUserWithEmailAndPassword(
          form.email,
          form.password
        );
        if (newUser) router.push("/");
        if (!newUser) alert(emailErrorRegister);
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <form
        className="w-[280px] sm:w-[350px] md:w-[400px] flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <h1 className="text-5xl font-black text-gray-600 mb-10">Welcome</h1>
        <button
          type="button"
          onClick={() => signInWithGoogle()}
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
            value={form.email}
            onChange={handleChangeInput}
            placeholder="Email"
            className="w-full bg-white border rounded-md px-3 py-2 placeholder:text-black placeholder:font-semibold placeholder:text-sm font-semibold text-sm"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChangeInput}
            placeholder="Password"
            className="w-full bg-white border rounded-md px-3 py-2 placeholder:text-black placeholder:font-semibold placeholder:text-sm font-semibold text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={emailLoadingRegister}
          className={`font-semibold text-sm w-full rounded-md py-2 mb-5 ${
            emailLoadingRegister
              ? "bg-gray-100 text-gray-500"
              : "bg-black text-white"
          }`}
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
