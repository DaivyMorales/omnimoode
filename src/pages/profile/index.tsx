import { useSession } from "next-auth/react";
import { useOpen } from "@/store/OpenStore";
import ProfileSection from "@/components/Profile/ProfileSection";
import SecuritySection from "@/components/Profile/SecuritySection";
import InformationSection from "@/components/Profile/InformationSection";

export default function ProfilePage() {
  const { data: session } = useSession();

  const {
    setOpenPayment,
    setOpenAddress,
    setIdSectionProfile,
    idSectionProfile,
  } = useOpen();

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
