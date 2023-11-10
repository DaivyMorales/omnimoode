import { useGetCartByIdQuery } from '@/redux/api/cartApi';
import { setPriceFinal } from '@/redux/features/priceFinalSlice';
import { useAppSelector } from '@/redux/hooks';

export default function Checkout() {
  const { isLoading, data, error } = useGetCartByIdQuery({
    id: 1,
  });

  const priceFinal = useAppSelector(
    (state) => state.priceFinalSlice.priceFinal
  );

  return (
    <div>
      <h1>{priceFinal}</h1>
    </div>
  );
}
