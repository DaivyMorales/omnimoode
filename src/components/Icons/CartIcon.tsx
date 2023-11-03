import { PiShoppingBagOpenBold } from 'react-icons/pi';

interface CartIconProps {
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenProfile: React.Dispatch<React.SetStateAction<boolean>>;
  colorMode: any;
  openCart: boolean;
  itemsQuantity: number;
  setItemsQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export default function CartIcon({
  setOpenCart,
  setOpenProfile,
  colorMode,
  openCart,
  itemsQuantity,
  setItemsQuantity,
}: CartIconProps) {
  return (
    <div
      className='relative inline-block cursor-pointer'
      onClick={() => {
        setOpenCart(!openCart);
        setOpenProfile(!setOpenProfile);
      }}
    >
      <PiShoppingBagOpenBold
        size={20}
        color={`${colorMode === 'dark' ? 'white' : 'black'}`}
      />
      {itemsQuantity > 0 && (
        <span className='cart-number'>{itemsQuantity}</span>
      )}
    </div>
  );
}
