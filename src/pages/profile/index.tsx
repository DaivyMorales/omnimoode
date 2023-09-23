import React from "react";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  return (
    <div className="bg-red-500 flex flex-col items-center justify-center">
      <h1>Mi cuenta</h1>
      <div className="p-12 rounded-full bg-gray-400"></div>
      <h2>{session?.user?.name}</h2>
      <h2>{session?.user?.email}</h2>
      <h2>
        {/* {session?.user?.email_verification ? "Confirmado" : "Sin confirmacion"} */}
      </h2>
    </div>
  );
}
