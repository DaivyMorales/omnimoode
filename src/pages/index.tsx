import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Home() {
  const { status } = useSession();

  return (
    <main>
      <section className="h-32 flex justify-center items-center flex-col bg-gray-300 gap-2">
        <div className="flex flex-col justify-center items-center">
          <h2 className="font-bold">SUSCRIBETE A NUESTRO NEWSLETTER</h2>
          <p>
            ¡Suscríbete a nuestro boletín de moda! Recibe actualizaciones
            exclusivas, promociones y consejos de estilo.
          </p>
        </div>
        <div className="bg-red-500 flex gap-2">
          <input type="text" />
          <button>Notificarme</button>
        </div>
      </section>
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
    </main>
  );
}
