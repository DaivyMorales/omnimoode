import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function index() {
  const router = useRouter();

  const { data: session, status } = useSession();

  return (
    <div>
      <h1>Hi</h1>
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
