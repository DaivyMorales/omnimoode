import { MouseEvent, useEffect, useState } from 'react';
import { setShowAlertAddress } from '@/redux/features/showAlertAddressSlice';
import { useAppDispach } from '@/redux/hooks';
import { useGetAddressByIdQuery } from '@/redux/api/addressApi';
import { useSession } from 'next-auth/react';
import { deleteAddressById } from '@/redux/features/addressSlice';
import axios from 'axios';

const DeleteAddress = () => {
  const { data: session } = useSession();

  const [addressId, setAddressId] = useState(0);

  const dispach = useAppDispach();

  const userId = (session?.user as { id?: number })?.id ?? 0;

  const { data: dataAddress } = useGetAddressByIdQuery({
    id: userId,
  });

  const handleOuterDivClick = () => {
    dispach(setShowAlertAddress(false));
  };

  const handleInnerDivClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  const deleteAddress = async (id: number) => {
    dispach(deleteAddressById(id));

    const response = await axios.delete(`/api/address/${id}`);
    console.log(response);
  };

  useEffect(() => {
    if (dataAddress) {
      dataAddress.map((address) => setAddressId(address.id));
    }
  }, [dataAddress]);

  return (
    <div className='delete-alert' onClick={handleOuterDivClick}>
      <div
        className='bg-white w-[500px] border-1 rounded-lg p-3 flex flex-col justify-center items-center gap-5'
        onClick={handleInnerDivClick}
      >
        <h3 className='text-[24px] font-semibold text-black'>
          Eliminar domicilio
        </h3>
        <p className='text-[16px] font-normal'>
          This project will be deleted, along with all of its Deployments,
          Domains, Environment Variables, Serverless Functions, and Settings.
        </p>
        <div>
          {dataAddress?.map((address) => (
            <div
              key={address.id}
              className='flex gap-1 rounded-lg p-2 border-1 bg-gray-200 border-white '
            >
              <p className='font-medium'> {address.names},</p>
              <p className='font-medium'> {address.surnames},</p>
              <p className='font-medium'> {address.address},</p>
              <p className='font-medium'>{address.city}</p>
            </div>
          ))}
        </div>
        <div className='grid grid-cols-2 w-full'>
          <div className='flex justify-start items-center'>
            <button
              onClick={() => {
                dispach(setShowAlertAddress(false));
              }}
              className='font-medium bg-black p-2 bg-white border-1 px-[12px] text-[14px] rounded-md  hover:bg-gray-100'
            >
              Cancelar
            </button>
          </div>
          <div className='flex justify-end items-center'>
            <button
              onClick={() => {
                dispach(setShowAlertAddress(false));
                deleteAddress(addressId);
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

export default DeleteAddress;
