import { PiShoppingBagOpenBold } from 'react-icons/pi';
import { useAppSelector } from '@/redux/hooks';

interface CartIconProps {
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenProfile: React.Dispatch<React.SetStateAction<boolean>>;
  colorMode: any;
  openCart: boolean;
}

export default function CartIcon({
  setOpenCart,
  setOpenProfile,
  colorMode,
  openCart,
}: CartIconProps) {
  const cart = useAppSelector((state) => state.cartSlice.cart);

  return (
    <div
      className='relative inline-block cursor-pointer'
      onClick={(event) => {
        event.stopPropagation();
        setOpenCart(!openCart);
        setOpenProfile(false);
      }}
    >
      <PiShoppingBagOpenBold
        size={20}
        color={`${colorMode === 'dark' ? 'white' : 'black'}`}
      />
      {cart.length > 0 && <span className='cart-number'>{cart.length}</span>}
    </div>
  );
}
