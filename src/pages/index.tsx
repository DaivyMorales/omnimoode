import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { HiOutlineMail, HiCheck } from "react-icons/hi";
import axios from "axios";
import Image from "next/image";
import { useGetNewestProductsQuery } from "@/redux/api/newestProductApi";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import { PiHeartBold } from "react-icons/pi";

import { FreeMode, Pagination, Mousewheel, Scrollbar } from "swiper/modules";

export default function Home() {
  const { status } = useSession();

  const router = useRouter();

  const { data } = useGetNewestProductsQuery(null);

  const [emailValue, setEmailValue] = useState("");
  const [statusResponse, setStatusResponse] = useState(0);

  const handleNewsletter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    setEmailValue(inputText);
  };

  return (
    <main className="bg-red-500">
      {status === "unauthenticated" && (
        <section className="py-6 p-3 flex justify-center items-center flex-col bg-black text-white gap-2">
          <div className="flex flex-col justify-center items-center  text-center ">
            <h2 className="font-bold">SUSCRIBETE A NUESTRO NEWSLETTER</h2>
            <p>
              ¡Suscríbete a nuestro boletín de moda! Recibe actualizaciones
              exclusivas, promociones y consejos de estilo.
            </p>
          </div>
          <div className=" flex gap-2">
            <div
              className={`${
                statusResponse === 200 && "border-green-500 text-green-400"
              } border-1 border-gray-300 w-full px-2 py-1 flex justify-start items-center gap-2 rounded-lg`}
            >
              <div className="bg-black p-2 rounded-md">
                <HiOutlineMail />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                onChange={handleNewsletter}
                placeholder="Digita tu email"
                //value={formik.values.email}
              />
              <button
                onClick={async () => {
                  const response = await axios.post("/api/newsletter", {
                    email: emailValue,
                  });

                  if (response.status === 200) {
                    setStatusResponse(200);
                  }
                  console.log(response.data, response.status);
                }}
                className="text-xs bg-black p-1 rounded-md bg-white text-black font-semibold w-24 flex justify-center items-center"
              >
                {statusResponse === 200 ? (
                  <>
                    <HiCheck />
                  </>
                ) : (
                  "Notificarme"
                )}
              </button>
            </div>
          </div>
        </section>
      )}

      <section className=" h-screen bg-white flex flex-col gap-5 justify-start items-start">
        <h3 className="text-2xl font-bold">Lo mas nuevo</h3>
        <Swiper
          scrollbar={{
            hide: true,
          }}
          breakpoints={{
            340: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            700: {
              slidesPerView: 4,
              spaceBetween: 5,
            },
          }}
          freeMode={true}
          pagination={false}
          mousewheel={true}
          modules={[Mousewheel, FreeMode, Pagination, Scrollbar]}
          className="max-w-[95%]"
        >
          {data?.map((product) => (
            <SwiperSlide
              key={product.id}
              className="cursor-pointer py-6"
              onClick={() => router.push(`/product/${product.id}`)}
            >
              <div className="relative">
                <button className="absolute top-3 left-3 border-black border-1 text-white p-2 rounded-lg">
                <PiHeartBold color="black"/>
                </button>
                <Image
                  src={product.imageUrl}
                  alt="product image"
                  width={400}
                  height={50}
                />
              </div>
              {product.name}
              <p className="font-bold">${product.price}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <section className=" h-screen "></section>
      <section className=" h-screen "></section>

      {status === "authenticated" && (
        <>
          <h1>You are Welcome! </h1>
          <button
            className="bg-red-500 p-2 text-white"
            onClick={() => {
              signOut({ callbackUrl: "/login" });
            }}
          >
            Salir
          </button>
        </>
      )}
    </main>
  );
}
