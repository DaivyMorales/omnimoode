import { ChangeEvent, useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { AiOutlineReload } from "react-icons/ai";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useAppSelector } from "@/redux/hooks";
import { useAppDispach } from "@/redux/hooks";
import { generateNumber } from "@/redux/features/NumberValidationSlice";

export default function ConfirmPage() {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const dispach = useAppDispach();

  const number = useAppSelector(
    (state) => state.NumberValidation.numberValidation
  );

  console.log("number", number);
  console.log(session);

  const SendEmail = async () => {
    try {
      const respose = await axios.post(`/api/send`, {
        subject: "Verificacion de Email",
        email: session?.user?.email,
        name: session?.user?.name,
        text: "Haz dado click a el boton para confirmar tu email",
        verificationCode: number,
      });
      console.log(respose.status);
    } catch (error) {
      console.log("Error al enviar email", error);
    }
  };

  useEffect(() => {
    dispach(generateNumber());
  }, []);

  const userId = (session?.user as { id?: number })?.id?.toString() ?? "0";

  const formik = useFormik({
    initialValues: {
      number_one: "",
      number_two: "",
      number_three: "",
      number_four: "",
      number_five: "",
      number_six: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);

      const formNumber = Object.values(values).reduce(
        (acc, val) => acc * 10 + parseInt(val || "0"),
        0
      );

      if (formNumber === number) {
        const response = await axios.put(`/api/user/${userId}`, {
          email_verification: true,
        });
        console.log(response);
        router.push("/");
      } else {
        setError("El código que digitaste es incorrecto, verifica!");
      }

      setIsLoading(false);
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
            {isCorrect && (
              <div className=" text-center">
                <p>Digita los 6 numeros que te hemos enviado a tu correo!</p>
              </div>
            )}
          </div>

          {isCorrect ? (
            <div className="flex flex-col gap-3 justify-center items-center p-2 w-72">
              <div className="flex gap-3">
                {/* ONE */}

                <input
                  id="number_one"
                  name="number_one"
                  type="number"
                  onChange={handleInputChange}
                  className={`inputNumber ${
                    formik.values.number_one !== "" && "border-gray-700"
                  } ${error && "border-red-500 text-red-500"}`}
                  value={formik.values.number_one}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const inputValue = e.target.value;
                    if (inputValue.length > 1) {
                      e.target.value = inputValue.slice(0, 1);
                    }
                    handleInputChange(e);
                  }}
                />

                {/* TWO */}

                <input
                  id="number_two"
                  name="number_two"
                  type="number"
                  onChange={handleInputChange}
                  className={`inputNumber ${
                    formik.values.number_two !== "" && "border-gray-700"
                  } ${error && "border-red-500 text-red-500"}`}
                  value={formik.values.number_two}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const inputValue = e.target.value;
                    if (inputValue.length > 1) {
                      e.target.value = inputValue.slice(0, 1);
                    }
                    handleInputChange(e);
                  }}
                />
                {/* THREE */}

                <input
                  id="number_three"
                  name="number_three"
                  type="number"
                  onChange={handleInputChange}
                  className={`inputNumber ${
                    formik.values.number_three !== "" && "border-gray-700"
                  } ${error && "border-red-500 text-red-500"}`}
                  value={formik.values.number_three}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const inputValue = e.target.value;
                    if (inputValue.length > 1) {
                      e.target.value = inputValue.slice(0, 1);
                    }
                    handleInputChange(e);
                  }}
                />
                {/* FOUR */}

                <input
                  id="number_four"
                  name="number_four"
                  type="number"
                  onChange={handleInputChange}
                  className={`inputNumber ${
                    formik.values.number_four !== "" && "border-gray-700"
                  } ${error && "border-red-500 text-red-500"}`}
                  value={formik.values.number_four}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const inputValue = e.target.value;
                    if (inputValue.length > 1) {
                      e.target.value = inputValue.slice(0, 1);
                    }
                    handleInputChange(e);
                  }}
                />

                {/* FIVE */}
                <input
                  id="number_five"
                  name="number_five"
                  type="number"
                  className={`inputNumber ${
                    formik.values.number_five !== "" && "border-gray-700"
                  } ${error && "border-red-500 text-red-500"}`}
                  onChange={handleInputChange}
                  value={formik.values.number_five}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const inputValue = e.target.value;
                    if (inputValue.length > 1) {
                      e.target.value = inputValue.slice(0, 1);
                    }
                    handleInputChange(e);
                  }}
                />

                {/* SIX */}
                <input
                  id="number_six"
                  name="number_six"
                  type="number"
                  className={`inputNumber ${
                    formik.values.number_six !== "" && "border-gray-700"
                  } ${error && "border-red-500 text-red-500"}`}
                  onChange={handleInputChange}
                  value={formik.values.number_six}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const inputValue = e.target.value;
                    if (inputValue.length > 1) {
                      e.target.value = inputValue.slice(0, 1);
                    }
                    handleInputChange(e);
                  }}
                />
              </div>

              <p className="form-errors text-center">{error && error}</p>

              <button
                type="submit"
                className={`text-white w-full py-3 h-12 rounded-lg text-sm ${
                  isLoading || error
                    ? "bg-black cursor-not-allowed"
                    : "bg-black"
                } ${
                  error ||
                  (formik.values.number_six === "" &&
                    "bg-gray-300 cursor-not-allowed")
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
                  <>Verificarme</>
                )}
              </button>
            </div>
          ) : (
            <div className=" text-center flex flex-col gap-3  justify-center items-center">
              <p>
                Enviaremos un codigo de confirmación a el siguiente correo{" "}
                <span className="font-semibold border-1 px-2 rounded-md border-gray-300">
                  {session?.user?.email}
                </span>
              </p>
              <button
                className="bg-black px-6 py-3 h-12 rounded-lg text-sm text-white p-2 "
                onClick={() => {
                  setIsCorrect(true);
                  SendEmail();
                }}
              >
                Ese es mi email
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
