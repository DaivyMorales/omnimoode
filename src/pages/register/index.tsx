import React, { useState } from "react";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import Image from "next/image";
import { useRouter } from "next/router";
import * as Yup from "yup";

export default function Register() {
  const [error, setError] = useState("");

  const validation = Yup.object({
    name: Yup.string()
      .max(50, "No puedes sobrepasar los 50 caracteres!")
      .required("Haz olvidado escribir tu nombre"),
    email: Yup.string()
      .email("correo Invalido")
      .required("Has olvidado escribir tu email"),
  });

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validation,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);

      try {
        const query = await axios.post("/api/auth/signup", values);
        console.log(query);
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data.message);
        }
      }
      resetForm();
    },
  });

  return (
    <div className=" h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="background hidden lg:block h-full"></div>
      {error && <div className="bg-red-500 text-red-800 p-2 mb-2">{error}</div>}
      <form
        onSubmit={formik.handleSubmit}
        className=" flex flex-col w-full  gap-5 justify-center items-center p-3"
      >
        <div className=" flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <div className="background-logo"></div>
            <h2>Crear Cuenta</h2>
            <p>Ingresa tus datos para ingresar</p>
          </div>

          <div className="flex flex-col gap-3 justify-center items-center p-2 w-72">
            {/* Email */}
            <div className="inputLogin">
              <div className="bg-white p-2 rounded-md">
                <HiOutlineMail />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                placeholder="Digita tu email"
                value={formik.values.email}
              />
            </div>

            {/* Name */}
            <div className="inputLogin">
              <div className="bg-white p-2 rounded-md">
                <AiOutlineUser />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Digita tu nombre"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </div>

            {/* Password */}
            <div className="inputLogin">
              <div className="bg-white p-2 rounded-md">
                <AiOutlineLock />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Digita una contraseña"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </div>

            {/* Confirm Password */}
            {/* <div className="inputLogin">
              <div className="bg-white p-2 rounded-md">
                <AiOutlineLock />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Confirma tu contraseña"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </div> */}
            <button type="submit">Crear</button>
          </div>
          <p className="font-semibold">
            ¿Ya tienes una cuenta?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-blue-600 underline cursor-pointer"
            >
              Accede Aquí
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
