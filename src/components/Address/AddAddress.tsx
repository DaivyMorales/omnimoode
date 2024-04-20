import React, { useRef, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSession } from "next-auth/react";
import axios from "axios";
import { HiGift, HiSearch } from "react-icons/hi";
import { useOpen } from "@/store/OpenStore";

interface ILocation {
  id: number;
  departamento: string;
  ciudades: String[];
}

function AddAddress() {
  const { data: session } = useSession();

  const [info, setInfo] = useState<ILocation[]>([]);
  const [ciudades, setCiudades] = useState<string[]>([]);
  const [idDeparmentSelected, setIdDeparmentSelected] = useState<number>();
  console.log(idDeparmentSelected);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const { setOpenEditAddress, setOpenAddAddress, setAddress, address } =
    useOpen();

  const formik = useFormik({
    initialValues: {
      names: "",
      surnames: "",
      address: "",
      specifications: "",
      neighborhood: "",
      state: "",
      city: "",
      phone: "",
      userId: 0,
    },
    validationSchema: Yup.object({
      names: Yup.string()
        .max(50, "No puedes sobrepasar los 50 caracteres!")
        .required("Haz olvidado escribir el nombre"),
      surnames: Yup.string()
        .max(50, "No puedes sobrepasar los 50 caracteres!")
        .required("Haz olvidado escribir los apellidos"),
      address: Yup.string().required("Haz olvidado escribir la dirección"),
      specifications: Yup.string().required(
        "Haz olvidado escribir alguna especificación"
      ),
      neighborhood: Yup.string()
        .max(30, "No puedes sobrepasar los 30 caracteres!")
        .required("Haz olvidado escribir el vecinadario"),
      state: Yup.string().required("Haz olvidado elegir el departamento"),
      city: Yup.string().required("Haz olvidado elegir el municipio/capital"),
      phone: Yup.string()
        .required("Haz olvidado escribir tu telefono")
        .max(10, "No puedes sobrepasar los 10 caracteres!"),
    }),
    onSubmit: async (values) => {
      const userId = (session?.user as { id?: number })?.id?.toString() ?? "0";

      try {
        const formData = {
          ...values,
          stateNumber: idDeparmentSelected,
          userId: parseInt(userId),
        };
        const response = await axios.post("/api/address", formData);
        if (response.status === 200) {
          setOpenAddAddress(false);
          setAddress([
            ...address,
            {
              ...values,
              stateNumber: idDeparmentSelected,
              userId: parseInt(userId),
            },
          ]);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const getCountryInfo = async () => {
    const response = await axios.get(
      "https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json"
    );

    setInfo(response.data);
  };

  useEffect(() => {
    getCountryInfo();
  }, []);

  useEffect(() => {
    if (idDeparmentSelected !== null) {
      const departamentoSeleccionado = info.find(
        (location) => location.id === idDeparmentSelected
      );
      if (departamentoSeleccionado) {
        setCiudades(departamentoSeleccionado.ciudades.map(String) || []);
      }
    }
  }, [idDeparmentSelected, info]);

  return (
    <div className="flex w-full flex-col gap-5 justify-start items-center bg-white border-1 rounded-lg sm:flex">
      <form
        onSubmit={formik.handleSubmit}
        className="flex w-full flex-col items-center justify-center"
      >
        <div className="flex  flex-col col-span-1 justify-center items-start gap-3 p-6 w-full">
          <div className="flex flex-col justify-start items-start gap-3 w-full ">
            {/* NAMES */}
            <div className="grid grid-cols-4 w-full">
              <label
                htmlFor="names"
                className="flex justify-start items-center"
              >
                Nombres
              </label>
              <div className="w-full col-span-3">
                <div className="inputLogin w-full">
                  <input
                    className={`text-xs ${
                      formik.touched.names &&
                      formik.errors.names &&
                      "placeholder-red-300"
                    }`}
                    id="names"
                    name="names"
                    type="text"
                    onChange={formik.handleChange}
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

            {/* lASTNAME */}
            <div className="grid grid-cols-4 w-full">
              <label
                htmlFor="surnames"
                className="flex justify-start items-center"
              >
                Apellidos
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
                    onChange={formik.handleChange}
                    placeholder="Doe"
                    value={formik.values.surnames}
                  />
                </div>
                {/* ERROR NAMES */}
                {formik.touched.surnames && formik.errors.surnames ? (
                  <p className="form-errors">{formik.errors.surnames}</p>
                ) : null}
              </div>
            </div>
          </div>

          {/* COUNTRY */}
          <div className="w-full grid grid-cols-4">
            <label htmlFor="" className="flex justify-start items-center">
              País / Región
            </label>
            <div className="inputLogin col-span-3">
              <div className="bg-white p-1 rounded-md">
                <HiSearch color="gray" size={15} />
              </div>
              <select name="" id="" className="w-full text-xs font-medium">
                <option value="Colombia">Colombia</option>
              </select>
            </div>
          </div>

          {/* STATE */}
          <div className="grid grid-cols-4 w-full">
            <label htmlFor="state" className="flex justify-start items-center">
              Departamento
            </label>
            <div className="w-full col-span-3">
              <div className="inputLogin w-full">
                <select
                  name="state"
                  id="state"
                  value={idDeparmentSelected || ""}
                  onChange={(e) => {
                    const selectedId = Number(e.target.value);
                    const selectedDepartamento =
                      info.find((location) => location.id === selectedId)
                        ?.departamento || "";
                    setIdDeparmentSelected(selectedId);
                    formik.setFieldValue("state", selectedDepartamento);
                    formik.setFieldValue("city", "");
                  }}
                  className="text-xs"
                >
                  <option value="" className="text-gray-400" disabled>
                    Seleccione un departamento
                  </option>
                  {info.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.departamento}
                    </option>
                  ))}
                </select>
              </div>
              {/* ERROR STATE */}
              {formik.touched.state && formik.errors.state ? (
                <p className="form-errors">{formik.errors.state}</p>
              ) : null}
            </div>
          </div>

          {/* CITY */}
          <div className="grid grid-cols-4 w-full">
            <label htmlFor="city" className="flex justify-start items-center">
              Ciudad
            </label>
            <div className="w-full col-span-3">
              <div className="inputLogin w-full">
                <select
                  name="city"
                  id="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  className="text-xs"
                >
                  {ciudades.map((ciudad, index) => (
                    <option key={index} value={ciudad}>
                      {ciudad}
                    </option>
                  ))}
                </select>
              </div>
              {/* ERROR STATE */}
              {formik.touched.city && formik.errors.city ? (
                <p className="form-errors">{formik.errors.city}</p>
              ) : null}
            </div>
          </div>

          {/* NEIGHBORHOOD */}
          <div className="w-full grid grid-cols-4">
            <label
              htmlFor="neighborhood"
              className="flex justify-start items-center"
            >
              Barrio
            </label>
            <div className="w-full col-span-3">
              <div className="inputLogin w-full" onClick={handleClick}>
                <input
                  className={`text-xs ${
                    formik.touched.neighborhood &&
                    formik.errors.neighborhood &&
                    "placeholder-red-300"
                  }`}
                  id="neighborhood"
                  name="neighborhood"
                  type="text"
                  onChange={formik.handleChange}
                  placeholder="Mi barrio"
                  value={formik.values.neighborhood}
                  // ref={inputRef}
                />
              </div>
              {/* ERROR NEIGHBORHOOD */}
              {formik.touched.neighborhood && formik.errors.neighborhood ? (
                <p className="form-errors">{formik.errors.neighborhood}</p>
              ) : null}
            </div>
          </div>

          {/* ADRESS */}
          <div className="w-full grid grid-cols-4">
            <label
              htmlFor="address"
              className="flex justify-start items-center"
            >
              Dirección
            </label>
            <div className="w-full col-span-3">
              <div className="inputLogin w-full">
                <input
                  className={`text-xs ${
                    formik.touched.address &&
                    formik.errors.address &&
                    "placeholder-red-300"
                  }`}
                  id="address"
                  name="address"
                  type="text"
                  onChange={formik.handleChange}
                  placeholder="Avn 123 #45"
                  value={formik.values.address}
                />
              </div>
              {/* ERROR ADDRESS */}
              {formik.touched.address && formik.errors.address ? (
                <p className="form-errors">{formik.errors.address}</p>
              ) : null}
            </div>
          </div>

          {/* SPICIFICATIONS */}
          <div className="w-full grid grid-cols-4">
            <label
              htmlFor="specifications"
              className="flex justify-start items-center"
            >
              Especificaciones
            </label>
            <div className="w-full col-span-3">
              <div className="inputLogin w-full">
                <input
                  className={`text-xs ${
                    formik.touched.specifications &&
                    formik.errors.specifications &&
                    "placeholder-red-300"
                  }`}
                  id="specifications"
                  name="specifications"
                  type="text"
                  onChange={formik.handleChange}
                  placeholder="Apartamento 123"
                  value={formik.values.specifications}
                />
              </div>
              {/* ERROR SPICIFICATIONS */}
              {formik.touched.specifications && formik.errors.specifications ? (
                <p className="form-errors">{formik.errors.specifications}</p>
              ) : null}
            </div>
          </div>

          {/* PHONE */}
          <div className="w-full grid grid-cols-4">
            <label htmlFor="phone" className="flex justify-start items-center">
              Telefono
            </label>
            <div className="w-full col-span-3">
              <div className="inputLogin w-full" onClick={handleClick}>
                <input
                  className={`text-xs ${
                    formik.touched.phone &&
                    formik.errors.phone &&
                    "placeholder-red-300"
                  }`}
                  id="phone"
                  name="phone"
                  type="text"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    formik.setFieldValue("phone", e.target.value.toString())
                  }
                  placeholder="123 456 7890"
                  value={formik.values.phone}
                  // ref={inputRef}
                />
              </div>
              {/* ERROR PHONE */}
              {formik.touched.phone && formik.errors.phone ? (
                <p className="form-errors">{formik.errors.phone}</p>
              ) : null}
            </div>
          </div>
        </div>
        <div className="w-full flex gap-3 justify-end bg-neutral-200 py-4 px-4">
          <button
            type="button"
            onClick={() => setOpenAddAddress(false)}
            className="bg-neutral-50 text-black text-xs font-bold rounded-[6px]  px-3 py-2 flex justify-center"
          >
            Cancelar
          </button>
          <button
            type="submit"
            // onClick={() => profileSettings()}
            // className={`${
            //   nameIsUpdated
            //     ? userName && "bg-green-500 text-black hover:bg-green-600"
            //     : "bg-black text-white"
            // } text-xs font-bold rounded-[6px] min-w-[130px] px-3 py-2 flex justify-center`}
            className="bg-black text-white text-xs font-bold rounded-[6px] min-w-[130px] px-3 py-2 flex justify-center"
          >
            {/* {nameIsUpdated ? (
              <TiTick size={17} />
            ) : isLoading ? (
              <div className="animate-spin">
                <CgSpinner size={17} />
              </div>
            ) : isTyping ? (
              "Guardar cambios"
            ) : (
              "Guardar cambios"
            )} */}
            Crear Dirección
            {/*          
          <div className="animate-spin">
                <CgSpinner size={17} />
              </div> */}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddAddress;
