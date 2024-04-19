import { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { CartProduct } from "@/types";
import Image from "next/image";
import { setCart } from "@/redux/features/cartSlice";
import { useDispatch } from "react-redux";
import { useGetCartByIdQuery } from "@/redux/api/cartApi";
import { useSession } from "next-auth/react";

interface SummaryProps {
  finalPrice: number;
  setFinalPrice: React.Dispatch<React.SetStateAction<number>>;
}

export default function Summary({ finalPrice, setFinalPrice }: SummaryProps) {
  const { data: session } = useSession();

  const cart = useAppSelector((state: any) => state.cartSlice.cart);
  const cartId = (session?.user as { cartId?: number })?.cartId ?? 0;

  const { data, refetch } = useGetCartByIdQuery({
    id: cartId,
  });

  const dispatch = useDispatch();

  const total = cart.reduce(
    (sum: any, cartProduct: CartProduct) =>
      sum + cartProduct.product.price * cartProduct.quantity,
    0
  );

  useEffect(() => {
    if ((data?.products.length ?? 0) > 0) {
      dispatch(setCart(data?.products));
    }
  }, [data?.products]);

  useEffect(() => {
    if (cart) {
      setFinalPrice(total);
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center py-5">
      <div className="relative overflow-x-auto border-1 border-gray-200 shadow-sm h-full rounded-lg p-4  p-2 rounded-lg">
        <h3>Resumen de tu compra</h3>
        <table className="w-full border-t  text-sm text-left rtl:text-right dark:text-gray-400">
          <thead className="hidden text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="">
                Image
              </th>
              <th scope="col" className="">
                Content
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.map((cartProduct: CartProduct) => (
              <tr className=" border-b " key={cartProduct.id}>
                <th
                  scope="row"
                  className="py-4 px-2 font-medium text-gray-900  whitespace-nowrap dark:text-white"
                >
                  <Image
                    src={cartProduct.product.imageUrl}
                    width={100}
                    height={100}
                    alt="Product Image"
                    className="shadow-sm border-1 rounded-md"
                  />
                </th>
                <td className="flex flex-col gap-2 py-4 px-2">
                  <h4 className="font-semibold">{cartProduct.product.name}</h4>
                  <div className=" flex gap-3">
                    <div className="flex gap-1">
                      <p className="font-medium text-gray-400">Tamaño:</p>
                      <p className="font-semibold text-black">
                        {cartProduct.size.name.toUpperCase()}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <p className="font-medium text-gray-400">Prenda:</p>
                      <p className="font-semibold text-black">Hoddie</p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center justify-start">
                    <p className="text-xl font-bold">
                      ${cartProduct.product.price * cartProduct.quantity}
                    </p>
                    <span className="text-gray-500 text-xs">x</span>
                    <p className="text-xl font-medium text-gray-400">
                      {cartProduct.quantity}
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="grid grid-cols-2 gap-4 p-3 border-b">
          <p className="font-medium text-black">Producto</p>
          <p className="font-bold">${total}</p>
          <p className="font-medium text-black">Envio</p>
          <p className="font-bold">
            $12 <span className="font-semibold text-gray-400"> (Expreso)</span>
          </p>
        </div>
        <div className="flex justify-between items-center rounded-lg py-6  px-3 bg-[#eaeaea]">
          <h4 className="text-2xl">Total</h4>
          <span className="text-3xl font-bold">${total}</span>
        </div>
      </div>
    </div>
  );
}
