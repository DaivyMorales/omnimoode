import React, { useEffect, useRef } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { PiTShirtBold, PiPantsBold, PiCoatHangerBold } from 'react-icons/pi';

interface SearchBarProps {
  openSearch: boolean;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchBar({ openSearch, setOpenSearch }: SearchBarProps) {
  const searchBarRef = useRef<HTMLDivElement>(null);

  // Cierra el SearchBar cuando se hace clic fuera de él


  return (
    <div
      ref={searchBarRef}
      className="absolute w-full h-full flex justify-center items-start"
      style={{ backdropFilter: 'blur(5px) brightness(80%)' }}
    >
      <div className="container sm:px-10 lg:px-30 xl:px-52 p-2 flex flex-col justify-center items-center md:mt-20 mt-5">
        <div className="w-full bg-white ring-1 ring-gray-200 rounded-t-md shadow-lg text-gray-400 px-3 py-2 flex justify-start items-center gap-3 cursor-pointer text-xl hover:ring-gray-300 hover:text-gray-500">
          <div>
            <AiOutlineSearch size={20} />
          </div>
          <input type="text" className="text-lg text-black" placeholder="¿Qué estas buscando?" />
        </div>
        <div className='bg-white ring-1 ring-gray-200 w-full rounded-b-md flex flex-col justify-start gap-y-1 p-3'>
          <h3 className='text-gray-600'>Categorias</h3>
          <div className=' flex item-center justify-start gap-2 hover:bg-gray-200 cursor-pointer p-2 rounded-md'>
            <div className='p-1 rounded-md bg-black'>
              <PiTShirtBold size={13} color="white" />
            </div>
            <h4>Camisas</h4>
          </div>
          <div className='flex item-center justify-start gap-2 hover:bg-gray-200 cursor-pointer p-2 rounded-md'>
            <div className='p-1 rounded-md bg-black'>
              <PiPantsBold size={13} color="white" />
            </div>
            <h4>Pants</h4>
          </div>
          <div className='flex item-center justify-start gap-2 hover:bg-gray-200 cursor-pointer p-2 rounded-md'>
            <div className='p-1 rounded-md bg-black'>
              <PiCoatHangerBold size={13} color="white" />
            </div>
            <h4>Hoddies</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
