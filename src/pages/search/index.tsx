'use client';

import { Product } from '@/types';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import Image from 'next/image';
import { PiHeartBold } from 'react-icons/pi';
import { useRouter } from 'next/router';

const fetchProducts = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  return response.json();
};

export default function SearchPage() {
  const router = useRouter();

  const search = useSearchParams();
  const searchQuery = search ? search.get('q') : null;
  const encodedSearchQuery = encodeURI(searchQuery || '');

  const { data, isLoading } = useSWR(
    `/api/search?q=${encodedSearchQuery}`,
    fetchProducts
  );

  if (!data?.products) {
    return null;
  }

  return (
    <div className=' h-screen flex justify-center items-center flex-col'>
      <h3 className='underline'>Resultados: {data.products.length}</h3>
      {data.products.map((product: Product) => (
        <div
          className='  pb-2 rounded-lg flex justify-center items-center flex-col cursor-pointer'
          key={product.id}
          onClick={() => router.push(`/product/${product.id}`)}
        >
          <Image
            src={product?.imageUrl as string}
            alt='Product Image'
            width={250}
            height={250}
          />
          <div className='flex justify-center items-center gap-5 '>
            <div className=''>
              <h3>{product.name}</h3>
              <h4>${product.price}</h4>
            </div>

            <PiHeartBold />
          </div>
        </div>
      ))}
    </div>
  );
}
