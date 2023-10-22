//* Next
import Image from "next/image";
import Link from "next/link";
//* firebase
import { auth } from "@/firebase";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
//* React Icons
import { TbLogout2 } from "react-icons/tb";
import { IoFingerPrintOutline } from "react-icons/io5";

const AuthSection = () => {
  const [user] = useAuthState(auth);
  const [signOut, loading_logout] = useSignOut(auth);

  return (
    <>
      {user && (
        <div className="flex items-center gap-3 border-2 rounded-full px-1.5 py-0.5">
          <button type="button" onClick={() => signOut()}>
            {loading_logout ? "Loading" : <TbLogout2 className="text-xl" />}
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
          className="flex items-center gap-2 rounded-full py-1 px-3 border-2 hover:bg-gray-100"
        >
          <IoFingerPrintOutline className="text-xl" />
          <p className="font-bold text-gray-600">Sign in</p>
        </Link>
      )}
    </>
  );
};

export default AuthSection;
