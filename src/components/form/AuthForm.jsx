"use client";

//* React
import { useState, useEffect } from "react";
//* Next
import Link from "next/link";
import { useRouter } from "next/navigation";
//* React Icons
import { FcGoogle } from "react-icons/fc";
//* Firebase
import { auth, db } from "@/firebase";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
//* Firebase-hooks
import {
  useSignInWithGoogle,
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { Loader } from "..";

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
  const [
    signInWithEmailAndPassword,
    emailUserLogin,
    emailLoadingLogin,
    emailErrorLogin,
  ] = useSignInWithEmailAndPassword(auth);

  const handleChangeInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) return toast.error("Enter valid data");

    //* REGISTER AUTH
    if (type === "register") {
      try {
        const newUser = await createUserWithEmailAndPassword(
          form.email,
          form.password
        );
        const userData = {
          uid: newUser?.user?.uid,
          email: newUser?.user?.email,
          photoURL: newUser?.user?.photoURL,
          todos: {},
        };
        await useAddUserDoc(userData);
        if (!emailErrorRegister) router.push("/tasks/all");
      } catch (error) {
        toast.error("بعدا امتحان کنید");
      }
    }

    //* LOGIN AUTH
    if (type === "login") {
      try {
        await signInWithEmailAndPassword(form.email, form.password);
        if (!emailErrorLogin) router.push("/tasks/all");
      } catch (error) {
        toast.error("بعدا امتحان کنید");
      }
    }
  };
  console.log(emailErrorLogin);
  const googleRegister = async () => {
    const newUser = await signInWithGoogle();
    const userData = {
      uid: newUser?.user?.uid,
      email: newUser?.user?.email,
      photoURL: newUser?.user?.photoURL,
      todos: {},
    };
    await useAddUserDoc(userData);
    if (newUser) router.push("/tasks/all");
  };

  useEffect(() => {
    if (emailErrorRegister?.message.includes("email-already-in-use")) {
      toast.error("ایمیل قبلا ثبت شده");
    }

    if (emailErrorLogin?.message.includes("invalid-login-credentials")) {
      toast.error("رمز عبور یا ایمیل درست نیست");
    }
  }, [googleError, emailErrorRegister, emailErrorLogin]);

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <form
        className="w-[280px] sm:w-[350px] md:w-[400px] flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <h1 className="text-5xl font-black text-gray-600 mb-10">Welcome</h1>
        <button
          type="button"
          onClick={googleRegister}
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
          disabled={emailLoadingRegister || emailLoadingLogin}
          className={`font-semibold text-sm w-full rounded-md py-2 mb-5 flex justify-center ${
            emailLoadingRegister || emailLoadingLogin
              ? "bg-gray-100 text-gray-500"
              : "bg-black text-white"
          }`}
        >
          {emailLoadingLogin || emailLoadingRegister ? (
            <Loader h={20} w={20} />
          ) : type === "register" ? (
            "Sign up"
          ) : (
            "Log in"
          )}
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

export const useAddUserDoc = async (userData) => {
  try {
    const userRef = doc(db, "users", userData.uid);
    const userSnapShot = await getDoc(userRef);
    if (userSnapShot._document) {
      return null;
    } else {
      await setDoc(doc(db, "users", userData.uid), userData);
      return;
    }
  } catch (error) {
    toast.error("Try again later");
  }
};
