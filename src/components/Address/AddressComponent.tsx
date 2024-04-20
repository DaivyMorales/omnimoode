import { useOpen } from "@/store/OpenStore";
import { Address } from "@/types";
import React from "react";
import { TiPencil, TiTrash } from "react-icons/ti";
import { useSession } from "next-auth/react";
import axios from "axios";

interface AddressComponentProps {
  address: Address;
  isCheckout: boolean;
  setAddressSelectedId?: React.Dispatch<
    React.SetStateAction<number | null | undefined>
  >;
  addressSelectedId?: number | null | undefined;
}

function AddressComponent({
  address,
  isCheckout,
  setAddressSelectedId,
  addressSelectedId,
}: AddressComponentProps) {
  const {
    setOpenEditAddress,
    setDataEditAddress,
    setAddress,
    address: allAddress,
  } = useOpen();

  const { data: session, status } = useSession();

  const deleteAddress = async () => {
    const response = await axios.delete(`/api/address/${address.id}`);

    const updatedAddresses = allAddress.filter(
      (addr) => addr.id !== address.id
    );

    setAddress(updatedAddresses);
  };

  return (
    <div
      key={address.id}
      className="relative flex justify-between items-center w-full gap-y-3 rounded-lg py-5 px-8 "
    >
      <div className="flex items-center gap-3 w-full">
        {isCheckout && address.id && (
          <input
          className="w-[12px] h-[12px]"
            type="radio"
            checked={addressSelectedId === address.id}
            onClick={() => {
              setAddressSelectedId(address.id);
            }}
            // onChange={() => setIsSelected(!isSelected)}
          />
        )}

        <div className=" min-w-[200px] flex flex-col justify-start items-start gap-1">
          <div className="w-full flex gap-2">
            <h3 className="font-bold">{address.address}</h3>
            {status === "authenticated" && !isCheckout && (
              <div
                onClick={() => deleteAddress()}
                className="cursor-pointer rounded-lg p-1 hover:bg-neutral-100 hover:text-red-500"
              >
                <TiTrash />
              </div>
            )}
          </div>
          <div className="flex gap-1">
            <p className="font-semibold">{address.state},</p>
            <p className="font-semibold">{address.city}</p>
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          setOpenEditAddress(true);
          setDataEditAddress(address);
        }}
        className="cursor-pointer p-1 rounded-lg hover:bg-neutral-100"
      >
        <TiPencil />
      </div>
    </div>
  );
}

export default AddressComponent;
