import React from 'react'
import { useRouter } from 'next/router'

export default function CategoryPage() {

    const router = useRouter();
    const { name } = router.query;

    return (
        <div>{name}</div>
    )
}
