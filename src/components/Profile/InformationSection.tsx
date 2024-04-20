import React, { useEffect, useState } from "react";
import { useGetAddressByIdQuery } from "@/redux/api/addressApi";
import { useSession } from "next-auth/react";
import { useAppDispach } from "@/redux/hooks";
import { useGetCardByUserIdQuery } from "@/redux/api/cardApi";
import { setAddresses } from "@/redux/features/addressSlice";
import { setCards } from "@/redux/features/cardSlice";
import { useAppSelector } from "@/redux/hooks";
import { Address } from "@/types";
import { HiTrash } from "react-icons/hi";
import AddressComponent from "../Address/AddressComponent";
import EditAddress from "../Address/EditAddress";
import { useOpen } from "@/store/OpenStore";
import AddAddress from "../Address/AddAddress";

function InformationSection() {
  const { data: session } = useSession();
  const [onHoverAddress, setOnHoverAddress] = useState(false);

  const {
    openEditAddress,
    openAddAddress,
    setOpenAddAddress,
    address,
    setAddress,
  } = useOpen();

  const userId = (session?.user as { id?: number })?.id ?? 0;

  const { data: dataAddress } = useGetAddressByIdQuery({
    id: userId,
  });

  const { data: dataCard, refetch } = useGetCardByUserIdQuery({
    id: userId,
  });

  // const addresses = useAppSelector((state) => state.addressSlice.addresses);
  const cards = useAppSelector((state) => state.cardSlice.cards);

  console.log(dataAddress);

  const dispach = useAppDispach();

  useEffect(() => {
    setAddress(dataAddress?.map((address) => address));
    dispach(setCards(dataCard));
  }, [dataCard, dataAddress]);

  useEffect(() => {
    refetch();
  }, [cards]);

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
            <AddressComponent key={address.id} address={address} />
          ))}
          <div className="w-full flex gap-3 justify-end bg-neutral-200 py-4 px-4">
            <button
              onClick={() => setOpenAddAddress(true)}
              // } text-xs font-bold rounded-[6px] min-w-[130px] px-3 py-2 flex justify-center`}
              className="bg-black text-white text-xs font-bold rounded-[6px] min-w-[130px] px-3 py-2 flex justify-center"
            >
              {/* {nameIsUpdated ? (
              <TiTick size={17} />
            ) : isLoading ? (
              <div className="animate-spin">
                <CgSpinner size={17} />
              </div>
            ) : isTyping ? (
              "Guardar cambios"
            ) : (
              "Guardar cambios"
            )} */}
              Añadir Dirección
              {/*          
          <div className="animate-spin">
                <CgSpinner size={17} />
              </div> */}
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
      <div className="flex flex-col gap-5 justify-start items-center bg-white border-1 w-full py-5 rounded-lg sm:flex"></div>
    </div>
  );
}

export default InformationSection;
