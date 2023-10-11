import React from 'react'
import { useRouter } from 'next/router'
import { useGetCategoryByIdQuery } from '@/redux/api/cotegoryApi'
import { useAppDispach } from '@/redux/hooks'


export default function CategoryPage() {

    const dispatch = useAppDispach();


    const router = useRouter();
    const { id } = router.query;

    const idNumber = {
        id: parseInt(id as string)
    }

    const { isLoading, isFetching, data, error } = useGetCategoryByIdQuery(idNumber);

    return (
        <>
            <div>{data?.name} {data?.id}</div>
            <div>{data?.product.map((product) => (<p>{product.name}</p>))}</div>
        </>
    )
}
