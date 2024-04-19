import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { TiTick } from "react-icons/ti";
import { CgSpinner } from "react-icons/cg";

function ProfileSection() {
  const { data: session, update } = useSession();

  const [userName, setUserName] = useState<string | undefined>("");
  const [nameIsUpdated, setNameIsUpdated] = useState(false);
  const [user, setUser] = useState<any>({} as any);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
  }, [session]);

  const profileSettings = async () => {
    setIsLoading(true);

    update({ ...user, name: userName });

    const body = {
      name: userName,
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

  return (
    <div className="flex flex-col gap-5 justify-start items-center bg-white border-1 w-full pt-5 rounded-lg sm:flex">
      {session?.user?.name && (
        <div className="flex gap-4 w-full justify-center items-center p-4">
          <label htmlFor="" className="">
            Nombre de usuario
          </label>
          <div className="inputLogin">
            <input
              id="email"
              name="email"
              type="email"
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
          ) : (
            isTyping ? "Guardar cambios" : "Guardar cambios"
          )}
          {/*          
          <div className="animate-spin">
                <CgSpinner size={17} />
              </div> */}
        </button>
      </div>
    </div>
  );
}

export default ProfileSection;
