import { useEffect } from "react";
import { useGetAddressByIdQuery } from "@/redux/api/addressApi";
import { useGetCardByIdQuery } from "@/redux/api/cardApi";
import { useAppSelector } from "@/redux/hooks";
import { useSession } from "next-auth/react";
import { CartProduct, Card, Address } from "@/types";
import { HiCreditCard, HiOfficeBuilding } from "react-icons/hi";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { useRouter } from "next/router";
import { useOpen } from "@/store/OpenStore";

interface ShippingOptionsProps {
  finalPrice: number;
  setPayment: React.Dispatch<React.SetStateAction<boolean>>;
  userCards: never[];
}

export default function ShippingOptions({
  finalPrice,
  setPayment,
  userCards,
}: ShippingOptionsProps) {
  const { data: session } = useSession();

  const router = useRouter();

  const { setOpenPayment } = useOpen();

  const cart = useAppSelector((state: any) => state.cartSlice.cart);

  const userId = (session?.user as { id?: number })?.id ?? 0;

  const { data: dataAddress, refetch } = useGetAddressByIdQuery({
    id: userId,
  });

  const { data: dataCard } = useGetCardByIdQuery({
    id: userId,
  });

  useEffect(() => {
    refetch();
  }, []);

  const updateStock = async (cartProducts: CartProduct[]) => {
    try {
      await Promise.all(
        cartProducts.map(async (cartProduct) => {
          const {
            size: { id },
            quantity,
          } = cartProduct;

          const response = await axios.patch(`/api/size/${id}`, {
            subtractQuantity: quantity,
          });

          if (response.status === 200) {
            router.push("/checkout/SuccessPayment");

            await axios.delete(`/api/cart/cartProduct/${cartProduct.id}`);
          }
        })
      );
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="p-2 flex flex-col gap-5 justify-center items-center">
        {dataAddress?.length === 0 ? (
          <>
            <button className="text-[12px] w-full bg-white border-1 text-[#666666] px-[6px] py-[5px] rounded-md ">
              Agregar domicilio
            </button>
          </>
        ) : (
          <div className="border-1 p-2 shadow-sm rounded-lg">
            <div className="absolute p-1 border-1 rounded-full">
              <HiOfficeBuilding size={15} />
            </div>
            {dataAddress?.map((address: Address) => (
              <div
                key={address.id}
                className="flex justify-between items-center gap-4 px-9 py-1"
              >
                <div className="flex flex-col gap-1">
                  <h4 className="font-normal text-sm">
                    Dirección de domicilio
                  </h4>
                  <p className="font-semibold">
                    {address.city}, {address.state}, {address.address},{" "}
                    {address.neighborhood}
                  </p>
                  <p className="font-semibold">
                    {address.country}, {address.phone}
                  </p>
                </div>
                <button className="text-[12px] bg-white border-1 text-[#666666] px-[6px] py-[5px] rounded-md ">
                  Cambiar
                </button>
              </div>
            ))}
          </div>
        )}

        {userCards.length === 0 ? (
          <>
            <button
              onClick={() => setOpenPayment(true)}
              className="text-[12px] w-full bg-white border-1 text-[#666666] px-[6px] py-[5px] rounded-md "
            >
              Agregar tarjeta
            </button>
          </>
        ) : (
          <div className="relative shadow-sm border-1 p-2 gap-3 rounded-lg w-full flex flex-col justify-start  items-start">
            <div className="flex items-center gap-2">
              <div className=" top-2 p-1 border-1 rounded-full">
                <HiCreditCard size={15} />
              </div>
              <h3>Seleccion una tarjeta</h3>
            </div>
            <div className="flex flex-col gap-1">
              {userCards?.map((card: Card) => (
                <div
                  key={card.id}
                  className="flex justify-between items-center gap-4 px-9 py-1"
                >
                  <label className="flex items-center gap-4">
                    <input type="radio" name="selectedCard" value={card.id} />
                    <div className="flex flex-col gap-1">
                      <h4 className="font-normal text-sm"></h4>
                      <p className="font-semibold">
                        {card.card_number
                          .replace(/.(?=.{4})/g, "*")
                          .replace(/\s/g, "")
                          .replace(/(.{4})/g, "$1")}
                      </p>
                    </div>
                  </label>
                </div>
              ))}
            </div>
            <div className="w-full flex items-center justify-center">
              <button
                onClick={() => setOpenPayment(true)}
                className="text-[12px] bg-white border-1 text-[#666666] px-[6px] py-[5px] rounded-md "
              >
                Agregar tarjeta
              </button>
            </div>
          </div>
        )}
        <button
          onClick={async () => {
            await updateStock(cart);
          }}
          className="font-medium bg-black p-2 text-white px-[12px] text-center text-[14px] rounded-md hover:bg-gray-900 w-full "
        >
          Pagar
        </button>
      </div>
    </div>
  );
}
