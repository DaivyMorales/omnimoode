import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useAppSelector } from "@/redux/hooks";
import { useAppDispach } from "@/redux/hooks";
import { generateNumber } from "@/redux/features/NumberValidationSlice";
import { HiTrash } from "react-icons/hi";
import { useGetAddressByIdQuery } from "@/redux/api/addressApi";
import { Address, Card } from "@/types";
import { TiUserOutline, TiTrash } from "react-icons/ti";
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

  const { setOpenPayment, setOpenAddress } = useOpen();

  useEffect(() => {
    refetch();
  }, [cards]);

  useEffect(() => {
    dispach(setAddresses(dataAddress));
    dispach(setCards(dataCard));
  }, [dataCard, dataAddress]);

  const formik = useFormik({
    initialValues: {
      profileImage: "",
    },
    onSubmit: async (values) => {
      if (values.profileImage) {
        const formData = new FormData();
        formData.append("imageUrl", values.profileImage);

        try {
          const responseUpload = await axios.post("/api/upload", formData);
          const urlObtained = responseUpload.data.imageUrl;
          console.log(responseUpload)

          const body = {
            image: urlObtained,
          };

          const responseUser = await axios.put(`/api/user/${userId}`, body);
          if (responseUser.status === 200) {
            setUrlProfileImageUploaded(true);

            await update({ ...user, image: urlObtained });
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
  });

  const deleteProfileImage = async () => {
    const body = {
      image: "",
    };
    await axios.put(`/api/user/${userId}`, body);
    // const responseImage = await axios.delete(`/api/upload/${userId}`, {
    //   imageId: ,
    // });
    await update({ ...user, image: "" });
  };

  const handleFileUpload = async (file: FileList) => {
    if (file.length > 0) {
      formik.submitForm();
      formik.setFieldValue("profileImage", file[0]);
      setProfileImageSelected(URL.createObjectURL(file[0]));
    }
  };

  const [user, setUser] = useState<any>({} as any);
  useEffect(() => {
    if (session && session.user) {
      setUser(session.user as any);
    }
  }, [session]);

  return (
    <div className="relative h-full py-24 w-full flex flex-col items-center justify-center -mt-20">
      <div className="flex flex-col gap-4 w-full p-10 justify-start items-start sm:w-[650px]">
        <div>
          <h1>{session?.user?.name}</h1>
          <p>Administra y protege tu cuenta</p>
        </div>

        <div className="w-full h-[1px] bg-neutral-200" />

        {/* MAIN INFORMATION */}
        <h3 className="font-bold text-xl">Foto de perfil</h3>
        <div className="flex gap-5 justify-start items-center bg-white border-1 w-full p-5 rounded-lg sm:flex">
          <div className="flex justify-center items-center gap-4">
            {session?.user?.image ? (
              <div className="rounded-full border-4 border-1 bg-gray-200">
                <img
                  src={session.user.image}
                  alt=""
                  className="w-[70px] h-[70px] rounded-full"
                />
              </div>
            ) : (
              <div className="rounded-full border-4 border-blue-500 bg-gray-200">
                <TiUserOutline size={70} />
              </div>
            )}
          </div>
          {/* <div className="rounded-full overflow-hidden">
            <img
              src={profileImageSelected}
              className="w-[50px] h-[50px] "
              alt=""
            />
          </div> */}

          <div className="flex flex-col items-start justify-start gap-3">
            {urlProfileImageUploaded && (
              <SuccessfulAlert
                title="Tu imagen ha sido cargada existosamente."
                description={`Te ves bien ${session?.user?.name}!`}
              />
            )}
            <div className="flex items-center justify-start gap-2">
              <label
                htmlFor="profile_picture"
                className="font-bold text-[12px] text-black bg-neutral-100 text-[#666666] px-[15px] py-[5px] rounded-md hover:bg-neutral-200 cursor-pointer"
              >
                Añadir Foto de Perfil
                <input
                  type="file"
                  id="profile_picture"
                  name="profile_picture"
                  accept="image/jpeg, image/png, image/gif"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    if (e.target.files) {
                      handleFileUpload(e.target.files);
                    }
                  }}
                />
              </label>
              {session?.user?.image && (
                <div
                  onClick={() => deleteProfileImage()}
                  className="cursor-pointer hover:text-red-500"
                >
                  <TiTrash />
                </div>
              )}
            </div>
            <p>Debe ser JPEG, PNG o GIF y no puede exceder los 10 MB.</p>
          </div>
        </div>

        <div className="flex flex-col justify-start items-start gap-2">
          <h3 className="font-bold text-xl">Configuracion de Perfil</h3>
          <p className="text-neutral-400">
            Cambiar los datos de identificación de su cuenta
          </p>
        </div>
        <ProfileSection />

        {/* ADDRESS INFORMATION */}
        <div className="flex flex-col  justify-center  items-center  w-full p-5 rounded-lg">
          <div className="flex flex-col justify-start items-start gap-4 w-full">
            <h3>Tus domicilios</h3>
            {addresses?.length > 0 ? (
              addresses?.map((address: Address) => (
                <div
                  key={address.id}
                  onMouseEnter={() => setOnHoverAddress(true)}
                  onMouseLeave={() => setOnHoverAddress(false)}
                  className="relative flex justify-between items-center w-full gap-y-3 border-1 rounded-lg p-3  hover:border-black"
                >
                  {onHoverAddress && (
                    <div
                      onClick={() => dispach(setShowAddress(true))}
                      className="-top-2 -right-2 absolute p-1 border-1 rounded-full bg-white border-black cursor-pointer"
                    >
                      <HiTrash />
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 w-96">
                    <div>
                      <label className="label-profile">Nombres</label>
                      <p className="font-semibold">{address.names}</p>
                    </div>
                    <div>
                      <label className="label-profile">Apellidos</label>
                      <p className="font-semibold">{address.names}</p>
                    </div>
                    <div>
                      <label className="label-profile">Dirección</label>
                      <p className="font-semibold">{address.address}</p>
                    </div>
                    <div>
                      <label className="label-profile">Estado</label>
                      <p className="font-semibold">{address.state}</p>
                    </div>
                    <div>
                      <label className="label-profile">Ciudad</label>
                      <p className="font-semibold">{address.city}</p>
                    </div>
                    <div>
                      <label className="label-profile">Telefono</label>
                      <p className="font-semibold">{address.phone}</p>
                    </div>
                  </div>
                  <button className=" text-[12px] bg-white border-1 text-[#666666] px-[6px] py-[5px] rounded-md">
                    Editar
                  </button>
                </div>
              ))
            ) : (
              <div>
                <h3 className="text-[13px] text-gray-400">
                  No tienes ningún domicilio aún
                </h3>
              </div>
            )}

            <div className="w-full  flex justify-end">
              <button
                onClick={() => {
                  setOpenAddress(true);
                }}
                type="submit"
                className="font-medium bg-black p-2 text-white px-[12px] text-[14px] rounded-md hover:bg-gray-900"
              >
                Añadir
              </button>
            </div>
          </div>
        </div>

        {/* CARDS INFORMATION */}
        <div className="flex flex-col  justify-center  items-center  w-full p-5 rounded-lg">
          <div className="flex flex-col justify-start items-start gap-4 w-full">
            <h3>Tus tarjetas</h3>
            {cards?.length > 0 ? (
              cards?.map((card: Card) => (
                <div
                  key={card.id}
                  onMouseEnter={() => setOnHoverCard(card.id)}
                  onMouseLeave={() => setOnHoverCard(0)}
                  className="relative flex justify-between items-center  w-full gap-y-3 border-1 rounded-lg p-3 hover:border-black"
                >
                  {onHoverCard === card.id && (
                    <div
                      onClick={() => {
                        dispach(setShowCard(card.id));
                      }}
                      className="-top-2 -right-2 absolute p-1 border-1 rounded-full bg-white border-black cursor-pointer"
                    >
                      <HiTrash />
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2  w-96">
                    <div>
                      <label className="label-profile">Número de tarjeta</label>
                      <p className="font-semibold">
                        {card.card_number
                          .replace(/.(?=.{4})/g, "*")
                          .replace(/\s/g, "")
                          .replace(/(.{4})/g, "$1")}
                      </p>
                    </div>
                    <div>
                      <label className="label-profile">Nombres</label>
                      <p className="font-semibold">{card.names}</p>
                    </div>
                    <div>
                      <label className="label-profile">Apellidos</label>
                      <p className="font-semibold">{card.surnames}</p>
                    </div>
                    <div>
                      <label className="label-profile">Cedula</label>
                      <p className="font-semibold">
                        {card.number_identification}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      dispach(setShowCardFormEdit(card.id));
                    }}
                    className=" text-[12px] bg-white border-1 text-[#666666] px-[6px] py-[5px] rounded-md"
                  >
                    Editar
                  </button>
                </div>
              ))
            ) : (
              <div>
                <h3 className="text-[13px] text-gray-400">
                  No tienes ningúna tarjeta aún
                </h3>
              </div>
            )}
            <div className="w-full  flex justify-end">
              <button
                onClick={() => {
                  setOpenPayment(true);
                }}
                type="submit"
                className="font-medium bg-black p-2 text-white px-[12px] text-[14px] rounded-md hover:bg-gray-900"
              >
                Añadir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
