import React, { useState, useEffect } from "react";
import { BsPerson } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "./ProfileDropDown";

interface MyProps {
  children: React.ReactNode;
}

export default function Navbar({ children }: MyProps) {
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  console.log(openProfile);
  const toggleMenu = () => {
    setOpen(!open);
  };

  // useEffect(() => {
  //   const cambiarEstado = () => setopenProfile(!openProfile);
  //   window.addEventListener('click', cambiarEstado);

  //   // Limpiar el evento al desmontar el componente
  //   return () => window.removeEventListener('click', cambiarEstado);
  // }, [openProfile]);

  return (
    <div>
      <nav className="flex items-center justify-center gap-20 py-2 px-6 md:justify-between">
        <div className="background-logo-navbar"></div>
        <ol
          className={`text-black flex justify-center items-center gap-5 font-semibold ${
            open ? "flex md:hidden" : "hidden md:flex"
          }`}
        >
          <li className="cursor-pointer hover:text-gray-500">Nosotros</li>
          <li className="cursor-pointer hover:text-gray-500">Lo nuevo</li>
          <li className="cursor-pointer hover:text-gray-500">Colecciones</li>
        </ol>
        <div className="flex justify-between items-center gap-3">
          <div
            className="relative cursor-pointer"
            onClick={() => {
              setOpenProfile(!openProfile);
            }}
          >
            <BsPerson size={20} />
          </div>
          {openProfile && <ProfileDropDown />}
          <AiOutlineShoppingCart size={20} />
        </div>
      </nav>
      <ol
        className={`text-white bg-black flex justify-center items-center py-5 gap-5 font-semibold ${
          open ? "hidden md:flex" : "flex md:hidden"
        }`}
      >
        <li className="cursor-pointer hover:text-gray-500">Nosotros</li>
        <li className="cursor-pointer hover:text-gray-500">Lo nuevo</li>
        <li className="cursor-pointer hover:text-gray-500">Colecciones</li>
      </ol>
      {children}
    </div>
  );
}
