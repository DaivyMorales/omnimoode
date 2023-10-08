import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { PiTShirtBold, PiPantsBold, PiCoatHangerBold } from 'react-icons/pi';
import { useAppDispach, useAppSelector } from '@/redux/hooks'
import { useGetCategoriesQuery } from '@/redux/api/cotegoryApi'
import CategoryCard from './Category/CategoryCard';


interface SearchBarProps {
  openSearch: boolean;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchBar({ openSearch, setOpenSearch }: SearchBarProps) {

  const dispatch = useAppDispach();

  const { isLoading, isFetching, data, error } = useGetCategoriesQuery(null);

  // if (isLoading || isFetching) return <h4>Cargando...</h4>;
  // if (error) return <h4>Hubo un error </h4>;

  return (
    <div
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
          {
            error ? (<div>Hubo un error</div>) : (
              data?.map((category) => (
                <CategoryCard category={category} key={category.id} />
              ))
            )
          }
        </div>
      </div>
    </div>
  );
}
