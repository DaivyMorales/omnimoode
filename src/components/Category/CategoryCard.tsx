import React from 'react'
import { Category } from '@/types'
import { PiTShirtBold, PiPantsBold, PiCoatHangerBold } from 'react-icons/pi';

interface CardProps {
    category: Category
}

const categoryIcons: { [key: string]: React.JSX.Element } = {
    "Shirts": <PiTShirtBold size={13} color="white" />,
    "Pants": <PiPantsBold size={13} color="white" />,
    "Hoddies": <PiCoatHangerBold size={13} color="white" />,
};

export default function CategoryCard({ category }: CardProps) {
    const icon = categoryIcons[category.name] || <div>Icono por defecto</div>;

    return (
        <div className='flex item-center justify-start gap-2 hover:bg-gray-200 cursor-pointer p-2 rounded-md'>
            <div className='p-1 rounded-md bg-black'>
                {icon}
            </div>
            <h4>{category.name}</h4>
        </div>
    )
}
