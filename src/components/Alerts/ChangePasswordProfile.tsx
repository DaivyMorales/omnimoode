import { useOpen } from "@/store/OpenStore";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSession } from "next-auth/react";
import ErrorAlert from "./ErrorAlert";

function ChangePasswordProfile() {
  const { setOpenChangePassword } = useOpen();
  const [error, setError] = useState("");

  const { data: session } = useSession();

  const formik = useFormik({
    initialValues: {
      lastPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      lastPassword: Yup.string().required("Debes digitar tu ultima contraseña"),
      newPassword: Yup.string()
        .min(6, "Tu contraseña debe de ser minimo de 6 caracteres")
        .required("Debes digitar una contraseña"),
      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref("newPassword")],
          "Las contraseñas deben ser igual, corrigela!"
        )
        .required("Debes de nuevo digitar tu contraseña"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post("/api/change_password", {
          email: session?.user?.email,
          newPassword: values.newPassword,
        });
      } catch (error: any) {
        setError(error.response.data.error);
      }

      console.log(values);
    },
  });

  return (
    <div className="delete-alert">
      <div className="bg-white p-7 rounded-lg border-1 min-w-[350px]">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <h3 className="font-bold text-xl ">Cambiar Contraseña</h3>
          <div className="flex flex-col justify-start items-start gap-1">
            {error && (
              <ErrorAlert
                title="Hay un error para cambiar tu contraseña"
                description={error}
              />
            )}
            <label htmlFor="">Contraseña antigua</label>
            <div className="inputLogin">
              <input
                id="lastPassword"
                name="lastPassword"
                type="password"
                className="text-xs"
                onChange={(e) => {
                  formik.setFieldValue("lastPassword", e.target.value);
                  setError("");
                }}
              />
            </div>
            {formik.touched.lastPassword && formik.errors.lastPassword ? (
              <p className="form-errors">{formik.errors.lastPassword}</p>
            ) : null}
          </div>
          <div className="flex flex-col justify-start items-start gap-1">
            <label htmlFor="">Contraseña Nueva</label>
            <div className="inputLogin">
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                className="text-xs"
                onChange={(e) => {
                  formik.setFieldValue("newPassword", e.target.value);
                  setError("");
                }}
              />
            </div>
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <p className="form-errors">{formik.errors.newPassword}</p>
            ) : null}
          </div>
          <div className="flex flex-col justify-start items-start gap-1">
            <label htmlFor="">Confirmar Contraseña</label>
            <div className="inputLogin">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="text-xs"
                onChange={(e) => {
                  formik.setFieldValue("confirmPassword", e.target.value);
                  setError("");
                }}
              />
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <p className="form-errors">{formik.errors.confirmPassword}</p>
            ) : null}
          </div>

          <div className="w-full flex justify-end items-center gap-3  ">
            <button
              onClick={() => setOpenChangePassword(false)}
              className="bg-neutral-200 text-black text-xs font-bold rounded-[6px]  px-3 py-2 flex justify-center"
            >
              Cancelar
            </button>
            <button
              className={`${
                error ? "bg-red-500 text-black" : "bg-black text-white"
              } text-xs font-bold rounded-[6px] min-w-[130px] px-3 py-2 flex justify-center `}
              type="submit"
            >
              {error ? "Intenta de nuevo" : "Cambiar Contraseña"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordProfile;
