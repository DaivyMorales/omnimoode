import React, { useRef, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useGetCategoriesQuery } from '@/redux/api/cotegoryApi';
import CategoryCard from './Category/CategoryCard';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
import { HiChevronRight } from 'react-icons/hi';

interface SearchBarProps {
  openSearch: boolean;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

type DataFilteredType = {
  products: Product[];
};

export default function SearchBar({
  openSearch,
  setOpenSearch,
}: SearchBarProps) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [dataFiltered, setDataFiltered] = useState<DataFilteredType>();

  const { data, error } = useGetCategoriesQuery(null);
  //CLOSE SEARCH BAR
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('Run!');
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpenSearch(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [containerRef]);

  //ON SUBMIT
  const onSearch = async (event: any) => {
    event.preventDefault();
    const data = {
      name: event.target.value,
    };

    const response = await axios.post('/api/filter', {
      name: searchQuery,
    });

    setDataFiltered(response.data);

    console.log(response);
  };

  //SEARCH PRODUCT

  return (
    <div
      ref={containerRef}
      className='fixed z-50 w-full h-full flex justify-center items-start'
      style={{ background: 'rgba(255, 255, 255, 0.8)' }}
    >
      <div className='opacity-100 fixed w-[390px] sm:w-[640px] p-2 flex gap-2 justify-center items-start md:mt-10 mt-5'>
        <div className='w-full'>
          <div className='w-full bg-white ring-1 ring-gray-200 rounded-t-[12px] shadow-lg text-gray-400 px-3 py-2 flex  items-center gap-3 cursor-pointer text-xl hover:ring-gray-300 hover:text-gray-500'>
            <div>
              <AiOutlineSearch size={20} />
            </div>
            <form onSubmit={onSearch}>
              <input
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                }}
                type='text'
                className='text-lg text-black  w-[800px]'
                placeholder='¿Qué estas buscando?'
              />
            </form>
          </div>
          {dataFiltered?.products && (
            <div className='bg-white w-full flex flex-col justify-start gap-y-1 p-3 border-1'>
              <div className=' w-full'>
                <h3 className='text-gray-600'>Resultados</h3>

                <div
                  className='grid grid-cols-1 gap-2'
                  style={{ maxHeight: '300px', overflowY: 'auto' }}
                >
                  {dataFiltered.products.map((product: Product) => (
                    <Link
                      href={`/product/${product.id}`}
                      onClick={() => setOpenSearch(false)}
                      className='flex  w-full rounded-md items-center justify-between  hover:bg-gray-100 cursor-pointer'
                    >
                      <div className='flex gap-2'>
                        <Image
                          src={product?.imageUrl as string}
                          alt='Product Image'
                          width={50}
                          height={50}
                          priority={true}
                        />
                        <div className='flex flex-col gap-2'>
                          <p className='font-semibold text-sm'>
                            {product.name}
                          </p>
                          <p>${product.price}</p>
                        </div>
                      </div>
                      <HiChevronRight />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className='bg-white ring-1 ring-gray-200 w-full rounded-b-[12px] flex flex-col justify-start gap-y-1 p-3'>
            <h3 className='text-gray-600'>Categorias</h3>
            {error ? (
              <div>Hubo un error</div>
            ) : (
              data?.map((category) => (
                <CategoryCard
                  category={category}
                  key={category.id}
                  setOpenSearch={setOpenSearch}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
