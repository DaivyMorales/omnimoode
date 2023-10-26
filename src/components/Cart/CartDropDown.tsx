import { useGetCartByIdQuery } from '@/redux/api/cartApi';
import ProductCard from './ProductCard';
import { useAppSelector } from '@/redux/hooks';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setCart } from '@/redux/features/cartSlice';

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

  return (
    <div className='absolute dropdown-cart shadow-lg flex flex-col justify-start items-start gap-2 bg-white rounded-md p-2 shadow-lg w-96 border-1'>
      <h3>
        Mi carrito <span className=' text-xs'>({cart.length})</span>
      </h3>
      <div className='border-1 rounded-md p-2 flex flex-col justify-center items-center gap-3 w-full'>
        {cart.map((cartProduct) => (
          <ProductCard cartProduct={cartProduct} key={cartProduct.product.id}  />
        ))}
      </div>
    </div>
  );
}
