import { ChangeEvent, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineReload } from "react-icons/ai";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useAppSelector } from "@/redux/store";

export default function ChangePassword() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const email = useAppSelector((state) => state.EmailRecoveryPassword.email);

  console.log(email);

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    onSubmit: async (values) => {
      const response = await axios.post("/api/change_password", {
        email,
        newPassword: values.newPassword,
      });

      console.log(response);
      if (response.status === 200) return router.push("/login");
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");

    formik.handleChange(e);
  };

  return (
    <div className=" h-screen flex justify-center items-center">
      <form
        onSubmit={formik.handleSubmit}
        className=" flex flex-col gap-5 justify-center items-center p-3"
      >
        <div className=" flex flex-col justify-center items-center gap-2">
          <div className="flex flex-col justify-center items-center">
            <h1>Cambia tu Contraseña</h1>

            <p className="text-center">
              Llego tiempo de crear una nueva contraseña, crea una muy diferente{" "}
              <br></br>a la ultima, por tu seguridad.
            </p>
          </div>

          <div className="flex flex-col gap-3 justify-center items-center p-2 w-72">
            {/* New Password */}
            <div className="inputLogin">
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                onChange={handleInputChange}
                placeholder="Digita tu nueva contraseña"
                value={formik.values.newPassword}
              />
            </div>

            {/* Confirm new password */}
            <div className="inputLogin">
              <input
                id="confirmNewPassword"
                name="confirmNewPassword"
                type="password"
                onChange={handleInputChange}
                placeholder="Confirma tu nueva contraseña"
                value={formik.values.confirmNewPassword}
              />
            </div>

            {error && <p className="form-errors">{error}</p>}

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
                <>Renovar</>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
