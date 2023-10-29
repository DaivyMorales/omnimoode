import { useState } from 'react';
import Image from 'next/image';
import { CartProduct } from '@/types/index';
import { PiTrashBold } from 'react-icons/pi';
import axios from 'axios';
import { setCart, deleteCartProduct } from '@/redux/features/cartSlice';
import { useAppSelector } from '@/redux/hooks';
import { useDispatch } from 'react-redux';

interface MyProps {
  cartProduct: CartProduct;
}

export default function ProductCard({ cartProduct }: MyProps) {
  const [quantity, setquantity] = useState(1);
  const [hoverDelete, setHoverDelete] = useState(false);

  const dispatch = useDispatch();
  const cart = useAppSelector((state) => state.cartSlice.cart);

  const remove = async () => {
    await dispatch(deleteCartProduct(cartProduct.id) as any);

    dispatch(setCart(cart.filter((c) => c.id !== cartProduct.id)));
  };

  const handleQuantityChange = (e: any) => {
    e.preventDefault();
    setquantity(e.target.value);
  };

  return (
    <tr className=' w-full'>
      <td className='w-1/5 '>
        <Image
          src={cartProduct.product.imageUrl}
          width={50}
          height={50}
          alt='Product Image'
          style={{ width: 'auto', height: 'auto' }}
          className='border-1 rounded-md'
        />
      </td>
      <td className='w-2/5 '>
        <p className='text-sm font-medium'>{cartProduct.product.name}</p>
        <p className='text-gray-600'>
          Hoddie <span className='text-gray-300'>|</span> Blanco{' '}
          <span className='text-gray-300'>| </span>
          {cartProduct.size.name.toUpperCase()}{' '}
        </p>
      </td>

      <td className='w-1/5 '>
        <div className='border-1 rounded-md flex justify-between items-center px-1 -py-1'>
          <button
            className='text-lg font-normal text-gray-500'
            onClick={() => setquantity(quantity - 1)}
          >
            -
          </button>
          <input
            type='number'
            className='w-6 text-center font-semibold text-xs text-gray-800 inputSizeCart'
            value={quantity}
            onChange={handleQuantityChange}
          />
          <button
            className='text-lg font-normal text-gray-500'
            onClick={() => setquantity(quantity + 1)}
          >
            +
          </button>
        </div>
      </td>
      <td className='px-2 w-full '>
        <p className='text-sm font-medium'>${cartProduct.product.price}</p>
      </td>
      <td className='w-full '>
        <div
          onMouseEnter={() => setHoverDelete(true)}
          onMouseLeave={() => setHoverDelete(false)}
          onClick={async () => remove()}
          className='flex justify-end cursor-pointer'
        >
          <PiTrashBold
            size={17}
            color={`${hoverDelete ? '#ef4444' : '#9ca3af'}`}
          />
        </div>
      </td>
    </tr>
  );
}
