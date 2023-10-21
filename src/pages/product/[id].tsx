import { Product } from '@/types';
import { useRouter } from 'next/router';
// import {useAppSelector} from '@/redux/hooks'
// import {useAppDispach} from '@/redux/hooks'
import { useGetProductByIdQuery } from '@/redux/api/productApi';

export default function ProductPage() {
  const router = useRouter();

  const productId = {
    id: parseInt(router.query.id as string),
  };

  const { isLoading, isFetching, data, error } =
    useGetProductByIdQuery(productId);

  return (
    <div>
      <h3>{data?.name}</h3>
    </div>
  );
}
