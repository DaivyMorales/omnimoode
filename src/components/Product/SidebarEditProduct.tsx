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

function SidebarEditProduct() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const {
    openEditProduct,
    setOpenEditProduct,
    dataEditProduct,
    setProducts,
    products,
  } = useOpen();
  const [onSelected, setOnSelected] = useState(dataEditProduct.categoryId);
  const [productIsUpdated, setProductIsUpdated] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const { data: session } = useSession();

  const id = (session?.user as { id?: number })?.id?.toString() ?? "0";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sectionRef.current &&
        !sectionRef.current.contains(event.target as Node)
      ) {
        setOpenEditProduct(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openEditProduct]);

  const initialValues = {
    categoryId: dataEditProduct?.categoryId || "",
    imageUrl: dataEditProduct?.imageUrl || "",
    imageLink: "",
    name: dataEditProduct?.name || "",
    description: dataEditProduct?.description || "",
    price: dataEditProduct?.price || "",
    sizes: {
      xs:
        dataEditProduct.sizes.find((size) => size.name === "xs")?.quantity || 0,
      s: dataEditProduct.sizes.find((size) => size.name === "s")?.quantity || 0,
      m: dataEditProduct.sizes.find((size) => size.name === "m")?.quantity || 0,
      l: dataEditProduct.sizes.find((size) => size.name === "l")?.quantity || 0,
      xl:
        dataEditProduct.sizes.find((size) => size.name === "xl")?.quantity || 0,
      xxl:
        dataEditProduct.sizes.find((size) => size.name === "xxl")?.quantity ||
        0,
    },
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      setisLoading(true);
      if (values.imageUrl !== dataEditProduct.imageUrl) {
        const formData = new FormData();
        formData.append("imageUrl", values.imageUrl);

        const response = await axios.post("/api/upload", formData);
        const urlObtained = response.data.imageUrl;
        console.log(urlObtained);

        formik.values.imageLink = urlObtained;
      }

      const sizeEdited = dataEditProduct.sizes.forEach(async (size) => {
        // Obtener el nombre de la talla actual
        const sizeName = size.name;

        if (values.sizes.hasOwnProperty(sizeName)) {
          const quantity = values.sizes[sizeName as keyof typeof values.sizes];
          console.log(quantity);

          if (quantity > 0) {
            try {
              await axios.put(`/api/size/${size.id}`, {
                quantity,
              });

              // console.log("Tamaño actualizado:", sizeUpdateResponse.data);
            } catch (error) {
              console.error("Error al actualizar la talla:", error);
            }
          }
        }
      });

      try {
        const productForm = {
          name: values.name,
          description: values.description,
          price: values.price,
          categoryId: values.categoryId,
          imageLink: values.imageLink,
        };

        const response = await axios.put(
          `/api/product/${dataEditProduct.id}`,
          productForm
        );
        if (response.status === 200) {
          setProductIsUpdated(true);
          setProducts(
            products.map((product) => {
              if (product.id === dataEditProduct.id) {
                return {
                  ...product,
                  ...response.data,
                  userId: parseInt(id),
                };
              } else {
                return product;
              }
            })
          );
          setOpenEditProduct(false);
          setisLoading(false);
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="delete-alert">
      <div className="w-full h-screen flex justift-start items-start">
        <motion.section
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          className="h-full w-[500px] bg-white"
          ref={sectionRef}
        >
          <form onSubmit={formik.handleSubmit}>
            <div className="py-4 px-4">
              <div className="flex justify-between items-center py-4 px-4">
                <h3 className="font-bold text-xl">Actualizar Prenda</h3>
                <div
                  onClick={() => setOpenEditProduct(false)}
                  className="cursor-pointer text-neutral-400 rounded-lg p-1 hover:bg-neutral-200 hover:text-black"
                >
                  <TiTimes />
                </div>
              </div>
              <div>
                <Image
                  alt="Product Image"
                  src={dataEditProduct.imageUrl}
                  height={300}
                  width={300}
                />
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
                      value={formik.values.sizes.xs}
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
                      value={formik.values.sizes.s}
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
                      value={formik.values.sizes.m}
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
                      value={formik.values.sizes.l}
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
                      value={formik.values.sizes.xl}
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
                      value={formik.values.sizes.xxl}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full gap-3 flex justify-end bg-neutral-200 py-4 px-4">
              <button
                type="button"
                onClick={() => setOpenEditProduct(false)}
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

export default SidebarEditProduct;
