import { useFormik } from "formik";
import UploadFile from "@/components/UploadFile";
import axios from "axios";
import { useState } from "react";
import { PiTShirtBold, PiPantsBold, PiCoatHangerBold } from "react-icons/pi";

export default function UploadProduct() {
  const [onSelected, setOnSelected] = useState(0);
  const [showDescription, setShowDescription] = useState(false);

  const formik = useFormik({
    initialValues: {
      categoryId: 0,
      imageUrl: null,
      name: "",
      description: "",
      price: 0.0,
      sizes: {
        XS: 0,
        S: 0,
        M: 0,
        L: 0,
        XL: 0,
        XXL: 0,
      },
    },
    onSubmit: async (values) => {
      // if (values.imageUrl) {
      //   const formData = new FormData();
      //   formData.append("imageUrl", values.imageUrl);

      //   const response = await axios.post("/api/upload", formData);
      //   console.log(response);

      // }

      const productForm = {
        name: values.name,
        description: values.description,
        price: values.price,
        categoryId: values.categoryId,
      };

      const response = await axios.post("/api/product", productForm);

      const productId = response.data.id;

      const { sizes } = values;

      for (const sizeName in sizes) {
        if (
          sizes.hasOwnProperty(sizeName) &&
          sizes[sizeName as keyof typeof sizes] > 0
        ) {
          try {
            const response = await axios.post("/api/size", {
              name: sizeName,
              quantity: sizes[sizeName as keyof typeof sizes],
              productId: productId,
            });

            console.log("Modelo Size creado:", response.data);
          } catch (error) {
            console.error("Error al crear el modelo Size:", error);
          }
        }
      }

      console.log(values);
    },
  });

  return (
    <div className="bg-white h-screen flex justify-center items-center flex-col ">
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 gap-2">
        {/* UPLOAD FILE */}
        <div className="flex items-center justify-center  w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full p-2 h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 "
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 ">
                <span className="font-semibold">Click para subir</span> arrastre
                o suelte
              </p>
              {/* <p className="text-xs text-gray-500 ">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p> */}
            </div>
            <input
              name="imageUrl"
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={(event) => {
                if (
                  event.currentTarget.files &&
                  event.currentTarget.files.length > 0
                ) {
                  formik.setFieldValue(
                    "imageUrl",
                    event.currentTarget.files[0]
                  );
                }
              }}
            />
          </label>
        </div>
        <div className="flex flex-col justify-center items-start bg-white w-96 p-5  gap-4">
          <h1 className="text-2xl font-semibold">Crear prenda</h1>

          {/* CATEGORY */}
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="">Categoria</label>

            <div className="flex gap-3 w-full justify-center items-center">
              <div
                onClick={() => {
                  formik.setFieldValue("categoryId", 4);
                  setOnSelected(4);
                }}
                className={`flex justify-center items-center flex-col gap-1 border-1 p-2 rounded-md w-32 cursor-pointer ${
                  onSelected === 4
                    ? "border-black text-black"
                    : "text-gray-400 border-gray-300"
                }`}
              >
                <PiCoatHangerBold
                  size={17}
                  color={`${onSelected === 4 ? "black" : "#9ca3af"}`}
                />
                <span className="font-bold text-xs">Hoddies</span>
              </div>
              <div
                onClick={() => {
                  formik.setFieldValue("categoryId", 6);
                  setOnSelected(6);
                }}
                className={`flex justify-center items-center flex-col gap-1 border-1 p-2 rounded-md w-32 cursor-pointer ${
                  onSelected === 6
                    ? "border-black text-black"
                    : "text-gray-400 border-gray-300"
                }`}
              >
                <PiPantsBold
                  size={17}
                  color={`${onSelected === 6 ? "black" : "#9ca3af"}`}
                />
                <span className="font-normal text-xs">Pants</span>
              </div>
              <div
                onClick={() => {
                  formik.setFieldValue("categoryId", 5);
                  setOnSelected(5);
                }}
                className={`flex justify-center items-center flex-col gap-1 border-1 p-2 rounded-md w-32 cursor-pointer ${
                  onSelected === 5
                    ? "border-black text-black"
                    : "text-gray-400 border-gray-300"
                }`}
              >
                <PiTShirtBold
                  size={17}
                  color={`${onSelected === 5 ? "black" : "#9ca3af"}`}
                />
                <span className="font-bold text-xs">Shirts</span>
              </div>
            </div>
          </div>

          <div className=" w-full flex flex-col gap-2">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="">Nombre</label>
              <div className="inputLogin">
                <input
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  placeholder="Ingresa un nombre"
                />
                <button
                  onClick={() => {
                    setShowDescription(true);
                  }}
                  className={`bg-white text-2xs flex gap-1 p-1 border-1 rounded-md font-semibold ${
                    showDescription && "hidden"
                  }`}
                >
                  Añadir
                  <span className="">descripcion</span>
                </button>
              </div>
            </div>
            {showDescription && (
              <div>
                <textarea
                  id="message"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-black  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe tu prenda aquí"
                ></textarea>
              </div>
            )}
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="">Precio</label>
              <div className="inputLogin">
                <input
                  name="price"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.price}
                  placeholder="0.00"
                />
                <span className="text-xs font-semibold">COP</span>
              </div>
            </div>

            <div>
              <label htmlFor="">Tallas</label>
              <div className="grid grid-cols-3 gap-x-4 gap-y-2">
                <div className="inputSize">
                  <span className="text-xs font-semibold bg-white border-1 p-1 rounded-md">
                    XS
                  </span>
                  <input
                    className="inputSizeNumber"
                    name="sizes.xs"
                    type="number"
                    onChange={formik.handleChange}
                  />
                </div>

                <div className="inputSize">
                  <span className="text-xs font-semibold bg-white border-1 p-1 rounded-md">
                    S
                  </span>
                  <input
                    className="inputSizeNumber"
                    name="sizes.s"
                    type="number"
                    onChange={formik.handleChange}
                  />
                </div>

                <div className="inputSize">
                  <span className="text-xs font-semibold bg-white border-1 p-1 rounded-md">
                    M
                  </span>
                  <input
                    className="inputSizeNumber"
                    name="sizes.m"
                    type="number"
                    onChange={formik.handleChange}
                  />
                </div>

                <div className="inputSize">
                  <span className="text-xs font-semibold bg-white border-1 p-1 rounded-md">
                    L
                  </span>
                  <input
                    className="inputSizeNumber"
                    name="sizes.l"
                    type="number"
                    onChange={formik.handleChange}
                  />
                </div>

                <div className="inputSize">
                  <span className="text-xs font-semibold bg-white border-1 p-1 rounded-md">
                    XL
                  </span>
                  <input
                    className="inputSizeNumber"
                    name="sizes.xl"
                    type="number"
                    onChange={formik.handleChange}
                  />
                </div>

                <div className="inputSize">
                  <span className="text-xs font-semibold bg-white border-1 p-1 rounded-md">
                    XXL
                  </span>
                  <input
                    className="inputSizeNumber"
                    name="sizes.xxl"
                    type="number"
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            className="bg-black text-white w-full py-3 h-12 rounded-lg text-sm"
            type="submit"
          >
            Subir
          </button>
        </div>
      </form>
    </div>
  );
}
