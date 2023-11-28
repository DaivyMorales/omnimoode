import { MouseEvent, useEffect, useState } from 'react';
import { setShowAddress, setShowCard } from '@/redux/features/showAlertsSlice';
import { useAppDispach } from '@/redux/hooks';
import axios from 'axios';
import { useGetCardByIdQuery } from '@/redux/api/cardApi';
import { deleteCardById } from '@/redux/features/cardSlice';
import { useAppSelector } from '@/redux/hooks';

const DeleteCard = () => {
  const [cardId, setCardId] = useState(0);

  const dispach = useAppDispach();

  const showCard = useAppSelector((state) => state.showAlertsSlice.showCard);

  const { data: dataCard } = useGetCardByIdQuery({
    id: showCard,
  });

  const handleOuterDivClick = () => {
    dispach(setShowAddress(0));
  };

  const handleInnerDivClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  const deleteAddress = async (id: number) => {
    dispach(deleteCardById(id));

    const response = await axios.delete(`/api/card/${id}`);
    console.log(response);
  };

  useEffect(() => {
    if (dataCard) {
      dataCard.map((card) => setCardId(card.id));
    }
  }, [dataCard]);

  return (
    <div className='delete-alert bg-red-500' onClick={handleOuterDivClick}>
      <div
        className='bg-white w-[500px] border-1 rounded-lg p-3 flex flex-col justify-center items-center gap-5'
        onClick={handleInnerDivClick}
      >
        <h3 className='text-[24px] font-semibold text-black'>
          Eliminar tarjeta
        </h3>
        <p className='text-[16px] font-normal'>
          This project will be deleted, along with all of its Deployments,
          Domains, Environment Variables, Serverless Functions, and Settings.
        </p>
        <div>
          {dataCard?.map((card) => (
            <div
              key={card.id}
              className='flex gap-1 rounded-lg p-2 border-1 bg-gray-200 border-white '
            >
              <p className='font-semibold'>
                {card.card_number
                  .replace(/.(?=.{4})/g, '*')
                  .replace(/\s/g, '')
                  .replace(/(.{4})/g, '$1')}
              </p>
              <p className='font-medium'> {card.names},</p>
              <p className='font-medium'> {card.surnames},</p>
              <p className='font-medium'>{card.number_identification}</p>
            </div>
          ))}
        </div>
        <div className='grid grid-cols-2 w-full'>
          <div className='flex justify-start items-center'>
            <button
              onClick={() => {
                dispach(setShowCard(0));
              }}
              className='font-medium bg-black p-2 bg-white border-1 px-[12px] text-[14px] rounded-md  hover:bg-gray-100'
            >
              Cancelar
            </button>
          </div>
          <div className='flex justify-end items-center'>
            <button
              onClick={() => {
                dispach(setShowCard(0));
                deleteAddress(cardId);
              }}
              type='submit'
              className='font-medium bg-red-500  p-2 text-white px-[12px] text-[14px] rounded-md hover:bg-red-300'
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCard;
