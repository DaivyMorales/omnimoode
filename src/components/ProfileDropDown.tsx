import React from "react";
import { useRouter } from "next/router";

export default function ProfileDropDown() {
  const router = useRouter();

  return (
    <div className="absolute dropdown-profile flex flex-col gap-2  bg-white rounded-md p-2 shadow-lg">
      <button
        onClick={() => router.push("/login")}
        className="bg-black text-white py-2 px-1 w-full  rounded-lg text-sm"
      >
        Login
      </button>
      <p className="font-semibold">
        ¿No tienes cuenta aún?{" "}
        <span
          onClick={() => router.push("/register")}
          className="text-blue-600 underline cursor-pointer"
        >
          Creala Aquí
        </span>
      </p>
    </div>
  );
}
