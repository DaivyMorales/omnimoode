import { useGetCartByIdQuery } from '@/redux/api/cartApi';
import ProductCard from './ProductCard';

interface CartDropDownProps {
  openCart: boolean;
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CartDropDown({
  openCart,
  setOpenCart,
}: CartDropDownProps) {
  const { isLoading, data, error } = useGetCartByIdQuery({
    id: 1,
  });

  console.log(data);

  return (
    <div className='absolute dropdown-cart shadow-lg flex flex-col justify-start items-start gap-2 bg-white rounded-md p-2 shadow-lg w-96 border-1'>
      <h3>
        Mi carrito <span className=' text-xs'>({data?.products.length})</span>
      </h3>
      <div className='border-1 rounded-md p-2 flex flex-col justify-center items-center gap-3 w-full'>
        {data?.products.map((cartProduct) => (
          <ProductCard cartProduct={cartProduct} key={cartProduct.product.id} />
        ))}
      </div>
    </div>
  );
}
