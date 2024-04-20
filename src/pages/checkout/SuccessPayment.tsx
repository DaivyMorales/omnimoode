import { HiCheckCircle } from "react-icons/hi";
import { useRouter } from "next/router";

export default function SuccessPayment() {

  const router = useRouter();

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <HiCheckCircle size={80} />
      <h1>Ok, tu paso ha sido exitoso!</h1>
      <button
        className="font-medium bg-black rounded-xl text-white px-6 py-2"
        onClick={() => router.push("/")}
      >
        Ir a omnimoode
      </button>
    </div>
  );
}
