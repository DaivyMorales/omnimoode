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

  useEffect(() => {
    if (data?.products) {
      dispatch(setCart(data?.products));
    }
  }, [data?.products]);

  // console.log('data.products:', data?.products);
  console.log('cart', cart);

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
      className='absolute dropdown-cart shadow-lg flex flex-col justify-start items-start gap-2 bg-white rounded-md p-2 shadow-lg w-96 border-1'
    >
      <div className='w-full flex justify-between items-center'>
        <h3>
          Mi carrito <span className=' text-xs'>({cart.length})</span>
        </h3>
        <Link
          className='underline text-sky-400 text-sm font-semibold'
          href='/cartShop'
        >
          Ver todo
        </Link>
      </div>
      <div
        style={{ maxHeight: '430px', overflowY: 'auto'}}
        className='border-1 border-gray-100 rounded-md py-2 px-4 flex flex-wrap justify-center items-center gap-3 w-full'
      >
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
            {cart.map((cartProduct) => (
              <ProductCard cartProduct={cartProduct} key={cartProduct.id} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
