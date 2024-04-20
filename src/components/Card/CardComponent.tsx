import { useOpen } from "@/store/OpenStore";
import { Address, Card } from "@/types";
import React from "react";
import { TiPencil, TiTrash } from "react-icons/ti";
import { useSession } from "next-auth/react";
import axios from "axios";

interface CardComponentProps {
  crd: Card;
  isCheckout: boolean;
  setCardSelectedId?: React.Dispatch<
    React.SetStateAction<number | null | undefined>
  >;
  cardSelectedId?: number | null | undefined;
}

function CardComponent({
  crd,
  isCheckout,
  setCardSelectedId,
  cardSelectedId,
}: CardComponentProps) {
  const {
    setOpenEditCard,
    setDataEditCard,
    setCard,
    card: allCards,
  } = useOpen();

  const { data: session, status } = useSession();

  const deleteCard = async () => {
    const response = await axios.delete(`/api/card/null/${crd.id}`);

    if (response.status === 200) {
      const updatedAddresses = allCards.filter((addr) => addr.id !== crd.id);

      setCard(updatedAddresses);
    }
  };

  return (
    <div
      key={crd.id}
      className="relative flex justify-between items-center w-full gap-y-3 rounded-lg py-5 px-8 "
    >
      <div className="flex items-center gap-3 w-full">
        {isCheckout && crd.id && (
          <input
            className="w-[12px] h-[12px]"
            type="radio"
            checked={cardSelectedId === crd.id}
            onClick={() => {
              setCardSelectedId?.(crd.id);
            }}
            // onChange={() => setIsSelected(!isSelected)}
          />
        )}

        <div className=" min-w-[200px] flex flex-col justify-start items-start gap-1">
          <div className="w-full flex gap-2">
            <h3 className="font-bold">{crd.card_number}</h3>
            {status === "authenticated" && !isCheckout && (
              <div
                onClick={() => deleteCard()}
                className="cursor-pointer rounded-lg p-1 hover:bg-neutral-100 hover:text-red-500"
              >
                <TiTrash />
              </div>
            )}
          </div>
          <div className="flex gap-1">
            <p className="font-semibold">{crd.security_code},</p>
            <p className="font-semibold">{crd.due_date}</p>
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          setOpenEditCard(true);
          setDataEditCard(crd);
        }}
        className="cursor-pointer p-1 rounded-lg hover:bg-neutral-100"
      >
        <TiPencil />
      </div>
    </div>
  );
}

export default CardComponent;
