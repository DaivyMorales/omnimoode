import { ChangeEvent, useState } from "react";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineLock, AiOutlineReload } from "react-icons/ai";
import { useSession } from "next-auth/react";

export default function ConfirmPage() {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);

      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      setIsLoading(false);

      if (response?.error) setError(response.error as string);

      if (response?.ok) return router.push("/");
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");

    formik.handleChange(e);
  };

  return (
    <div className=" h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="background_confirm_email hidden lg:block h-full"></div>
      <form
        onSubmit={formik.handleSubmit}
        className=" flex flex-col gap-5 justify-center items-center p-3"
      >
        <div className=" flex flex-col justify-center items-center gap-2">
          <div className="flex flex-col justify-center items-center">
            <div className="background-logo"></div>
            <h2>Confirma tu email</h2>
            <div className=" text-center">
              <p>
                Te hemos enviado el correo de confirmación a{" "}
                <span className="font-semibold border-1 px-2 rounded-md border-gray-300">
                  {session?.user?.email}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 justify-center items-center p-2 w-72">
            <div className="flex gap-3">
              {/* Email */}

              <input
                id="email"
                name="email"
                type="number"
                onChange={handleInputChange}
                className="inputNumber"
                value={formik.values.email}
              />

              {/* Password */}

              <input
                id="password"
                name="password"
                type="number"
                onChange={handleInputChange}
                className="inputNumber"
                value={formik.values.password}
              />
              {/* Password */}

              <input
                id="password"
                name="password"
                type="number"
                onChange={handleInputChange}
                className="inputNumber"
                value={formik.values.password}
              />
              {/* Password */}

              <input
                id="password"
                name="password"
                type="number"
                onChange={handleInputChange}
                className="inputNumber"
                value={formik.values.password}
              />

              {/* Password */}
              <input
                id="password"
                name="password"
                type="number"
                className="inputNumber"
                onChange={handleInputChange}
                value={formik.values.password}
              />
            </div>

            <button
              type="submit"
              className={`text-white w-full py-3 h-12 rounded-lg text-sm ${
                isLoading || error ? "bg-black cursor-not-allowed" : "bg-black"
              } `}
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
                <>Verificarme</>
              )}
            </button>
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
