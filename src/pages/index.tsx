import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Home() {

  const { status } = useSession();



  return (
    <div>

      <section className=" h-screen bg-black"></section>
      <section className=" h-screen "></section>
      <section className=" h-screen "></section>

      {status === "authenticated" && (
        <>
          <h1>You are Welcome! </h1>
          <button
            className="bg-red-500 p-2 text-white"
            onClick={() => {
              signOut({ callbackUrl: "/login" });
            }}
          >
            Salir
          </button>
        </>
      )}
    </div>
  );
}


