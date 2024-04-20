import React from "react";
import { TiTick } from "react-icons/ti";

interface SuccessfulAlertProps {
  title: string;
  description?: string;
}

export default function SuccessfulAlert({
  title,
  description,
}: SuccessfulAlertProps) {
  return (
    <div className="bg-white flex justify-start items-center gap-2 p-1  w-full ">
      <div className="p-[1px] rounded-full bg-green-400">
      <TiTick />
      </div>
      <div className="flex flex-col gap-1 justify-start items-start">
        <p className="font-bold">{title}</p>
      </div>
    </div>
  );
}
