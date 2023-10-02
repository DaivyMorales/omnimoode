import { ChangeEvent, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineReload } from "react-icons/ai";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useAppDispach } from "@/redux/hooks";
import { setEmail } from "@/redux/features/EmailRecoveryPasswordSlice";

export default function Recovery() {
  const router = useRouter();

  const dispach = useAppDispach();

  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      const response = await axios.post("/api/change_password_email", {
        email: values.email,
        subject: "Actualiza tu contraseña",
      });

      dispach(setEmail(values.email));

      console.log(response);
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
            <h1>Recupera tu Contraseña</h1>

            <p className="text-center">
              No te preocupes!, enviaremos un mensaje a tu correo para que{" "}
              <br></br>cambies tu contraseña.
            </p>
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
                onChange={handleInputChange}
                placeholder="Digita tu correo"
                value={formik.values.email}
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
                <>Enviar</>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
