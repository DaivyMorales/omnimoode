import { useState } from 'react';
import Image from 'next/image';
import { CartProduct } from '@/types/index';
import { PiTrashBold } from 'react-icons/pi';
import axios from 'axios';

interface MyProps {
  cartProduct: CartProduct;
}

export default function ProductCard({ cartProduct }: MyProps) {
  const [quantity, setquantity] = useState(0);

  const deleteCartProduct = async () => {
    const response = await axios.delete('/api/cart/cartProduct', {
      data: {
        cartId: cartProduct.cartId,
        productId: cartProduct.productId,
        sizeId: cartProduct.sizeId,
      },
    });
    console.log(response);
  };


  return (
    <div className='flex flex-col justify-start items-start py-3 w-full gap-3 border-b-2 border-gray-100'>
      <div
        key={cartProduct.product.id}
        className='flex justify-start items-start py-3 w-full gap-5'
      >
        <Image
          src={cartProduct.product.imageUrl}
          width={75}
          height={75}
          alt='Product Image'
        />
        <div className='flex flex-col gap-y-2 justify-start items-start w-full'>
          <p className='text-gray-600'>Hoddie</p>
          <p className='text-sm font-medium'>{cartProduct.product.name}</p>
          <div className='flex gap-2 '>
            <p className='text-gray-600 text-xs'>
              Talla:{' '}
              <span className='text-xs font-medium text-black'>
                {' '}
                {cartProduct.size.name.toUpperCase()}
              </span>
            </p>
            <p className='text-gray-600 text-xs'>
              Color:{' '}
              <span className='text-xs font-medium text-black'>Blanco</span>
            </p>
          </div>
          <div className='flex w-full items-end justify-between pt-2'>
            <div className=' flex gap-1 justify-center items-center '>
              <button
                className='px-2 text-sm border-1 rounded-md font-medium'
                onClick={() => setquantity(quantity - 1)}
              >
                -
              </button>
              <input
                type='number'
                className='border-1 rounded-md w-8 text-center'
                value={quantity}
              />
              <button
                className='px-2 text-sm border-1 rounded-md font-medium'
                onClick={() => setquantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <p className='text-sm font-bold'>$ {cartProduct.product.price}</p>
          </div>
        </div>
      </div>
      <div
        onClick={() => deleteCartProduct()}
        className='w-full flex justify-end cursor-pointer'
      >
        <PiTrashBold color='#9ca3af' />
      </div>
    </div>
  );
}
