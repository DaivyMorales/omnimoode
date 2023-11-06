import { useGetCartByIdQuery } from '@/redux/api/cartApi';

export default function Checkout() {
  const { isLoading, data, error } = useGetCartByIdQuery({
    id: 1,
  });

  return (
    <div>
      <h1>checkout</h1>
    </div>
  );
}
