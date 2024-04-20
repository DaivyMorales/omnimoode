import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useAppSelector } from "@/redux/hooks";
import { useAppDispach } from "@/redux/hooks";
import { generateNumber } from "@/redux/features/NumberValidationSlice";
import { HiTrash } from "react-icons/hi";
import { useGetAddressByIdQuery } from "@/redux/api/addressApi";
import { Address, Card } from "@/types";
import { useGetCardByUserIdQuery } from "@/redux/api/cardApi";
import {
  setShowAddress,
  setShowCard,
  setShowCardFormEdit,
} from "@/redux/features/showAlertsSlice";
import { setAddresses } from "@/redux/features/addressSlice";
import { setCards } from "@/redux/features/cardSlice";
import { useOpen } from "@/store/OpenStore";
import { useFormik } from "formik";
import SuccessfulAlert from "@/components/Alerts/SuccessfulAlert";
import ProfileSection from "@/components/Profile/ProfileSection";
import SeguritySection from "@/components/Profile/SecuritySection";
import SecuritySection from "@/components/Profile/SecuritySection";
import InformationSection from "@/components/Profile/InformationSection";

export default function ProfilePage() {
  const { data: session, update } = useSession();

  const [onHoverAddress, setOnHoverAddress] = useState(false);
  const [onHoverCard, setOnHoverCard] = useState(0);
  const [profileImageSelected, setProfileImageSelected] = useState("");
  const [urlProfileImageUploaded, setUrlProfileImageUploaded] = useState(false);

  const addresses = useAppSelector((state) => state.addressSlice.addresses);
  const cards = useAppSelector((state) => state.cardSlice.cards);

  const dispach = useAppDispach();

  const userId = (session?.user as { id?: number })?.id ?? 0;

  const { data: dataAddress } = useGetAddressByIdQuery({
    id: userId,
  });

  const { data: dataCard, refetch } = useGetCardByUserIdQuery({
    id: userId,
  });

  const {
    setOpenPayment,
    setOpenAddress,
    setIdSectionProfile,
    idSectionProfile,
  } = useOpen();

  useEffect(() => {
    refetch();
  }, [cards]);

  useEffect(() => {
    dispach(setAddresses(dataAddress));
    dispach(setCards(dataCard));
  }, [dataCard, dataAddress]);

  return (
    <div className="relative h-full py-24 w-full flex flex-col items-center justify-center -mt-20">
      <div className="flex flex-col gap-4 w-full p-10 justify-start items-start sm:w-[650px]">
        <div>
          <h1>{session?.user?.name}</h1>
          <p>Administra y protege tu cuenta</p>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex gap-3  w-full">
            <div
              onClick={() => setIdSectionProfile("1")}
              className={`${
                idSectionProfile === "1"
                  ? "border-b-2 text-black"
                  : "text-neutral-400"
              } section-profile-settings`}
            >
              <p className="p-nav">Perfil</p>
            </div>
            <div
              onClick={() => setIdSectionProfile("2")}
              className={`${
                idSectionProfile === "2"
                  ? "border-b-2 text-black"
                  : "text-neutral-400"
              } section-profile-settings`}
            >
              <p className="p-nav">Seguridad</p>
            </div>
            <div
              onClick={() => setIdSectionProfile("3")}
              className={`${
                idSectionProfile === "3"
                  ? "border-b-2 text-black"
                  : "text-neutral-400"
              } section-profile-settings`}
            >
              <p className="p-nav">Información</p>
            </div>
          </div>
          <div className="w-full h-[1px] bg-neutral-200" />
        </div>

        {idSectionProfile === "1" ? (
          <ProfileSection />
        ) : idSectionProfile === "2" ? (
          <SecuritySection />
        ) : (
          <InformationSection />
        )}
      </div>
    </div>
  );
}
