import RowProduct from "@/components/Product/RowProduct";
import { useOpen } from "@/store/OpenStore";
import { Product } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export interface InventoryProps {
  data: [];
}

function Inventory({ data }: InventoryProps) {
  const { setProducts, products, setOpenAddProduct } = useOpen();

  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    setProducts(data);
  }, []);

  useEffect(() => {
    if (session?.user?.roleId === 2) {
      router.push("/");
    }
  }, [session]);

  return (
    <div className="w-full z-50 text-sm text-left text-gray-500 flex flex-col justify-center items-center">
      {session?.user?.roleId === 1 ? (
        <div className="overflow-x-auto">
          <div className="w-full">
            <button
              onClick={() => setOpenAddProduct(true)}
              className="bg-black text-white text-xs font-bold rounded-[6px] min-w-[130px] px-3 py-2 flex justify-center"
            >
              Añadir Producto
            </button>
          </div>
          <div className="py-10">
            <table className="w-full  px-5 table-auto">
              <thead className="text-xs text-gray-700  bg-gray-50 ">
                <tr>
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">xs</th>
                  <th className="px-4 py-2">s</th>
                  <th className="px-4 py-2">m</th>
                  <th className="px-4 py-2">l</th>
                  <th className="px-4 py-2">xl</th>
                  <th className="px-4 py-2">xxl</th>
                  <th className="px-2 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((product: Product) => (
                    <RowProduct product={product} key={product.id} />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    let baseUrl = "";

    if (process.env.NODE_ENV === "development") {
      baseUrl = "http://localhost:3000";
    } else if (process.env.VERCEL_ENV === "development") {
      baseUrl = "https://omnimoode-git-develop-daivymorales-s-team.vercel.app";
    } else {
      baseUrl = "https://omnimoode.vercel.app";
    }

    const response = await axios.get(`${baseUrl}/api/product`);
    const data = response.data;

    return {
      props: { data },
    };
  } catch (error) {
    return {
      props: { products: [] },
    };
  }
}

export default Inventory;
