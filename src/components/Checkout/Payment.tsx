import axios from 'axios';
import { useRef } from 'react';
import { HiCreditCard } from 'react-icons/hi';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import { addCard } from '@/redux/features/cardSlice';
import { useAppDispach } from '@/redux/hooks';
import * as Yup from 'yup';
import { setShowCardForm } from '@/redux/features/showAlertsSlice';

interface PaymentProps {
  setPayment: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Payment({ setPayment }: PaymentProps) {
  const { data: session } = useSession();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const dispach = useAppDispach();

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const formik = useFormik({
    initialValues: {
      card_number: '',
      due_date: '',
      security_code: 0,
      names: '',
      surnames: '',
      number_identification: 0,
      userId: 0,
    },
    validationSchema: Yup.object({
      card_number: Yup.string()
        .max(19, 'Haz sobrepasado el limite de caracteres')
        .required('Haz olvidado escribir tu número de tarjeta'),
      due_date: Yup.string()
        .max(5)
        .required('Haz olvidado escribir la fecha de vencimiento!'),
      security_code: Yup.number()
        .test('len', 'Deben ser 3 digitos', (val) => {
          if (val) {
            return val.toString().length === 3;
          }
          return false;
        })
        .required('Haz olvidado escribir el código de seguridad!'),
      names: Yup.string()
        .max(50, 'No puedes sobrepasar los 50 caracteres!')
        .required('Haz olvidado escribir el nombre'),
      surnames: Yup.string()
        .max(50, 'No puedes sobrepasar los 50 caracteres!')
        .required('Haz olvidado escribir los apellidos'),
      number_identification: Yup.number()
        .test('len', 'Deben ser maximo 10 digitos', (val) => {
          if (val) {
            return val.toString().length <= 10;
          }
          return false;
        })
        .required('Haz olvidado escribir tu número de cedula!'),
    }),
    onSubmit: async (values, { resetForm }) => {
      dispach(addCard(values));
      const userId = Number((session?.user as { id?: number })?.id ?? 0);

      const dataToSend = {
        ...values,
        userId,
      };

      const response = await axios.post('/api/card', dataToSend);

      if (response.status === 200) {
        setPayment(true);
        dispach(setShowCardForm(false));
        resetForm();
      }
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
    <div className='delete-alert'>
      <form
        onSubmit={formik.handleSubmit}
        className='bg-white w-[450px] p-5 rounded-lg border-1 flex flex-col justify-start items-start gap-3'
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

        <div className='grid grid-cols-4 gap-3 w-full'>
          {/* CARD_NUMBER */}
          <div className='col-span-2 flex justify-end flex-col'>
            <label htmlFor='card_number'>Número de tarjeta</label>
            <div className='inputLogin'>
              <input
                className={`${
                  formik.touched.card_number &&
                  formik.errors.card_number &&
                  'placeholder-red-300'
                }`}
                id='card_number'
                name='card_number'
                type='text'
                onChange={handleCardNumberChange}
                placeholder='1234 1234 1234 1234'
                value={formik.values.card_number}
              />
            </div>
            {/* ERROR CARD_NUMBER */}
            {formik.touched.card_number && formik.errors.card_number ? (
              <p className='form-errors'>{formik.errors.card_number}</p>
            ) : null}
          </div>

          {/* DUE_DATE */}
          <div>
            <label htmlFor='due_date'>Fecha de vencimiento</label>
            <div className='inputLogin'>
              <input
                className={`${
                  formik.touched.due_date &&
                  formik.errors.due_date &&
                  'placeholder-red-300'
                }`}
                id='due_date'
                name='due_date'
                type='text'
                onChange={handleDueDateChange}
                placeholder='12/12'
                value={formik.values.due_date}
              />
            </div>
            {/* ERROR DUE_DATE */}
            {formik.touched.due_date && formik.errors.due_date ? (
              <p className='form-errors'>{formik.errors.due_date}</p>
            ) : null}
          </div>
          {/* SECURITY_CODE */}
          <div>
            <label htmlFor='security_code'>Código de seguridad</label>
            <div className='inputLogin'>
              <input
                className={`${
                  formik.touched.security_code &&
                  formik.errors.security_code &&
                  'placeholder-red-300'
                }`}
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
            {/* ERROR SECURITY_CODE */}
            {formik.touched.security_code && formik.errors.security_code ? (
              <p className='form-errors'>{formik.errors.security_code}</p>
            ) : null}
          </div>
        </div>

        <div className='grid grid-cols-2 gap-3 w-full'>
          {/* NAMES */}
          <div>
            <label htmlFor='names'>Nombres del titular</label>
            <div className='inputLogin'>
              <input
                className={`${
                  formik.touched.names &&
                  formik.errors.names &&
                  'placeholder-red-300'
                }`}
                id='names'
                name='names'
                type='text'
                onChange={formik.handleChange}
                placeholder='John'
                value={formik.values.names}
              />
            </div>
            {/* ERROR NAMES */}
            {formik.touched.names && formik.errors.names ? (
              <p className='form-errors'>{formik.errors.names}</p>
            ) : null}
          </div>
          {/* SURNAMES */}
          <div>
            <label htmlFor='surnames'>Apellidos del titular</label>
            <div className='inputLogin'>
              <input
                className={`${
                  formik.touched.surnames &&
                  formik.errors.surnames &&
                  'placeholder-red-300'
                }`}
                id='surnames'
                name='surnames'
                type='text'
                onChange={formik.handleChange}
                placeholder='Doe'
                value={formik.values.surnames}
              />
            </div>
            {/* ERROR SURNAMES */}
            {formik.touched.surnames && formik.errors.surnames ? (
              <p className='form-errors'>{formik.errors.surnames}</p>
            ) : null}
          </div>
        </div>

        {/* NUMBER_IDENTIFICATION */}
        <div className='w-full'>
          <label htmlFor='number_identification'>Cedula</label>
          <div className='inputLogin'>
            <input
              className={`${
                formik.touched.number_identification &&
                formik.errors.number_identification &&
                'placeholder-red-300'
              }`}
              id='number_identification'
              name='number_identification'
              type='number'
              onChange={formik.handleChange}
              placeholder='123456789'
              value={formik.values.number_identification || ''}
            />
          </div>
          {/* ERROR NUMBER_IDENTIFICATION */}
          {formik.touched.number_identification &&
          formik.errors.number_identification ? (
            <p className='form-errors'>{formik.errors.number_identification}</p>
          ) : null}
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
    </div>
  );
}
