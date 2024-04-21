import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useOpen } from "@/store/OpenStore";
import { TiTick, TiTimes } from "react-icons/ti";
import Image from "next/image";
import { useFormik } from "formik";
import {
  PiCoatHanger,
  PiCoatHangerBold,
  PiPantsDuotone,
  PiTShirtBold,
  PiTShirtDuotone,
} from "react-icons/pi";
import axios from "axios";
import { useSession } from "next-auth/react";
import { CgSpinner } from "react-icons/cg";

function SidebarAddProduct() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { openAddProduct, setOpenAddProduct, setProducts, products } =
    useOpen();
  const [onSelected, setOnSelected] = useState(0);
  const [productIsUpdated, setProductIsUpdated] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const { data: session } = useSession();

  const id = (session?.user as { id?: number })?.id?.toString() ?? "0";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sectionRef.current &&
        !sectionRef.current.contains(event.target as Node)
      ) {
        setOpenAddProduct(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openAddProduct]);

  const initialValues = {
    categoryId: 0,
    imageUrl: "",
    imageLink: "",
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
  };
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      if (values.imageUrl) {
        const formData = new FormData();
        formData.append("imageUrl", values.imageUrl);

        const response = await axios.post("/api/upload", formData);
        const urlObtained = response.data.imageUrl;
        console.log(urlObtained);

        formik.values.imageLink = urlObtained;
      }

      const productForm = {
        name: values.name,
        description: values.description,
        price: values.price,
        categoryId: values.categoryId,
        imageLink: values.imageLink,
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
            if (response.status === 200) {
              setOpenAddProduct(false);
            }
          } catch (error) {
            console.error("Error al crear el modelo Size:", error);
          }
        }
      }
    },
  });

  const handleImageChange = (files: FileList) => {
    if (files.length > 0) {
      formik.setFieldValue("imageUrl", files[0]);

      setSelectedImage(URL.createObjectURL(files[0]));
    }
  };

  return (
    <div className="delete-alert">
      <div className="w-full h-screen flex justift-start items-start">
        <motion.section
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          className="min-h-full w-[500px] bg-white"
          ref={sectionRef}
          style={{ maxHeight: "80vh", overflowY: "auto" }}
        >
          <form onSubmit={formik.handleSubmit}>
            <div className="py-4 px-4">
              <div className="flex justify-between items-center py-4 px-4">
                <h3 className="font-bold text-xl">Crear Prenda</h3>
                <div
                  onClick={() => setOpenAddProduct(false)}
                  className="cursor-pointer text-neutral-400 rounded-lg p-1 hover:bg-neutral-200 hover:text-black"
                >
                  <TiTimes />
                </div>
              </div>
              {/* UPLOAD FILE */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const files = e.dataTransfer.files;
                  handleImageChange(files);
                }}
                className="flex items-center justify-center  w-full"
              >
                <label
                  htmlFor="dropzone-file"
                  className={`flex flex-col items-center justify-center w-full p-2 h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-black ${
                    selectedImage && "bg-gray-50 dark:bg-gray-50"
                  }`}
                >
                  {selectedImage ? (
                    <div className="w-full">
                      {/* <img  alt="Selected Image" /> */}
                      <Image
                        src={selectedImage}
                        width={400}
                        height={400}
                        alt="Selected Image"
                      />
                    </div>
                  ) : (
                    <>
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
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 ">
                          <span className="font-semibold">
                            Click para subir
                          </span>{" "}
                          arrastre o suelte
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
                        onChange={(e) => {
                          if (e.target.files) {
                            handleImageChange(e.target.files);
                          }
                        }}
                      />
                    </>
                  )}
                </label>
              </div>

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
                        ? "border-black text-black dark:border-white dark:text-white"
                        : "text-gray-400 border-gray-300 dark:text-gray-600 dark:border-gray-700"
                    }`}
                  >
                    <PiCoatHangerBold
                      size={17}
                      className={`${
                        onSelected === 5
                          ? "black dark:white"
                          : "#9ca3af dark:black"
                      }`}
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
                        ? "border-black text-black dark:border-white dark:text-white"
                        : "text-gray-400 border-gray-300 dark:text-gray-600 dark:border-gray-700"
                    }`}
                  >
                    <PiPantsDuotone
                      size={17}
                      className={`${
                        onSelected === 5
                          ? "black dark:white"
                          : "#9ca3af dark:black"
                      }`}
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
                        ? "border-black text-black dark:border-white dark:text-white"
                        : "text-gray-400 border-gray-300 dark:text-gray-600 dark:border-gray-700"
                    }`}
                  >
                    <PiTShirtBold
                      size={17}
                      className={`${
                        onSelected === 5
                          ? "black dark:white"
                          : "#9ca3af dark:black"
                      }`}
                    />
                    <span className="font-bold text-xs">Shirts</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="">Nombre</label>
                <div className="inputLogin">
                  <input
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    placeholder="Ingresa un nombre"
                    className="text-xs"
                    value={formik.values.name}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="">Precio</label>
                <div className="inputLogin">
                  <input
                    name="price"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                    placeholder="0"
                    className="text-xs"
                  />
                  <span className="text-xs font-semibold">COP</span>
                </div>
              </div>

              <div>
                <label htmlFor="">Tallas</label>
                <div className="grid grid-cols-3 gap-x-4 gap-y-2">
                  <div className="inputSize">
                    <span className="text-xs font-semibold bg-white border-1 p-1 rounded-md w-[35px] flex items-center justify-center dark:text-black">
                      xs
                    </span>
                    <input
                      className="inputSizeNumber"
                      name="sizes.xs"
                      type="number"
                      onChange={formik.handleChange}
                    />
                  </div>

                  <div className="inputSize">
                    <span className="text-xs font-semibold bg-white border-1 p-1 w-[35px] flex items-center justify-center rounded-md dark:text-black">
                      s
                    </span>
                    <input
                      className="inputSizeNumber"
                      name="sizes.s"
                      type="number"
                      onChange={formik.handleChange}
                    />
                  </div>

                  <div className="inputSize">
                    <span className="text-xs font-semibold bg-white border-1 p-1 w-[35px] flex items-center justify-center rounded-md dark:text-black">
                      m
                    </span>
                    <input
                      className="inputSizeNumber"
                      name="sizes.m"
                      type="number"
                      onChange={formik.handleChange}
                    />
                  </div>

                  <div className="inputSize">
                    <span className="text-xs font-semibold bg-white border-1 p-1 w-[35px] flex items-center justify-center rounded-md dark:text-black">
                      l
                    </span>
                    <input
                      className="inputSizeNumber"
                      name="sizes.l"
                      type="number"
                      onChange={formik.handleChange}
                    />
                  </div>

                  <div className="inputSize">
                    <span className="text-xs font-semibold bg-white border-1 p-1 w-[35px] flex items-center justify-center rounded-md dark:text-black">
                      xl
                    </span>
                    <input
                      className="inputSizeNumber"
                      name="sizes.xl"
                      type="number"
                      onChange={formik.handleChange}
                    />
                  </div>

                  <div className="inputSize">
                    <span className="text-xs font-semibold bg-white border-1 p-1 rounded-md dark:text-black">
                      xxl
                    </span>
                    <input
                      className="inputSizeNumber "
                      name="sizes.xxl"
                      type="number"
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full gap-3 flex justify-end bg-neutral-200 py-4 px-4">
              <button
                type="button"
                onClick={() => setOpenAddProduct(false)}
                className="bg-neutral-50 text-black text-xs font-bold rounded-[6px]  px-3 py-2 flex justify-center"
              >
                Cancelar
              </button>
              <button
                // onClick={() => profileSettings()}
                className={`bg-black text-white text-xs font-bold rounded-[6px] min-w-[130px] px-3 py-2 flex justify-center`}
              >
                {productIsUpdated ? (
                  <TiTick size={17} />
                ) : isLoading ? (
                  <div className="animate-spin">
                    <CgSpinner size={17} />
                  </div>
                ) : (
                  "Guardar cambios"
                )}
              </button>
            </div>
          </form>
        </motion.section>
      </div>
    </div>
  );
}

export default SidebarAddProduct;
