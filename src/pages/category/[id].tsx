import React from 'react';
import { useRouter } from 'next/router';
import { useGetCategoryByIdQuery } from '@/redux/api/cotegoryApi';
import { useAppDispach } from '@/redux/hooks';
import Image from 'next/image';
import { PiHeartBold } from 'react-icons/pi';

export default function CategoryPage() {
  const dispatch = useAppDispach();

  const router = useRouter();
  const { id } = router.query;

  const idNumber = {
    id: parseInt(id as string),
  };

  const { isLoading, isFetching, data, error } =
    useGetCategoryByIdQuery(idNumber);

  return (
    <section className='flex flex-col justify-center items-center mt-10'>
        
        <h1>{data?.name}</h1>
      <div className=' grid grid-cols-2 gap-x-2 md:grid-cols-4'>
        {data?.product.map((product) => (
          <div
            key={product.id}
            className='cursor-pointer py-6'
            onClick={() => router.push(`/product/${product.id}`)}
          >
            <div className='relative'>
              <button className='absolute top-3 left-3 border-black border-1 text-white p-2 rounded-lg'>
                <PiHeartBold color='black' />
              </button>
              <Image
                src={product.imageUrl}
                alt='product image'
                width={400}
                height={50}
                priority={true}
              />
            </div>
            {product.name}
            <p className='font-bold'>${product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
