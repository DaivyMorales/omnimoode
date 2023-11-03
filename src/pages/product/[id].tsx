import { useRouter } from 'next/router';
import Image from 'next/image';
import { useGetProductByIdQuery } from '@/redux/api/productApi';
import {
  PiScribbleLoopBold,
  PiShoppingBagOpenBold,
  PiHeartBold,
} from 'react-icons/pi';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { createCartProduct, setCart } from '@/redux/features/cartSlice';
import { setSendProduct } from '@/redux/features/toPaySlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/redux/hooks';
import { motion } from 'framer-motion';
import { AiOutlineReload } from 'react-icons/ai';

export default function ProductPage() {
  const [sizeSelected, setSizeSelected] = useState(0);
  const [submited, setSubmited] = useState(false);

  const router = useRouter();

  const cart = useAppSelector((state) => state.cartSlice.cart);

  const dispatch = useDispatch();

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
      dispatch(setSendProduct(true));
      const newCartProduct = {
        cartId: 1,
        productId: values.productId,
        sizeId: values.sizeId,
        quantity: 1,
      };

      setSubmited(true);
      const response = await dispatch(createCartProduct(newCartProduct) as any);

      // console.log('response.payload', response.payload);

      dispatch(setCart([...cart, response.payload]));

      if (response.payload) {
        formik.setFieldValue('sizeId', undefined);
        dispatch(setSendProduct(false));
      }
      setSubmited(false);
    },
  });

  // console.log(formik.values);

  useEffect(() => {
    formik.setFieldValue('productId', data?.id);
  }, [data]);

  return (
    <div className=' h-screen flex justify-center items-center'>
      {!data ? (
        <motion.div
          style={{
            display: 'inline-block',
          }}
          animate={{ rotate: '360deg' }}
          transition={{
            duration: 0.7,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          <AiOutlineReload size={20} color='black' />
        </motion.div>
      ) : (
        <main className='grid grid-cols-1 gap-10 w-full h-full sm:grid-cols-2'>
          <section>
            <div className=' rounded-md '>
              {data?.imageUrl && (
                <Image
                  src={data.imageUrl}
                  width={500}
                  height={500}
                  priority
                  alt='Product Image'
                />
              )}
            </div>
          </section>
          <section className='flex flex-col justify-center items-center p-3 gap-10 sm:items-start'>
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
                        setSizeSelected(size.id);
                      }}
                      className={`${
                        sizeSelected === size.id
                          ? 'border-black text-black font-bold'
                          : 'border-gray-400 text-gray-400'
                      } border-1 py-1 px-2 flex justify-center items-center rounded-md  cursor-pointer`}
                    >
                      <p className='text-sm font-semibold '>
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
                  {submited ? (
                    <>
                      <motion.div
                        style={{
                          display: 'inline-block',
                        }}
                        animate={{ rotate: '360deg' }}
                        transition={{
                          duration: 0.7,
                          ease: 'linear',
                          repeat: Infinity,
                        }}
                      >
                        <AiOutlineReload size={22} />
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <PiShoppingBagOpenBold size={16} />
                      Agregar a carrito
                    </>
                  )}
                </button>
                <button className='bg-gray-200 py-3 h-12 rounded-lg px-4 '>
                  <PiHeartBold />
                </button>
              </section>
            </form>
          </section>
        </main>
      )}
    </div>
  );
}
