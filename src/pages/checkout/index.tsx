import { useEffect, useState } from "react";
import Payment from "@/components/Checkout/Payment";
import Address from "@/components/Checkout/Address";
import Head from "next/head";
import Summary from "@/components/Checkout/Summary";
import { useSession } from "next-auth/react";
import ShippingOptions from "@/components/Checkout/ShippingOptions";
import { useGetAddressByIdQuery } from "@/redux/api/addressApi";
import {
  cardApi,
  useGetCardByIdQuery,
  useGetCardByUserIdQuery,
} from "@/redux/api/cardApi";
import axios from "axios";

export default function Checkout() {
  const [address, setAddress] = useState(false);
  const [payment, setPayment] = useState(false);
  const [finalPrice, setFinalPrice] = useState(0);
  const { data: session, status } = useSession();

  const [userCards, setUserCards] = useState([]);

  const userId = (session?.user as { id?: number })?.id ?? 0;

  const { data: dataAddress } = useGetCardByUserIdQuery({
    id: userId,
  });

  const { data: dataCard } = useGetCardByIdQuery({
    id: userId,
  });

  useEffect(() => {
    if (dataAddress && dataAddress.length > 0) {
      setAddress(true);
    }

    if (dataCard && dataCard.length > 0) {
      setPayment(true);
    }
  }, [dataAddress, dataCard]);

  const validateUserCards = async () => {
    const response = await axios.get(`/api/card/${userId}/null`);
    setUserCards(response.data);
  };

  useEffect(() => {
    if (userId) {
      validateUserCards();
    }
  }, [session]);

  return (
    <>
      {status === "unauthenticated" ? (
        <></>
      ) : (
        <main className="h-screen flex flex-col justify-center items-start px-3">
          <Head>
            <title>Checkout | Omnimoode</title>
          </Head>
          <h1>Checkout</h1>
          <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 px-6 lg:px-20  gap-6 w-full">
            <div className="px-6 flex flex-col gap-4  justify-center items-center">
              {!address ? (
                <Address setAddress={setAddress} />
              ) : userCards.length === 0 ? (
                <Payment setUserCards={setUserCards} userCards={userCards}/>
              ) : (
                <ShippingOptions
                  finalPrice={finalPrice}
                  setPayment={setPayment}
                  userCards={userCards}
                />
              )}

              {/* {!payment && <Payment />} */}
              {/* <ShippingOptions
                finalPrice={finalPrice}
                setPayment={setPayment}
                userCards={userCards}
              /> */}
            </div>
            <div>
              <Summary finalPrice={finalPrice} setFinalPrice={setFinalPrice} />
            </div>
            {/* <Address />
       <Summary /> */}
          </div>
        </main>
      )}
    </>
  );
}
