import { useGetCartByIdQuery } from '@/redux/api/cartApi';
import ProductCard from './ProductCard';
import { useAppSelector } from '@/redux/hooks';
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { setCart } from '@/redux/features/cartSlice';
import { motion } from 'framer-motion';
import { AiOutlineReload } from 'react-icons/ai';
import Link from 'next/link';
import { CartProduct, ProductCalculated } from '@/types';

interface CartDropDownProps {
  openCart: boolean;
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CartDropDown({
  openCart,
  setOpenCart,
}: CartDropDownProps) {
  const [prices, setPrices] = useState<ProductCalculated[]>([]);
  console.log('prices', prices);

  const dispatch = useDispatch();
  const cart = useAppSelector((state: any) => state.cartSlice.cart);

  const totalValue = prices.reduce(
    (total, product) => total + product.value,
    0
  );

  const { isLoading, data, refetch } = useGetCartByIdQuery({
    id: 1,
  });

  useEffect(() => {
    if ((data?.products.length ?? 0) > 0) {
      dispatch(setCart(data?.products));
    }
  }, [data?.products]);

  useEffect(() => {
    const newPrices = cart.map((cartProduct: CartProduct) => {
      for (let i = 0; i < cartProduct.quantity; i++) {
        const product = {
          id: cartProduct.id,
          value: cartProduct.product.price * cartProduct.quantity,
        };
        return product;
      }
    });
    setPrices(newPrices);
  }, [cart]);

  useEffect(() => {
    refetch();
  }, [openCart]);

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
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.1,
        delay: 0.1,
        ease: [0, 0.71, 0.2, 1.01],
      }}
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
                  {cart.map((cartProduct: CartProduct) => (
                    <ProductCard
                      refetch={refetch}
                      cartProduct={cartProduct}
                      key={cartProduct.id}
                      prices={[...prices]}
                      setPrices={setPrices}
                    />
                  ))}
                </tbody>
              </table>
              <div className='flex flex-col gap-2'>
                <div className='w-full flex justify-between '>
                  <p className='text-black text-sm'>Subtotal</p>
                  <p className='text-gray-600 text-xs'>
                    $
                    {isNaN(totalValue) || totalValue === 0
                      ? ''
                      : totalValue.toLocaleString()}
                  </p>
                </div>
                <div className='w-full flex justify-between '>
                  <p className='text-sm'>Total</p>
                  <p className='text-sm font-semibold'>
                    $
                    {isNaN(totalValue) || totalValue === 0
                      ? ''
                      : totalValue.toLocaleString()}
                  </p>
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
    </motion.div>
  );
}
