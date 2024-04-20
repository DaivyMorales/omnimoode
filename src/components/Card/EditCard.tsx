import React, { useRef, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSession } from "next-auth/react";
import axios from "axios";
import { HiGift, HiSearch } from "react-icons/hi";
import { useOpen } from "@/store/OpenStore";

function EditCard() {
  const { data: session } = useSession();

  const userId = (session?.user as { id?: number })?.id?.toString() ?? 0;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const { setOpenEditCard, dataEditCard, card, setCard } = useOpen();

  const formik = useFormik({
    initialValues: {
      card_number: dataEditCard.card_number,
      due_date: dataEditCard.due_date,
      security_code: dataEditCard.security_code,
      names: dataEditCard.names,
      surnames: dataEditCard.surnames,
      number_identification: dataEditCard.number_identification,
      userId: dataEditCard.userId,
    },
    validationSchema: Yup.object({
      card_number: Yup.string()
        .max(19, "Haz sobrepasado el limite de caracteres")
        .required("Haz olvidado escribir tu número de tarjeta"),
      due_date: Yup.string()
        .max(5)
        .required("Haz olvidado escribir la fecha de vencimiento!"),
      security_code: Yup.number()
        .test("len", "Deben ser 3 digitos", (val) => {
          if (val) {
            return val.toString().length === 3;
          }
          return false;
        })
        .required("Haz olvidado escribir el código de seguridad!"),
      names: Yup.string()
        .max(50, "No puedes sobrepasar los 50 caracteres!")
        .required("Haz olvidado escribir el nombre"),
      surnames: Yup.string()
        .max(50, "No puedes sobrepasar los 50 caracteres!")
        .required("Haz olvidado escribir los apellidos"),
      number_identification: Yup.number()
        .test("len", "Deben ser maximo 10 digitos", (val) => {
          if (val) {
            return val.toString().length <= 10;
          }
          return false;
        })
        .required("Haz olvidado escribir tu número de cedula!"),
    }),
    onSubmit: async (values) => {
      if (userId) {
        try {
          const response = await axios.put(
            `/api/card/null/${dataEditCard.id}`,
            {
              ...values,
              userId: parseInt(userId),
            }
          );

          if (response.status === 200) {
            setCard(
              card.map((crd) => {
                if (crd.id === dataEditCard.id) {
                  return {
                    ...crd,
                    ...values,
                    userId: parseInt(userId),
                  };
                } else {
                  return crd;
                }
              })
            );
            setOpenEditCard(false);
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
  });

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = rawValue
      .replace(/\D/g, "")
      .slice(0, 4)
      .replace(/(\d{2})(\d{0,2})/, "$1/$2");

    formik.handleChange(e);
    formik.setFieldValue("due_date", formattedValue);
  };

  const handleSecurityCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = rawValue.replace(/\D/g, "").slice(0, 3);

    formik.handleChange(e);
    formik.setFieldValue("security_code", parseInt(formattedValue));
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = rawValue
      .replace(/\s/g, "")
      .match(/.{1,4}/g)
      ?.join(" ");

    formik.handleChange(e);
    formik.setFieldValue("card_number", formattedValue || "");
  };

  const handleNamesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const lettersOnly = rawValue.replace(/[^A-Za-z]/g, "");

    formik.handleChange(e);
    formik.setFieldValue("names", lettersOnly);
  };

  const handleSurnamesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const lettersOnly = rawValue.replace(/[^A-Za-z]/g, "");

    formik.handleChange(e);
    formik.setFieldValue("surnames", lettersOnly);
  };

  return (
    <div className="flex w-full flex-col gap-5 justify-start items-center bg-white border-1 rounded-lg sm:flex">
      <form
        onSubmit={formik.handleSubmit}
        className="flex w-full flex-col items-center justify-center"
      >
        <div className="flex  flex-col col-span-1 justify-center items-start gap-3 p-6 w-full">
          <div className="flex flex-col justify-start items-start gap-3 w-full ">
            {/* CARD_NUMBER */}
            <div className="grid grid-cols-4 w-full">
              <label
                htmlFor="card_number"
                className="flex justify-start items-center"
              >
                Número de tarjeta
              </label>
              <div className="w-full col-span-3">
                <div className="inputLogin w-full">
                  <input
                    className={`text-xs ${
                      formik.touched.card_number &&
                      formik.errors.card_number &&
                      "placeholder-red-300"
                    }`}
                    id="card_number"
                    name="card_number"
                    type="text"
                    onChange={handleCardNumberChange}
                    placeholder="1234 1234 1234 1234"
                    value={formik.values.card_number}
                  />
                </div>
                {/* ERROR CARD_NUMBER */}
                {formik.touched.card_number && formik.errors.card_number ? (
                  <p className="form-errors">{formik.errors.card_number}</p>
                ) : null}
              </div>
            </div>

            {/* DUE_DATE */}
            <div className="grid grid-cols-4 w-full">
              <label
                htmlFor="due_date"
                className="flex justify-start items-center"
              >
                Fecha de vencimiento
              </label>
              <div className="w-full col-span-3">
                <div className="inputLogin w-full">
                  <input
                    className={`text-xs ${
                      formik.touched.due_date &&
                      formik.errors.due_date &&
                      "placeholder-red-300"
                    }`}
                    id="due_date"
                    name="due_date"
                    type="text"
                    onChange={handleDueDateChange}
                    placeholder="12/12"
                    value={formik.values.due_date}
                  />
                </div>
                {/* ERROR DUE_DATE */}
                {formik.touched.due_date && formik.errors.due_date ? (
                  <p className="form-errors">{formik.errors.due_date}</p>
                ) : null}
              </div>
            </div>
          </div>

          {/* SECURITY_CODE */}
          <div className="w-full grid grid-cols-4">
            <label htmlFor="" className="flex justify-start items-center">
              Código de seguridad
            </label>
            <div className="col-span-3">
              <div className="inputLogin w-full">
                <input
                  className={`text-xs ${
                    formik.touched.security_code &&
                    formik.errors.security_code &&
                    "placeholder-red-300"
                  }`}
                  id="security_code"
                  name="security_code"
                  type="text"
                  maxLength={3}
                  inputMode="numeric"
                  onChange={handleSecurityCodeChange}
                  placeholder="123"
                  value={formik.values.security_code || ""}
                />
              </div>
              {/* ERROR SECURITY_CODE */}
              {formik.touched.security_code && formik.errors.security_code ? (
                <p className="form-errors">{formik.errors.security_code}</p>
              ) : null}
            </div>
          </div>

          {/* NAMES */}
          <div className="grid grid-cols-4 w-full">
            <label
              htmlFor="inputLogin"
              className="flex justify-start items-center"
            >
              Nombres del titular
            </label>
            <div className="w-full col-span-3">
              <div className="inputLogin w-full">
                <input
                  className={`text-xs text-xs ${
                    formik.touched.names &&
                    formik.errors.names &&
                    "placeholder-red-300"
                  }`}
                  id="names"
                  name="names"
                  type="text"
                  onChange={handleNamesChange}
                  placeholder="John"
                  value={formik.values.names}
                />
              </div>
              {/* ERROR NAMES */}
              {formik.touched.names && formik.errors.names ? (
                <p className="form-errors">{formik.errors.names}</p>
              ) : null}
            </div>
          </div>

          {/* SURNAMES */}
          <div className="grid grid-cols-4 w-full">
            <label htmlFor="city" className="flex justify-start items-center">
              Apellidos del titular
            </label>
            <div className="w-full col-span-3">
              <div className="inputLogin w-full">
                <input
                  className={`text-xs ${
                    formik.touched.surnames &&
                    formik.errors.surnames &&
                    "placeholder-red-300"
                  }`}
                  id="surnames"
                  name="surnames"
                  type="text"
                  onChange={handleSurnamesChange}
                  placeholder="Doe"
                  value={formik.values.surnames}
                />
              </div>
              {/* ERROR SURNAMES */}
              {formik.touched.surnames && formik.errors.surnames ? (
                <p className="form-errors">{formik.errors.surnames}</p>
              ) : null}
            </div>
          </div>

          {/* NUMBER_IDENTIFICATION */}
          <div className="w-full grid grid-cols-4">
            <label
              htmlFor="neighborhood"
              className="flex justify-start items-center"
            >
              Cedula
            </label>
            <div className="w-full col-span-3">
              <div className="inputLogin w-full" onClick={handleClick}>
                <input
                  className={`text-xs ${
                    formik.touched.number_identification &&
                    formik.errors.number_identification &&
                    "placeholder-red-300"
                  }`}
                  id="number_identification"
                  name="number_identification"
                  type="number"
                  onChange={formik.handleChange}
                  placeholder="123456789"
                  value={formik.values.number_identification || ""}
                />
              </div>
              {/* ERROR NUMBER_IDENTIFICATION */}
              {formik.touched.number_identification &&
              formik.errors.number_identification ? (
                <p className="form-errors">
                  {formik.errors.number_identification}
                </p>
              ) : null}
            </div>
          </div>
        </div>
        <div className="w-full flex gap-3 justify-end bg-neutral-200 py-4 px-4">
          <button
            type="button"
            onClick={() => setOpenEditCard(false)}
            className="bg-neutral-50 text-black text-xs font-bold rounded-[6px]  px-3 py-2 flex justify-center"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-black text-white text-xs font-bold rounded-[6px] min-w-[130px] px-3 py-2 flex justify-center"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCard;
