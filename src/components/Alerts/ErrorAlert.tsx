import React from "react";
import { TiTimes } from "react-icons/ti";

interface ErrorAlertProps {
  title: string;
  description?: string;
}

export default function ErrorAlert({ title, description }: ErrorAlertProps) {
  return (
    <div className="bg-white flex justify-start items-start gap-2 p-1 w-full border-b-[4px] border-[1px] border-b-red-500 rounded-[8px] p-2">
      <div className="p-[1px] rounded-full bg-red-500">
        <TiTimes color="white"/>
      </div>
      <div className="flex flex-col gap-1 justify-start items-start">
        <p className="font-bold">{title}</p>
        <p className="text-[10px] font-semibold">{description}</p>
      </div>
    </div>
  );
}
