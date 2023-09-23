import React from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import Link from 'next/link';

export default function ProfileDropDown() {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log(session);
  console.log(status);
  
  return (
    <>
      {status === "unauthenticated" ? (
        <div className="absolute dropdown-profile flex flex-col justify-center items-center gap-2 bg-white rounded-md p-2 shadow-lg w-32">
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
        <div className="absolute dropdown-profile flex flex-col justify-start gap-2 bg-white rounded-md p-2 shadow-lg w-32">
          <Link href="/profile" className="bg-red-500">Mi cuenta</Link>
          <a>Mis compras</a>
          <button
            className="text-xs"
            onClick={() => {
              signOut({ callbackUrl: "/login" });
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      )}
    </>
  );
}
