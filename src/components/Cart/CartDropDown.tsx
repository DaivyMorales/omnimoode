import { useGetCartByIdQuery } from '@/redux/api/cartApi';
import ProductCard from './ProductCard';
import { useAppSelector } from '@/redux/hooks';
import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { setCart } from '@/redux/features/cartSlice';
import { motion } from 'framer-motion';
import { AiOutlineReload } from 'react-icons/ai';
import Link from 'next/link';

interface CartDropDownProps {
  openCart: boolean;
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CartDropDown({
  openCart,
  setOpenCart,
}: CartDropDownProps) {
  const dispatch = useDispatch();
  const cart = useAppSelector((state) => state.cartSlice.cart);

  const { isLoading, data, error } = useGetCartByIdQuery({
    id: 1,
  });

  // console.log(data?.products.length ?? 0); // 1 or 0

  useEffect(() => {
    if ((data?.products.length ?? 0) > 0) {
      dispatch(setCart(data?.products));
    }
  }, [data?.products]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenCart(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div
      ref={dropdownRef}
      style={{ width: '500px' }}
      className='absolute dropdown-cart shadow-lg flex flex-col justify-start items-start gap-2 bg-white rounded-md p-2 shadow-md  border-1'
    >
      <div className='w-full flex justify-between items-center border-b-1 py-3'>
        <h3>
          Carrito <span className=' text-xs'>({cart.length})</span>
        </h3>
      </div>

      <div className=' rounded-md py-1 px-1 flex flex-wrap justify-center items-center gap-3 w-full'>
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
        ) : cart.length === 0 ? (
          <div>
            {' '}
            <h3 className='text-sm'>No has añadido ningun producto.</h3>
          </div>
        ) : (
          <>
            <div className='relative overflow-x-auto w-full flex flex-col gap-3 '>
              <table className='w-full text-sm flex flex-wrap '>
                <thead className='hidden  text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th scope='col' className=' py-3'>
                      image
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      description
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      number
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Price
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      delete
                    </th>
                  </tr>
                </thead>

                <tbody
                  className='border-b-1 w-full p-2 '
                  style={{ maxHeight: '300px', overflowY: 'auto' }}
                >
                  {cart.map((cartProduct) => (
                    <ProductCard
                      cartProduct={cartProduct}
                      key={cartProduct.id}
                    />
                  ))}
                </tbody>
              </table>
              <div className='flex flex-col gap-2'>
                <div className='w-full flex justify-between '>
                  <p className='text-black text-sm'>Subtotal</p>
                  <p className='text-gray-600 text-sm'>$110.000</p>
                </div>
                <div className='w-full flex justify-between '>
                  <p className='text-sm'>Total</p>
                  <p className='text-sm'>$110.000</p>
                </div>
                <Link
                  onClick={() => setOpenCart(false)}
                  href='/checkout'
                  className='w-full bg-black text-white text-semibold flex justify-center items-center  py-2 rounded-lg text-xs dark:bg-white dark:text-black'
                >
                  Proceder a checkout
                </Link>
                <button
                  onClick={() => setOpenCart(false)}
                  className='w-full bg-white border-1 text-semibold py-2 rounded-lg text-xs shadow-md dark:bg-white'
                >
                  Continuar comprando
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
