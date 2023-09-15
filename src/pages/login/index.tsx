import { useState } from "react";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import Image from "next/image";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineLock } from "react-icons/ai";

export default function LoginPage() {
  const router = useRouter();

  const [error, setError] = useState("");
  console.log(error);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, { resetForm }) => {
      console.log(values);

      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (response?.error) setError(response.error as string);

      if (response?.ok) return router.push("/");

      resetForm();
    },
  });

  return (
    <div className=" h-screen grid grid-cols-1 sm:grid-cols-2">
      {/* <div className="background_login"></div> */}
      <Image
        src="/images/photo3.jpg"
        width={500}
        height={500}
        alt="Juan"
        priority
      />
      {error && <div className="bg-red-500 text-red-800 p-2 mb-2">{error}</div>}
      <form
        onSubmit={formik.handleSubmit}
        className=" flex flex-col gap-5 justify-center items-center p-3"
      >
        <div className=" flex flex-col justify-center items-center gap-2">
          <div className="flex flex-col justify-center items-center">
            <div className="background-logo"></div>
            <h2>Ingresa a tu cuenta</h2>
            <p>Digita tus datos para ingresar</p>
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

            {/* Password */}
            <div className="inputLogin">
              <div className="bg-white p-2 rounded-md">
                <AiOutlineLock />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Digita tu contraseña"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </div>

            <button type="submit">Ingresar</button>
          </div>
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
      </form>
    </div>
  );
}
