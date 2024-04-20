import React, { useEffect, useState } from "react";
import { useGetAddressByIdQuery } from "@/redux/api/addressApi";
import { useSession } from "next-auth/react";
import { useAppDispach } from "@/redux/hooks";
import { useGetCardByUserIdQuery } from "@/redux/api/cardApi";
import { setAddresses } from "@/redux/features/addressSlice";
import { setCards } from "@/redux/features/cardSlice";
import { useAppSelector } from "@/redux/hooks";
import { Address, Card } from "@/types";
import { HiTrash } from "react-icons/hi";
import AddressComponent from "../Address/AddressComponent";
import EditAddress from "../Address/EditAddress";
import { useOpen } from "@/store/OpenStore";
import AddAddress from "../Address/AddAddress";
import EditCard from "../Card/EditCard";
import AddCard from "../Card/AddCard";
import CardComponent from "../Card/CardComponent";

function InformationSection() {
  const { data: session } = useSession();
  const [onHoverAddress, setOnHoverAddress] = useState(false);

  const {
    openEditAddress,
    openAddAddress,
    setOpenAddAddress,
    address,
    setAddress,
    openEditCard,
    openAddCard,
    setOpenAddCard,
    card,
    setCard,
  } = useOpen();

  const userId = (session?.user as { id?: number })?.id ?? 0;

  const { data: dataAddress } = useGetAddressByIdQuery({
    id: userId,
  });

  const { data: dataCard, refetch } = useGetCardByUserIdQuery({
    id: userId,
  });

  const dispach = useAppDispach();

  useEffect(() => {
    setAddress(dataAddress?.map((address) => address));
    setCard(dataCard?.map((crd) => crd));
  }, [dataCard, dataAddress]);

  useEffect(() => {
    refetch();
  }, [card]);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col justify-start items-start gap-2">
        <h3 className="font-bold text-xl">Tus Domicilios</h3>
        <p className="text-neutral-400">
          Gestiona los lugares donde enviaremos tu pedido
        </p>
      </div>

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
              isCheckout={false}
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

      <div className="flex flex-col justify-start items-start gap-2">
        <h3 className="font-bold text-xl">Tus Tarjetas</h3>
        <p className="text-neutral-400">
          Gestiona informacion de tus tarjetas para pagar
        </p>
      </div>
      {openEditCard ? (
        <EditCard />
      ) : openAddCard ? (
        <AddCard />
      ) : card?.length > 0 ? (
        <div className="flex w-full flex-col gap-1 justify-start items-center bg-white border-1  rounded-lg sm:flex">
          {card.map((crd: Card) => (
            <CardComponent key={crd.id} crd={crd} isCheckout={false} />
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
  );
}

export default InformationSection;
