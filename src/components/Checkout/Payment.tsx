import { useAppSelector } from '@/redux/hooks';
import axios from 'axios';
import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import { HiSearch, HiCreditCard } from 'react-icons/hi';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';

export default function Payment() {
  const { data: session } = useSession();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const priceFinal = useAppSelector(
    (state) => state.priceFinalSlice.priceFinal
  );

  const formik = useFormik({
    initialValues: {
      card_number: '',
      names: '',
      surnames: '',
      due_date: '',
      security_code: 0,
      number_identification: 0,
      userId: 0,
    },
    onSubmit: async (values, { resetForm }) => {
      const userId = Number((session?.user as { id?: number })?.id ?? 0);

      const dataToSend = {
        ...values,
        userId,
      };
      console.log(dataToSend);
      const response = await axios.post('/api/card', dataToSend);
      console.log(response);
    },
  });

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = rawValue
      .replace(/\s/g, '')
      .match(/.{1,4}/g)
      ?.join(' ');

    formik.handleChange(e);
    formik.setFieldValue('card_number', formattedValue || '');
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = rawValue
      .replace(/\D/g, '')
      .slice(0, 4)
      .replace(/(\d{2})(\d{0,2})/, '$1/$2');

    formik.handleChange(e);
    formik.setFieldValue('due_date', formattedValue);
  };

  const handleSecurityCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = rawValue.replace(/\D/g, '').slice(0, 3);

    formik.handleChange(e);
    formik.setFieldValue('security_code', parseInt(formattedValue));
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className='flex flex-col justify-start items-start gap-3'
    >
      <div className='flex gap-3 justify-center items-center '>
        <div className=' p-2 rounded-full bg-black'>
          <HiCreditCard size={25} color='white' />
        </div>
        <div className=''>
          <h3 className='font-bold'>Agregar tarjeta</h3>
          <p>Ingresa tus datos de pago abajo para pagar.</p>
        </div>
      </div>

      {/* CARD_NUMBER */}
      <div className='w-full'>
        <label htmlFor='card_number'>Número de tarjeta</label>
        <div className='inputLogin'>
          <input
            id='card_number'
            name='card_number'
            type='text'
            onChange={handleCardNumberChange}
            placeholder='1234 1234 1234 1234'
            value={formik.values.card_number}
          />
        </div>
      </div>

      <div className='grid grid-cols-3 gap-3 w-full'>
        {/* NAME */}
        <div>
          <label htmlFor='due_date'>Fecha de vencimiento</label>
          <div className='inputLogin'>
            <input
              id='due_date'
              name='due_date'
              type='text'
              onChange={handleDueDateChange}
              placeholder='12/12'
              value={formik.values.due_date}
            />
          </div>
        </div>
        {/* lASTNAME */}
        <div>
          <label htmlFor='security_code'>Código de seguridad</label>
          <div className='inputLogin'>
            <input
              id='security_code'
              name='security_code'
              type='text'
              maxLength={3}
              inputMode='numeric'
              onChange={handleSecurityCodeChange}
              placeholder='123'
              value={formik.values.security_code || ''}
            />
          </div>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-3 w-full'>
        {/* NAME */}
        <div>
          <label htmlFor='names'>Nombres del titular</label>
          <div className='inputLogin'>
            <input
              id='names'
              name='names'
              type='text'
              onChange={formik.handleChange}
              placeholder='John'
              value={formik.values.names}
            />
          </div>
        </div>
        {/* lASTNAME */}
        <div>
          <label htmlFor='surnames'>Apellidos del titular</label>
          <div className='inputLogin'>
            <input
              id='surnames'
              name='surnames'
              type='text'
              onChange={formik.handleChange}
              placeholder='Doe'
              value={formik.values.surnames}
            />
          </div>
        </div>
      </div>

      {/* NUMBER_IDENTIFICATION */}
      <div className='w-full'>
        <label htmlFor='number_identification'>Cedula</label>
        <div className='inputLogin'>
          <input
            id='number_identification'
            name='number_identification'
            type='number'
            onChange={formik.handleChange}
            placeholder='123456789'
            value={formik.values.number_identification || ''}
          />
        </div>
      </div>

      <div className='grid grid-cols-2 w-full'>
        <div className='flex justify-start items-center'>
          <button className='font-medium bg-black p-2 bg-white border-1 px-[12px] text-[14px] rounded-md  hover:bg-gray-100'>
            Cancelar
          </button>
        </div>
        <div className='flex justify-end items-center'>
          <button
            type='submit'
            className='font-medium bg-black p-2 text-white px-[12px] text-[14px] rounded-md hover:bg-gray-900'
          >
            Confirmar
          </button>
        </div>
      </div>
    </form>
  );
}
