//* Next
import Image from "next/image";
import Link from "next/link";
//* firebase
import { auth } from "@/firebase";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
//* React Icons
import { TbLogout2 } from "react-icons/tb";
import { IoFingerPrintOutline } from "react-icons/io5";
import { Loader } from ".";

const AuthSection = () => {
  const [user] = useAuthState(auth);
  const [signOut, loading_logout] = useSignOut(auth);

  return (
    <>
      {user && (
        <div className="flex items-center gap-3 border-2 rounded-full px-1.5 py-0.5">
          <button type="button" onClick={() => signOut()}>
            {loading_logout ? (
              <Loader h={20} w={20} />
            ) : (
              <TbLogout2 className="text-2xl text-white" />
            )}
          </button>
          <Image
            className="rounded-full"
            src={user?.photoURL || "/user.png"}
            width={25}
            height={25}
            alt="user"
            priority
          />
        </div>
      )}
      {!user && (
        <Link
          href="/login"
          className="flex items-center gap-2 rounded-full py-1 px-3 border-2 text-white hover:bg-blue-400 transition duration-100"
        >
          <IoFingerPrintOutline className="text-xl" />
          <p className="font-bold">Sign in</p>
        </Link>
      )}
    </>
  );
};

export default AuthSection;
