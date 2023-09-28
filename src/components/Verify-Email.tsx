import React from "react";

interface VerifyEmailProps {
  name: string;
  number: any;
}

export const VerifyEmail: React.FC<VerifyEmailProps> = ({ name, number }) => {
  return (
    <div className=" flex justify-center items-start px-9 flex-col py-2">
      <div className=" w-full">
        <div className="background-logo-email"></div>
      </div>
      <h1>Hola, {name}!</h1>
      <p></p>
      <p>Tu código: <span className="font-bold"> {number}</span></p>
    </div>
  );
};
