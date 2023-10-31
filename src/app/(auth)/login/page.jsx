"use client";

//* React
import { useEffect } from "react";
//* Next
import { useRouter } from "next/navigation";
//* Components
import { AuthForm } from "@/components";
//* firebase
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const LoginPage = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  // useEffect(() => {
  //   if (user) router.push("/");
  // }, [user]);

  return <AuthForm type="login" />;
};

export default LoginPage;
