import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { TiPencil } from "react-icons/ti";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorAlert from "../Alerts/ErrorAlert";
import axios from "axios";
import SuccessPayment from "@/pages/checkout/SuccessPayment";
import SuccessfulAlert from "../Alerts/SuccessfulAlert";
import { useOpen } from "@/store/OpenStore";

function SecuritySection() {
  const { data: session, update } = useSession();
  const [openEmailForm, setOpenEmailForm] = useState(false);
  const [user, setUser] = useState<any>({} as any);
  const [isEmailUpdated, setIsEmailUpdated] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (session && session.user) {
      setUser(session.user as any);
    }
  }, [session]);

  const { openChangePassword, setOpenChangePassword } = useOpen();

  const userId = (session?.user as { id?: number })?.id ?? 0;

  const formik = useFormik({
    initialValues: {
      email: session?.user?.email,
      emailVerificated: session?.user?.email,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Puede que te haga falta un '@' o un '.com'")
        .required("Has olvidado escribir tu email"),

      emailVerificated: Yup.string()
        .email("Puede que te haga falta un '@' o un '.com'")
        .oneOf([Yup.ref("email")], "Los correos deben ser iguales, corrigelos!")
        .required("Debes de nuevo digitar el correo"),
    }),
    onSubmit: async (values) => {
      const body = {
        newEmail: values.emailVerificated,
      };

      try {
        const response = await axios.put(`/api/update_email/${userId}`, body);

        if (response.status === 200) {
          setIsEmailUpdated(true);
          await update({ ...user, email: body.newEmail });
          setOpenEmailForm(false);
        }
      } catch (error: any) {
        setError(error.response.data);
      }
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-start items-start gap-2">
        <h3 className="font-bold text-xl">Contacto</h3>
        <p className="text-neutral-400">
          Donde nosotros enviamos mensajes importantes sobre tu cuenta
        </p>
      </div>
      <div className="flex flex-col gap-5 justify-start items-center bg-white border-1 w-full py-5 rounded-lg sm:flex">
        {session?.user?.email && (
          <div className="grid grid-cols-4 gap-4 w-full py-4 px-10">
            <label htmlFor="" className="flex justify-start items-center">
              Email
            </label>
            <div className="col-span-3 w-full flex flex-col items-start justify-start gap-1">
              {!openEmailForm ? (
                <>
                  <div className="w-full flex justify-between items-center">
                    <h3>{session.user.email}</h3>
                    <div
                      onClick={() => setOpenEmailForm(true)}
                      className="cursor-pointer p-1 rounded-lg hover:bg-neutral-100"
                    >
                      <TiPencil />
                    </div>
                  </div>
                  <p>
                    <span className="font-semibold">Verificado.</span> Gracias
                    por verificar tu email.
                  </p>
                  <p>Este email esta conectado a tu cuenta. </p>
                </>
              ) : (
                session?.user?.name && (
                  <form
                    onSubmit={formik.handleSubmit}
                    className="flex flex-col w-full justify-start items-start gap-2"
                  >
                    {error && (
                      <ErrorAlert
                        title="Ha sucedido un error al actualizar tu email"
                        description={error}
                      />
                    )}

                    <div className="inputLogin col-span-3">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="text-xs"
                        onChange={(e) => {
                          formik.setFieldValue("email", e.target.value);
                          setError("");
                        }}
                        value={formik.values.email || ""}
                      />
                    </div>
                    {formik.touched.email && formik.errors.email ? (
                      <p className="form-errors">{formik.errors.email}</p>
                    ) : null}
                    <label
                      htmlFor=""
                      className=" flex  justify-start items-center"
                    >
                      Por favor confirma el nuevo correo electronico
                    </label>

                    <div className="inputLogin col-span-3">
                      <input
                        id="emailVerificated"
                        name="emailVerificated"
                        type="email"
                        className="text-xs"
                        onChange={(e) => {
                          formik.setFieldValue(
                            "emailVerificated",
                            e.target.value
                          );
                          setError("");
                        }}
                        value={formik.values.emailVerificated || ""}
                      />
                    </div>
                    {formik.touched.emailVerificated &&
                    formik.errors.emailVerificated ? (
                      <p className="form-errors">
                        {formik.errors.emailVerificated}
                      </p>
                    ) : null}
                    <p>
                      <span className="font-semibold">Verificado.</span> Gracias
                      por verificar tu email.
                    </p>
                    <p>Este email esta conectado a tu cuenta. </p>
                    <div className="w-full flex justify-start items-start gap-3">
                      <button
                        type="submit"
                        className={`${
                          error
                            ? "bg-red-500 text-black"
                            : "bg-black text-white"
                        } text-xs font-bold rounded-[6px]  px-3 py-2 flex justify-center`}
                      >
                        {error ? "Intenta de nuevo" : "Guardar"}
                      </button>
                      <button
                        onClick={() => setOpenEmailForm(false)}
                        className="bg-neutral-200 text-black text-xs font-bold rounded-[6px]  px-3 py-2 flex justify-center"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                )
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-start items-start gap-2">
        <h3 className="font-bold text-xl">Seguridad</h3>
        <p className="text-neutral-400">
          Manten tu cuenta segura de cualquier robo
        </p>
      </div>
      <div className="flex w-full flex-col gap-5 justify-start items-center bg-white border-1 w-full py-5 rounded-lg sm:flex">
        <div className="grid grid-cols-4 gap-4 w-full py-4 px-10">
          <label htmlFor="" className="flex justify-start items-center">
            Contraseña
          </label>
          <div className="col-span-3 ">
            <p>
              <span
                onClick={() => setOpenChangePassword(true)}
                className="underline font-bold cursor-pointer"
              >
                Cambiar contraseña.
              </span>{" "}
              Mejora tu seguridad con una contraseña segura
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecuritySection;
