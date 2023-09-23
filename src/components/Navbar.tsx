import React, { useState } from "react";
import Link from "next/link";
import { BsPerson } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiOutlineMenuAlt4, HiOutlineX } from "react-icons/hi";
import Image from "next/image";
import ListNavbar from "./ListNavbar";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <>
      <nav className="flex items-center justify-center gap-20 py-2 px-6 md:justify-between">
        <div className="background-logo-navbar"></div>
        <ol
          className={`text-black flex justify-center items-center gap-5 font-semibold ${
            open ? "hidden md:flex" : "flex md:hidden"
          }`}
        >
          <li className="cursor-pointer hover:text-gray-500">Nosotros</li>
          <li className="cursor-pointer hover:text-gray-500">Lo nuevo</li>
          <li className="cursor-pointer hover:text-gray-500">Colecciones</li>
        </ol>
        <div className="flex justify-between items-center gap-3">
          <BsPerson size={20} />
          <AiOutlineShoppingCart size={20} />
        </div>
      </nav>
      <ol
        className={`text-white bg-black flex justify-center items-center py-5 gap-5 font-semibold ${
          open ? "flex md:hidden" : "hidden md:flex"
        }`}
      >
        <li className="cursor-pointer hover:text-gray-500">Nosotros</li>
        <li className="cursor-pointer hover:text-gray-500">Lo nuevo</li>
        <li className="cursor-pointer hover:text-gray-500">Colecciones</li>
      </ol>
    </>
  );
}
