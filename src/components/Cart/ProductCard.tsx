import { useEffect, useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import { CartProduct } from '@/types/index';
import { PiTrashBold } from 'react-icons/pi';
import { setToPay } from '@/redux/features/toPaySlice';
import { setCart, deleteCartProduct } from '@/redux/features/cartSlice';
import { useAppSelector } from '@/redux/hooks';
import { useDispatch } from 'react-redux';
import axios from 'axios';

interface MyProps {
  cartProduct: CartProduct;
  refetch: any;
}

export default function ProductCard({ cartProduct, refetch }: MyProps) {
  const price = cartProduct.product.price;

  const [quantity, setquantity] = useState(cartProduct.quantity);
  // console.log('quantity ->', quantity);
  const [hoverDelete, setHoverDelete] = useState(false);
  const [finalValue, setFinalValue] = useState(price);

  const dispatch = useDispatch();
  const cart = useAppSelector((state) => state.cartSlice.cart);
  const toPay = useAppSelector((state) => state.toPaySlice.toPay);

  const didRun = useRef(false);

  useEffect(() => {
    dispatch(setToPay([...toPay, finalValue]));
    return () => {
      setquantity(cartProduct.quantity);
      // console.log('Quantity finished with ->', quantity);
    };
  }, []);

  const remove = async () => {
    await dispatch(deleteCartProduct(cartProduct.id) as any);

    dispatch(setCart(cart.filter((c) => c.id !== cartProduct.id)));
    // dispatch(subtractToPay(finalValue));
  };

  const updateCartProductQuantity = async (number: number) => {
    const response = await axios.put(
      `/api/cart/cartProduct/${cartProduct.id}`,
      {
        quantity: number,
      }
    );

    if (response.status === 200) {
      refetch();
    }
    // console.log('Back-end', response.data.quantity);
  };

  const handleQuantityChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const inputText = e.target.value;

    if (inputText === '') {
      setquantity(0);
    } else {
      const numberSelected = Number(inputText);
      setquantity(numberSelected);

      setTimeout(() => {
        updateCartProductQuantity(numberSelected);
      }, 700);
    }
  };

  const calculateFinalPrice = price * quantity;

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

      <td className='w-1/5'>
        <div className='border-1 rounded-md flex justify-between items-center px-1 -py-1'>
          <button
            className='text-lg font-normal text-gray-500'
            onClick={async () => {
              const subQuantity = quantity - 1;
              setquantity(subQuantity);
              updateCartProductQuantity(subQuantity);
              // dispatch(setToPay(price));
              setFinalValue(finalValue - price);
            }}
          >
            -
          </button>
          <input
            type='number'
            className='w-6 text-center font-semibold text-xs text-gray-800 inputSizeCart'
            value={quantity === 0 ? '' : quantity}
            onChange={handleQuantityChange}
          />

          <button
            className='text-lg font-normal text-gray-500'
            onClick={async () => {
              const sumQuantity = quantity + 1;
              setquantity(sumQuantity);
              updateCartProductQuantity(sumQuantity);
              dispatch(setToPay([...toPay, price]));
              setFinalValue(finalValue + price);
            }}
          >
            +
          </button>
        </div>
      </td>
      <td className='px-2 w-full '>
        <p className='text-sm font-medium'>
          ${calculateFinalPrice.toLocaleString()}
        </p>
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
