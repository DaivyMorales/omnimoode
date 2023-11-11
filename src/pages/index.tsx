import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { HiOutlineMail } from "react-icons/hi";

export default function Home() {
  const { status } = useSession();

  return (
    <main className="bg-red-500">
      <section className="py-6 flex justify-center items-center flex-col bg-black text-white gap-2">
        
        <div className="flex flex-col justify-center items-center">
          <h2 className="font-bold">SUSCRIBETE A NUESTRO NEWSLETTER</h2>
          <p>
            ¡Suscríbete a nuestro boletín de moda! Recibe actualizaciones
            exclusivas, promociones y consejos de estilo.
          </p>
        </div>
        <div className=" flex gap-2">
          <div className="inputLogin">
            <div className="bg-black p-2 rounded-md">
              <HiOutlineMail />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              //onChange={handleInputChange}
              placeholder="Digita tu email"
              //value={formik.values.email}
            />
            <button className="text-xs bg-black p-1 rounded-md bg-white text-black font-semibold">Notificarme</button>
          </div>
        </div>
      </section>
      <section className=" h-screen bg-white"></section>
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
