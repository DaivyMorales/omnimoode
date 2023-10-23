import { useRouter } from 'next/router';
import Image from 'next/image';
import { useGetProductByIdQuery } from '@/redux/api/productApi';
import {
  PiScribbleLoopBold,
  PiShoppingBagOpenBold,
  PiHeartBold,
} from 'react-icons/pi';
import { useFormik } from 'formik';
import { useEffect } from 'react';

export default function ProductPage() {
  const router = useRouter();

  const productId = {
    id: parseInt(router.query.id as string),
  };

  const { isLoading, isFetching, data, error } =
    useGetProductByIdQuery(productId);

  const formik = useFormik({
    initialValues: {
      productId: undefined,
      sizeId: undefined,
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    formik.setFieldValue('productId', data?.id);
  }, [data]);

  return (
    <div className=' h-screen flex justify-center items-center'>
      <main className='grid grid-cols-2 gap-10 w-full h-full'>
        <section>
          <div className=' rounded-md '>
            {data?.imageUrl && (
              <Image
                src={data.imageUrl}
                width={1000}
                height={1000}
                alt='Product Image'
              />
            )}
          </div>
        </section>
        <section className='flex flex-col justify-center items-start p-3 gap-10 '>
          <form
            onSubmit={formik.handleSubmit}
            className='flex flex-col justify-center items-start gap-10 '
          >
            <section className='flex gap-2 justify-center items-center '>
              <div className='p-2 rounded-full bg-black'>
                <PiScribbleLoopBold color='white' />
              </div>
              <p className='font-bold'>Omnimoode</p>
            </section>
            <h2 className='font-bold text-2xl'>{data?.name}</h2>
            <h1 className='font-black'>${data?.price} COP</h1>
            <section className='w-full'>
              <label htmlFor=''>Seleccion tu talla:</label>
              <div className='grid grid-cols-6 gap-2'>
                {data?.sizes.map((size) => (
                  <div
                    key={size.id}
                    onClick={() => {
                      formik.setFieldValue('sizeId', size.id);
                    }}
                    className='border-1 py-1 px-2 flex justify-center items-center rounded-md border-gray-500 cursor-pointer'
                  >
                    <p className='text-sm font-semibold text-gray-500'>
                      {size.name.toUpperCase()}
                    </p>
                  </div>
                ))}
              </div>
            </section>
            <section className='flex gap-3 justify-center items-center'>
              <button
                className='bg-black text-white text-semibold w-64 py-3 h-12 rounded-lg text-sm flex justify-center items-center gap-2 dark:bg-white dark:text-black'
                type='submit'
              >
                <PiShoppingBagOpenBold size={16} />
                Agregar a el carrito
              </button>
              <button className='bg-gray-200 py-3 h-12 rounded-lg px-4'>
                <PiHeartBold />
              </button>
            </section>
          </form>
        </section>
      </main>
    </div>
  );
}
