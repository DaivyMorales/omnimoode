import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";

export default function Home() {
  const router = useRouter();

  const { data: session, status } = useSession();

  return (
    <div>
      <section className=" h-screen bg-red-500"></section>
      <section className=" h-screen bg-purple-500"></section>
      <section className=" h-screen bg-blue-500"></section>

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
