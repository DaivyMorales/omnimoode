import React from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import Link from 'next/link';
import { PiUserBold, PiShoppingCartBold } from 'react-icons/pi'
import { TbLogout } from 'react-icons/tb'

interface DropDownProps {
  openProfile: boolean;
  setOpenProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProfileDropDown({ openProfile, setOpenProfile }: DropDownProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log(session);
  console.log(status);

  return (
    <>
      {status === "unauthenticated" ? (
        <div className="absolute dropdown-profile shadow-lg flex flex-col justify-center items-center gap-2 bg-white rounded-md p-2 shadow-lg w-40">
          <button
            onClick={() => router.push("/login")}
            className="bg-black text-white py-2 px-1 w-full  rounded-lg text-sm"
          >
            Login
          </button>
          <p className="font-semibold flex justify-center flex-col items-center">
            ¿No tienes cuenta aún?{" "}
            <span
              onClick={() => router.push("/register")}
              className="text-blue-600 underline cursor-pointer"
            >
              Creala Aquí
            </span>
          </p>
        </div>
      ) : (
        <div className="absolute bg-white ring-1 ring-gray-200 dropdown-profile flex flex-col justify-start rounded-md shadow-lg w-52">
          {/* USER INFORMATION */}
          <div className="flex  p-2 w-full justify-start items-center gap-3 ">
            <div className="p-1 bg-gray-200 ring-2 ring-blue-600 rounded-full">
              <PiUserBold />
            </div>
            <div className="flex flex-col justify-center items-start gap-x-1 ">
              <p className="text-xs font-semibold">{session?.user?.name}</p>
              <p className="text-2xs text-gray-400 font-light">{session?.user?.email}</p>
            </div>
          </div>
          <hr />

          {/* OPTIONS */}

          <Link href="/profile" onClick={() => { setOpenProfile(false) }} className="flex text-xs gap-2 px-3 py-2 justify-start items-center w-full hover:bg-gray-200 cursor-pointer">
            <div className="">
              <PiUserBold size={18} />
            </div>
            Tu cuenta
          </Link>

          <Link href="/buys" onClick={() => { setOpenProfile(false) }} className="flex text-xs gap-2 px-3 py-2 justify-start items-center w-full hover:bg-gray-200 cursor-pointer">
            <div className="">
              <PiShoppingCartBold size={18} />
            </div>
            Tus compras

          </Link>

          {/* LOGOUT */}
          <hr />
          <div
            onClick={() => {
              signOut({ callbackUrl: "/login" });
              setOpenProfile(false)
            }}
            className="flex w-full px-3 py-2 gap-2 hover:bg-gray-200 cursor-pointer rounded-b-md">
            <TbLogout size={18} />
            <p
              className="text-xs cursor-pointer"

            >
              Cerrar Sesión
            </p>
          </div>
        </div>
      )}
    </>
  );
}
