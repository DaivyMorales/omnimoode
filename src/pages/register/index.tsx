import React, { useState } from "react";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import { AiOutlineUser, AiOutlineLock, AiOutlineReload } from "react-icons/ai";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { BiSolidErrorCircle } from "react-icons/bi";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { HiOutlineMail } from "react-icons/hi";

export default function Register() {
  const [error, setError] = useState("");
  console.log(error);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const inputError = "border-1 border-red-200";

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, "No puedes sobrepasar los 50 caracteres!")
        .required("Haz olvidado escribir tu nombre"),
      email: Yup.string()
        .email("Puede que te haga falta un '@' o un '.com'")
        .required("Has olvidado escribir tu email"),
      password: Yup.string()
        .min(6, "Tu contraseña debe de ser minimo de 6 caracteres")
        .required("Debes digitar una contraseña"),
      confirm_password: Yup.string()
        .oneOf(
          [Yup.ref("password")],
          "Las contraseñas deben ser igual, corrigela!"
        )
        .required("Debes de nuevo digitar tu contraseña"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true);
        const query = await axios.post("/api/auth/signup", {
          name: values.name,
          email: values.email,
          password: values.password,
        });

        const res = await signIn("credentials", {
          email: query.data.email,
          password: values.password,
          redirect: false,
        });

        console.log("res", res);

        if (res?.ok) return router.push("/register/confirm");
        setIsLoading(false);
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
            <div className="flex flex-col w-full justify-center items-center">
              <div
                className={`inputLogin ${
                  formik.touched.email && formik.errors.email ? inputError : ""
                } `}
              >
                <div className="bg-white p-2 rounded-md">
                  {formik.touched.email && formik.errors.email ? (
                    <BiSolidErrorCircle size={15} color="red" />
                  ) : (
                    <HiOutlineMail />
                  )}
                </div>
                <input
                  className={`${
                    formik.touched.email && formik.errors.email
                      ? "placeholder-red-500"
                      : ""
                  }`}
                  id="email"
                  name="email"
                  type="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  placeholder="Digita tu email"
                />
              </div>
              {/* ERROR EMAIL */}
              {formik.touched.email && formik.errors.email ? (
                <p className="form-errors">{formik.errors.email}</p>
              ) : null}
            </div>

            {/* Name */}
            <div className="flex flex-col w-full justify-center items-center">
              <div
                className={`inputLogin ${
                  formik.touched.name && formik.errors.name ? inputError : ""
                } `}
              >
                <div className="bg-white p-2 rounded-md">
                  {formik.touched.name && formik.errors.name ? (
                    <BiSolidErrorCircle size={15} color="red" />
                  ) : (
                    <AiOutlineUser />
                  )}
                </div>
                <input
                  className={`${
                    formik.touched.name && formik.errors.name
                      ? "placeholder-red-500"
                      : ""
                  }`}
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  placeholder="Digita tu nombre"
                />
              </div>
              {/* ERROR NAME */}
              {formik.touched.name && formik.errors.name ? (
                <p className="form-errors">{formik.errors.name}</p>
              ) : null}
            </div>

            {/* Password */}
            <div className="flex flex-col w-full justify-center items-center">
              <div
                className={`inputLogin ${
                  formik.touched.password && formik.errors.password
                    ? inputError
                    : ""
                } `}
              >
                <div className="bg-white p-2 rounded-md">
                  {formik.touched.password && formik.errors.password ? (
                    <BiSolidErrorCircle size={15} color="red" />
                  ) : (
                    <AiOutlineLock />
                  )}
                </div>
                <input
                  className={`${
                    formik.touched.password && formik.errors.password
                      ? "placeholder-red-500"
                      : ""
                  }`}
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  placeholder="Digita una contraseña"
                />
              </div>
              {/* ERROR PASSWORD */}
              {formik.touched.password && formik.errors.password ? (
                <p className="form-errors">{formik.errors.password}</p>
              ) : null}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col w-full justify-center items-center">
              <div
                className={`inputLogin ${
                  formik.touched.confirm_password &&
                  formik.errors.confirm_password
                    ? inputError
                    : ""
                } `}
              >
                <div className="bg-white p-2 rounded-md">
                  {formik.touched.confirm_password &&
                  formik.errors.confirm_password ? (
                    <BiSolidErrorCircle size={15} color="red" />
                  ) : (
                    <AiOutlineLock />
                  )}
                </div>
                <input
                  className={`${
                    formik.touched.confirm_password &&
                    formik.errors.confirm_password
                      ? "placeholder-red-500"
                      : ""
                  }`}
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirm_password}
                  placeholder="Confirma tu contraseña"
                />
              </div>
              {/* ERROR CONFIRM PASSWORD */}
              {formik.touched.confirm_password &&
              formik.errors.confirm_password ? (
                <p className="form-errors">{formik.errors.confirm_password}</p>
              ) : null}
            </div>

            <button
              type="submit"
              className={`text-white w-full py-3 h-12 rounded-lg text-sm ${
                (formik.touched.name && formik.errors.name) ||
                (formik.touched.email && formik.errors.email) ||
                (formik.errors.password && formik.errors.password) ||
                (formik.touched.confirm_password &&
                  formik.errors.confirm_password)
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-black"
              }`}
            >
              {isLoading ? (
                <motion.div
                  style={{
                    display: "inline-block",
                  }}
                  animate={{ rotate: "360deg" }}
                  transition={{
                    duration: 0.7,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                >
                  <AiOutlineReload size={22} />
                </motion.div>
              ) : (
                <>Crear</>
              )}
            </button>
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
