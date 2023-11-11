import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { HiOutlineMail, HiCheck } from "react-icons/hi";
import axios from "axios";

export default function Home() {
  const { status } = useSession();

  const [emailValue, setEmailValue] = useState("");
  const [statusResponse, setStatusResponse] = useState(0);

  const handleNewsletter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    setEmailValue(inputText);
  };

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
          <div
            className={`${
              statusResponse === 200 && "border-green-500 text-green-400"
            } border-1 border-gray-300 w-full px-2 py-1 flex justify-start items-center gap-2 rounded-lg`}
          >
            <div className="bg-black p-2 rounded-md">
              <HiOutlineMail />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              onChange={handleNewsletter}
              placeholder="Digita tu email"
              //value={formik.values.email}
            />
            <button
              onClick={async () => {
                const response = await axios.post("/api/newsletter", {
                  email: emailValue,
                });

                if (response.status === 200) {
                  setStatusResponse(200);
                }
                console.log(response.data, response.status);
              }}
              className="text-xs bg-black p-1 rounded-md bg-white text-black font-semibold w-24 flex justify-center items-center"
            >
              {statusResponse === 200 ? (
                <>
                  <HiCheck />
                </>
              ) : (
                "Notificarme"
              )}
            </button>
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
