'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useAppSelector } from '@/redux/hooks';
import { useAppDispach } from '@/redux/hooks';
import { generateNumber } from '@/redux/features/NumberValidationSlice';
import { HiBadgeCheck, HiSupport, HiTrash } from 'react-icons/hi';
import { useGetAddressByIdQuery } from '@/redux/api/addressApi';
import { Address, Card } from '@/types';
import { useGetCardByIdQuery } from '@/redux/api/cardApi';
import { setShowAlertAddress } from '@/redux/features/showAlertAddressSlice';
import { setAddresses } from '@/redux/features/addressSlice';

export default function ProfilePage() {
  const { data: session } = useSession();

  const [onHoverAddress, setOnHoverAddress] = useState(false);
  const [onHoverCard, setOnHoverCard] = useState(false);

  const addresses = useAppSelector((state) => state.addressSlice.addresses);
  const [cards, setCards] = useState<any>([]);

  const dispach = useAppDispach();

  const userId = (session?.user as { id?: number })?.id ?? 0;

  const { data: dataAddress } = useGetAddressByIdQuery({
    id: userId,
  });

  const { data: dataCard } = useGetCardByIdQuery({
    id: userId,
  });

  useEffect(() => {
    if (dataAddress && dataCard) {
      dispach(setAddresses(dataAddress));
      setCards(dataCard);
    }
  }, [dataCard, dataAddress]);

  return (
    <div className='relative h-full py-24 w-full flex flex-col items-center justify-center -mt-20'>
      <div className='flex flex-col gap-4 w-[650px] justify-start items-start'>
        <div>
          <h1>Mi perfil</h1>
          <p>Administra y protege tu cuenta</p>
        </div>

        {/* MAIN INFORMATION */}
        <div className='flex  justify-between items-center border-1 w-full p-5 rounded-lg'>
          <div className='flex justify-center items-center gap-4 '>
            <div className='p-2 rounded-full border-4 border-blue-500 bg-gray-200'>
              <HiSupport size={50} />
            </div>
            <div className=''>
              <div className='flex items-center gap-1'>
                <h3>{session?.user?.name}</h3>

                {session?.user?.email_verification && <HiBadgeCheck />}
              </div>
              <h4 className='text-gray-500'>{session?.user?.email}</h4>
            </div>
          </div>
          <button className=' text-[12px] bg-white border-1 text-[#666666] px-[6px] py-[5px] rounded-md'>
            Editar
          </button>
        </div>

        {/* ADDRESS INFORMATION */}
        <div className='flex flex-col  justify-center  items-center border-1 w-full p-5 rounded-lg'>
          <div className='flex flex-col justify-start items-start gap-4 w-full'>
            <h3>Tus domicilios</h3>
            {addresses > 0 ? (
              addresses?.map((address: Address) => (
                <div
                  key={address.id}
                  onMouseEnter={() => setOnHoverAddress(true)}
                  onMouseLeave={() => setOnHoverAddress(false)}
                  className='relative flex justify-between items-center w-full gap-y-3 border-1 rounded-lg p-3  hover:border-black'
                >
                  {onHoverAddress && (
                    <div
                      onClick={() => dispach(setShowAlertAddress(true))}
                      className='-top-2 -right-2 absolute p-1 border-1 rounded-full bg-white border-black cursor-pointer'
                    >
                      <HiTrash />
                    </div>
                  )}
                  <div className='grid grid-cols-2  w-96'>
                    <div>
                      <label className='label-profile'>Nombres</label>
                      <p className='font-semibold'>{address.names}</p>
                    </div>
                    <div>
                      <label className='label-profile'>Apellidos</label>
                      <p className='font-semibold'>{address.names}</p>
                    </div>
                    <div>
                      <label className='label-profile'>Dirección</label>
                      <p className='font-semibold'>{address.address}</p>
                    </div>
                    <div>
                      <label className='label-profile'>Estado</label>
                      <p className='font-semibold'>{address.state}</p>
                    </div>
                    <div>
                      <label className='label-profile'>Ciudad</label>
                      <p className='font-semibold'>{address.city}</p>
                    </div>
                    <div>
                      <label className='label-profile'>Telefono</label>
                      <p className='font-semibold'>{address.phone}</p>
                    </div>
                  </div>
                  <button className=' text-[12px] bg-white border-1 text-[#666666] px-[6px] py-[5px] rounded-md'>
                    Editar
                  </button>
                </div>
              ))
            ) : (
              <div>
                <h3 className='text-[13px] text-gray-400'>
                  No tienes ningún domicilio aún
                </h3>
              </div>
            )}

            <div className='w-full  flex justify-end'>
              <button
                type='submit'
                className='font-medium bg-black p-2 text-white px-[12px] text-[14px] rounded-md hover:bg-gray-900'
              >
                Añadir
              </button>
            </div>
          </div>
        </div>

        {/* CARDS INFORMATION */}
        <div className='flex flex-col  justify-center  items-center border-1 w-full p-5 rounded-lg'>
          <div className='flex flex-col justify-start items-start gap-4 w-full'>
            <h3>Tus tarjetas</h3>
            {cards?.map((card: Card) => (
              <div
                key={card.id}
                onMouseEnter={() => setOnHoverCard(true)}
                onMouseLeave={() => setOnHoverCard(false)}
                className='relative flex justify-between items-center  w-full gap-y-3 border-1 rounded-lg p-3 hover:border-black'
              >
                {onHoverCard && (
                  <div className='-top-2 -right-2 absolute p-1 border-1 rounded-full bg-white border-black cursor-pointer'>
                    <HiTrash />
                  </div>
                )}
                <div className='grid grid-cols-2  w-96'>
                  <div>
                    <label className='label-profile'>Número de tarjeta</label>
                    <p className='font-semibold'>
                      {card.card_number
                        .replace(/.(?=.{4})/g, '*')
                        .replace(/\s/g, '')
                        .replace(/(.{4})/g, '$1')}
                    </p>
                  </div>
                  <div>
                    <label className='label-profile'>Nombres</label>
                    <p className='font-semibold'>{card.names}</p>
                  </div>
                  <div>
                    <label className='label-profile'>Apellidos</label>
                    <p className='font-semibold'>{card.surnames}</p>
                  </div>
                  <div>
                    <label className='label-profile'>Cedula</label>
                    <p className='font-semibold'>
                      {card.number_identification}
                    </p>
                  </div>
                </div>
                <button className=' text-[12px] bg-white border-1 text-[#666666] px-[6px] py-[5px] rounded-md'>
                  Editar
                </button>
              </div>
            ))}
            <div className='w-full  flex justify-end'>
              <button
                type='submit'
                className='font-medium bg-black p-2 text-white px-[12px] text-[14px] rounded-md hover:bg-gray-900'
              >
                Añadir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
