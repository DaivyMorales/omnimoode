import { useEffect, useState } from "react";
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
import EditAddress from "../Address/EditAddress";
import AddAddress from "../Address/AddAddress";
import AddressComponent from "../Address/AddressComponent";
import EditCard from "../Card/EditCard";
import AddCard from "../Card/AddCard";
import { useGetCardByUserIdQuery } from "@/redux/api/cardApi";

import CardComponent from "../Card/CardComponent";

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
  const [addressSelectedId, setAddressSelectedId] = useState<
    number | null | undefined
  >(0);
  const [cardSelectedId, setCardSelectedId] = useState<
    number | null | undefined
  >(0);

  const router = useRouter();

  const userId = (session?.user as { id?: number })?.id ?? 0;

  const { data: dataAddress } = useGetAddressByIdQuery({
    id: userId,
  });

  const { data: dataCard, refetch } = useGetCardByUserIdQuery({
    id: userId,
  });

  const cart = useAppSelector((state: any) => state.cartSlice.cart);

  const {
    setOpenPayment,
    setOpenAddAddress,
    setOpenEditAddress,
    openEditAddress,
    openAddAddress,
    address,
    setAddress,
    card,
    setCard,
    openEditCard,
    openAddCard,
    setOpenAddCard,
  } = useOpen();

  // useEffect(() => {
  //   setAddress(dataAddress?.map((address) => address));
  // }, [dataAddress]);

  // useEffect(() => {
  //   setAddress(dataCard?.map((card) => card));
  // }, [dataCard]);


  console.log(card, dataCard)
  useEffect(() => {
    setAddress(dataAddress?.map((address) => address));
    setCard(dataCard?.map((crd) => crd));
  }, [dataCard, dataAddress]);

  useEffect(() => {
    setAddress(dataAddress?.map((address) => address));
    setCard(dataCard?.map((crd) => crd));
  }, []);


  useEffect(() => {
    refetch();
  }, [card]);

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
    <div className="flex flex-col justify-start items-start w-full ">
      <div className="flex flex-col justify-start items-start px-3 gap-2">
        <h3 className="font-bold text-xl">
          {openEditAddress
            ? "Editar Dirección"
            : openAddAddress
            ? "Crear Dirección"
            : "Tus Direcciones"}
        </h3>
        <p className="text-neutral-400">
          Gestiona los lugares donde enviaremos tu pedido
        </p>
      </div>
      <div className="p-2 w-full flex flex-col gap-5 justify-center items-center">
        {openEditAddress ? (
          <EditAddress />
        ) : openAddAddress ? (
          <AddAddress />
        ) : address?.length > 0 ? (
          <div className="flex w-full flex-col gap-1 justify-start items-center bg-white border-1  rounded-lg sm:flex">
            {address.map((address: Address) => (
              <AddressComponent
                key={address.id}
                address={address}
                isCheckout={true}
                setAddressSelectedId={setAddressSelectedId}
                addressSelectedId={addressSelectedId}
              />
            ))}
            <div className="w-full flex gap-3 justify-end bg-neutral-200 py-4 px-4">
              <button
                onClick={() => setOpenAddAddress(true)}
                // } text-xs font-bold rounded-[6px] min-w-[130px] px-3 py-2 flex justify-center`}
                className="bg-black text-white text-xs font-bold rounded-[6px] min-w-[130px] px-3 py-2 flex justify-center"
              >
                Añadir Dirección
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-[13px] text-gray-400">
              No tienes ningún domicilio aún,{" "}
              <span
                onClick={() => setOpenAddAddress(true)}
                className="underline font-bold text-black cursor-pointer"
              >
                Crear Dirección.
              </span>
            </h3>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-start items-start px-3 gap-2">
        <h3 className="font-bold text-xl">
          {openEditAddress
            ? "Editar Tarjeta"
            : openAddAddress
            ? "Crear Tarjeta"
            : "Tus Tarjetas"}
        </h3>
        <p className="text-neutral-400">
          Gestiona informacion de tus tarjetas para pagar
        </p>
      </div>
      <div className="p-2 w-full flex flex-col gap-5 justify-center items-center">
        {openEditCard ? (
          <EditCard />
        ) : openAddCard ? (
          <AddCard />
        ) : card?.length > 0 ? (
          <div className="flex w-full flex-col gap-1 justify-start items-center bg-white border-1  rounded-lg sm:flex">
            {card.map((crd: Card) => (
              <CardComponent key={crd.id} crd={crd} isCheckout={true} cardSelectedId={cardSelectedId} setCardSelectedId={setCardSelectedId} />
            ))}
            <div className="w-full flex gap-3 justify-end bg-neutral-200 py-4 px-4">
              <button
                onClick={() => setOpenAddCard(true)}
                className="bg-black text-white text-xs font-bold rounded-[6px] min-w-[130px] px-3 py-2 flex justify-center"
              >
                Añadir Tarjeta
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-[13px] text-gray-400">
              No tienes ninguna tarjeta aún,{" "}
              <span
                onClick={() => setOpenAddCard(true)}
                className="underline font-bold text-black cursor-pointer"
              >
                Añadir tarjeta
              </span>
            </h3>
          </div>
        )}
      </div>
      <button
        onClick={async () => {
          await updateStock(cart);
        }}
        className="font-medium bg-black p-2 text-white px-[12px] text-center text-[14px] rounded-md hover:bg-gray-900 w-full "
      >
        Pagar
      </button>
    </div>
  );
}
