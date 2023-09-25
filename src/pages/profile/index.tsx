"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useAppSelector } from "@/redux/store";
import { useAppDispach } from "@/redux/hooks";
import { generateNumber } from "@/redux/features/NumberValidationSlice";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  const dispach = useAppDispach();

  const number = useAppSelector(
    (state) => state.NumberValidation.numberValidation
  );

  useEffect(() => {
    dispach(generateNumber());
  }, []);

  const SendEmail = async () => {
    try {
      const respose = await axios.post(`/api/send`, {
        subject: "Verificacion de Email",
        email: session?.user?.email,
        name: session?.user?.name,
        text: "Haz dado click a el boton para confirmar tu email",
        number,
      });
    } catch (error) {
      console.log("Error al enviar email", error);
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center">
      <h1>Mi perfil</h1>
      <p>Administra y protege tu cuenta</p>
      <div className="p-12 rounded-full bg-gray-400"></div>
      <h4>{session?.user?.name}</h4>
      <h4>{session?.user?.email}</h4>
      <h4>
        {/* {session?.user?.email_verification ? "Confirmado" : "Sin confirmacion"} */}
      </h4>
      <button className="bg-black text-white" onClick={() => SendEmail()}>
        Confirmar
      </button>

      {/* <p>{number}</p> */}
    </div>
  );
}
