import React, { useState } from "react";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import Image from "next/image";

export default function Register() {
  const [error, setError] = useState("");
  console.log(error);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const query = await axios.post("/api/auth/signup", values);
        console.log(query);
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data.message);
        }
      }
      // resetForm();
    },
  });

  return (
    <div className=" h-screen grid grid-cols-2">
      <div className="background"></div>
      {error && <div className="bg-red-500 text-red-800 p-2 mb-2">{error}</div>}
      <form
        onSubmit={formik.handleSubmit}
        className=" flex flex-col gap-5 justify-center items-center p-3"
      >
        <div className=" flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <div className="background-logo"></div>
            <h1>Crear Cuenta</h1>
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
            <div className="inputLogin">
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
            </div>
            <button type="submit">Ingresar</button>
          </div>
        </div>
      </form>
    </div>
  );
}
