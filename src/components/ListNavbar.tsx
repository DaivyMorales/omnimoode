import React from "react";

export default function ListNavbar() {
  return (
    <div className="absolute w-full h-full bg-black p-10 flex flex-col justify-start items-start">
      <ol className="text-white flex flex-col justify-center items-center py-5 gap-5 font-semibold">
        <li className="cursor-pointer hover:text-gray-500">Nosotros</li>
        <li className="cursor-pointer hover:text-gray-500">Lo nuevo</li>
        <li className="cursor-pointer hover:text-gray-500">Colecciones</li>
      </ol>
    </div>
  );
}
