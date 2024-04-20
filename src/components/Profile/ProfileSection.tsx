import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { TiTick, TiTrash, TiUserOutline } from "react-icons/ti";
import { CgSpinner } from "react-icons/cg";
import { useFormik } from "formik";
import SuccessfulAlert from "../Alerts/SuccessfulAlert";

function ProfileSection() {
  const { data: session, update } = useSession();

  const [userName, setUserName] = useState<string | undefined>("");
  const [userEmail, setUserEmail] = useState("");
  const [nameIsUpdated, setNameIsUpdated] = useState(false);
  const [user, setUser] = useState<any>({} as any);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileImageSelected, setProfileImageSelected] = useState("");
  const [urlProfileImageUploaded, setUrlProfileImageUploaded] = useState(false);

  useEffect(() => {
    if (session && session.user) {
      setUser(session.user as any);
    }
  }, [session]);

  const userId = (session?.user as { id?: number })?.id ?? 0;

  useEffect(() => {
    if (session?.user?.name) {
      setUserName(session?.user?.name);
    }

    if (session?.user?.email) {
      setUserEmail(session?.user?.email);
    }
  }, [session]);

  const profileSettings = async () => {
    setIsLoading(true);

    update({ ...user, name: userName, email: userEmail });

    const body = {
      name: userName,
      email: userEmail,
    };

    const response = await axios.put(`/api/user/${userId}`, body);
    if (response.status === 200) {
      setNameIsUpdated(true);
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isTyping) {
      setNameIsUpdated(false);
    }
  }, [isTyping]);

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
          console.log(responseUpload);

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

  return (
    <div className="flex flex-col gap-6">
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
                className="cursor-pointer rounded-lg p-1 hover:bg-neutral-100 hover:text-red-500"
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
      <div className="flex flex-col gap-5 justify-start items-center bg-white border-1 w-full pt-5 rounded-lg sm:flex">
        {session?.user?.name && (
          <div className="grid grid-cols-4 gap-4 w-full  py-4 px-10">
            <label htmlFor="" className=" flex justify-start items-center">
              Nombre de usuario
            </label>
            <div className="inputLogin col-span-3">
              <input
                id="email"
                name="email"
                type="text"
                className="text-xs"
                onChange={(e) => {
                  setUserName(e.target.value);
                  setIsTyping(true);
                }}
                value={userName}
              />
            </div>
          </div>
        )}

        
        <div className="w-full flex justify-end bg-neutral-200 py-4 px-4">
          <button
            onClick={() => profileSettings()}
            className={`${
              nameIsUpdated
                ? userName && "bg-green-500 text-black hover:bg-green-600"
                : "bg-black text-white"
            } text-xs font-bold rounded-[6px] min-w-[130px] px-3 py-2 flex justify-center`}
          >
            {nameIsUpdated ? (
              <TiTick size={17} />
            ) : isLoading ? (
              <div className="animate-spin">
                <CgSpinner size={17} />
              </div>
            ) : isTyping ? (
              "Guardar cambios"
            ) : (
              "Guardar cambios"
            )}
            {/*          
          <div className="animate-spin">
                <CgSpinner size={17} />
              </div> */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileSection;
