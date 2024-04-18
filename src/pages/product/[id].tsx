import { useRouter } from "next/router";
import Image from "next/image";
import { useGetProductByIdQuery } from "@/redux/api/productApi";
import {
  PiScribbleLoopBold,
  PiShoppingBagOpenBold,
  PiHeartBold,
} from "react-icons/pi";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import { createCartProduct, setCart } from "@/redux/features/cartSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hooks";
import { motion } from "framer-motion";
import { AiOutlineReload } from "react-icons/ai";
import { useSession } from "next-auth/react";

export default function ProductPage() {
  const [sizeSelected, setSizeSelected] = useState(0);
  const [submited, setSubmited] = useState(false);

  const { data: session } = useSession();

  const cartId = (session?.user as { cartId?: number })?.cartId;

  const router = useRouter();

  const cart = useAppSelector((state) => state.cartSlice.cart);

  const dispatch = useDispatch();

  const productId = {
    id: parseInt(router.query.id as string),
  };

  const { isLoading, isFetching, data, error } =
    useGetProductByIdQuery(productId);

  const formik = useFormik({
    initialValues: {
      productId: undefined,
      sizeId: undefined,
    },
    onSubmit: async (values) => {
      const newCartProduct = {
        cartId,
        productId: values.productId,
        sizeId: values.sizeId,
        quantity: 1,
        isLoaded: false,
      };

      setSubmited(true);
      const response = await dispatch(createCartProduct(newCartProduct) as any);

      dispatch(setCart([...cart, response.payload]));

      if (response.payload) {
        formik.setFieldValue("sizeId", undefined);
      }
      setSubmited(false);
    },
  });

  useEffect(() => {
    formik.setFieldValue("productId", data?.id);
  }, [data]);

  return (
    <div className=" h-screen flex justify-center items-center">
      {!data ? (
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
          <AiOutlineReload size={20} color="black" />
        </motion.div>
      ) : (
        <main className="grid grid-cols-1 gap-10 w-full h-full sm:grid-cols-2">
          <section className="flex justify-end items-center">
            <div className=" rounded-md ">
              {data?.imageUrl && (
                <Image
                  src={data.imageUrl}
                  width={500}
                  height={500}
                  priority
                  alt="Product Image"
                />
              )}
            </div>
          </section>
          <section className="flex flex-col justify-center items-center p-3 gap-10 sm:items-start">
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col justify-center items-start gap-10 "
            >
              <section className="flex gap-2 justify-center items-center ">
                <div className="p-2 rounded-full bg-black">
                  <PiScribbleLoopBold color="white" />
                </div>
                <p className="font-bold">Omnimoode</p>
              </section>
              <h2 className="font-bold text-2xl">{data?.name}</h2>
              <h1 className="font-black">${data?.price} COP</h1>
              <section className="w-full">
                <label htmlFor="">Seleccion tu talla:</label>
                <div className="grid grid-cols-6 gap-2">
                  {data?.sizes.map((size) => (
                    <div
                      key={size.id}
                      onClick={() => {
                        formik.setFieldValue("sizeId", size.id);
                        setSizeSelected(size.id);
                      }}
                      className={`${
                        sizeSelected === size.id
                          ? "border-black text-black font-bold"
                          : "border-gray-400 text-gray-400"
                      } border-1 py-1 px-2 flex justify-center items-center rounded-md  cursor-pointer`}
                    >
                      <p className="text-sm font-semibold ">
                        {size.name.toUpperCase()}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
              <section className="flex gap-3 justify-center items-center">
                <button
                  className="bg-black text-white text-semibold w-64 py-3 h-12 rounded-lg text-sm flex justify-center items-center gap-2 dark:bg-white dark:text-black"
                  type="submit"
                >
                  {submited ? (
                    <>
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
                    </>
                  ) : (
                    <>
                      <PiShoppingBagOpenBold size={16} />
                      Agregar a carrito
                    </>
                  )}
                </button>
               
              </section>
            </form>
          </section>
        </main>
      )}
    </div>
  );
}
