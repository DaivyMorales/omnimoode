import { useGetCartByIdQuery } from '@/redux/api/cartApi';
import { setPriceFinal } from '@/redux/features/priceFinalSlice';
import { useAppSelector } from '@/redux/hooks';
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { HiOfficeBuilding, HiSearch } from 'react-icons/hi';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';

interface ILocation {
  id: number;
  departamento: string;
  ciudades: String[];
}

export default function Checkout() {
  const { status, data: session } = useSession();

  const [info, setInfo] = useState<ILocation[]>([]);
  const [ciudades, setCiudades] = useState<string[]>([]);
  const [idDeparmentSelected, setIdDeparmentSelected] = useState<number>();
  // const { isLoading, data, error } = useGetCartByIdQuery({
  //   id: 1,
  // });

  const priceFinal = useAppSelector(
    (state) => state.priceFinalSlice.priceFinal
  );

  const getCountryInfo = async () => {
    const response = await axios.get(
      'https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json'
    );

    setInfo(response.data);
  };

  useEffect(() => {
    getCountryInfo();
  }, []);

  useEffect(() => {
    if (idDeparmentSelected !== null) {
      const departamentoSeleccionado = info.find(
        (location) => location.id === idDeparmentSelected
      );
      if (departamentoSeleccionado) {
        setCiudades(departamentoSeleccionado.ciudades.map(String) || []);
      }
    }
  }, [idDeparmentSelected, info]);

  const formik = useFormik({
    initialValues: {
      names: '',
      surnames: '',
      identity_card: 0,
      birthday: 0,
      address: '',
      specifications: '',
      state: '',
      city: '',
      phone: '',
      userId: 0,
    },
    onSubmit: async (values, { resetForm }) => {
      const userId = (session?.user as { id?: number })?.id?.toString() ?? '0';
      const selectedDate = new Date(values.birthday);
      const prismaDateTime = selectedDate.toISOString();
      const dataToSend = {
        ...values,
        birthday: prismaDateTime,
        userId: parseInt(userId),
      };
      console.log(dataToSend);
      const response = await axios.post('/api/address', dataToSend);
      console.log(response);
    },
  });

  return (
    <main className='h-screen flex flex-col justify-center items-center'>
      <Head>
        <title>Checkout | Omnimoode</title>
      </Head>
      <Image
        src='https://res.cloudinary.com/dayloxa2a/image/upload/v1699804304/umsawepuoiinvzgiztr1.png'
        width={200}
        height={200}
        alt='Omnimoode logo'
      />
      <h2 className='font-bold'>Dirección de envio</h2>
      <form
        onSubmit={formik.handleSubmit}
        className='flex flex-col justify-center items-center gap-3'
      >
        {/* COUNTRY */}
        <div className='w-full'>
          <label htmlFor=''>País / Región</label>
          <div className='inputLogin'>
            <div className='bg-white p-2 rounded-md'>
              <HiSearch color='gray' />
            </div>
            <select name='' id='' className='w-full text-sm'>
              <option value='Colombia'>Colombia</option>
            </select>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-3 w-full'>
          {/* NAME */}
          <div>
            <label htmlFor='names'>Nombres</label>
            <div className='inputLogin'>
              <input
                id='names'
                name='names'
                type='text'
                onChange={formik.handleChange}
                placeholder=''
                value={formik.values.names}
              />
            </div>
          </div>
          {/* lASTNAME */}
          <div>
            <label htmlFor='surnames'>Apellidos</label>
            <div className='inputLogin'>
              <input
                id='surnames'
                name='surnames'
                type='text'
                onChange={formik.handleChange}
                placeholder=''
                value={formik.values.surnames}
              />
            </div>
          </div>
        </div>

        {/* ID */}
        <div className='w-full'>
          <label htmlFor='identity_card'>Cedula</label>
          <div className='inputLogin'>
            <input
              id='identity_card'
              name='identity_card'
              type='number'
              onChange={formik.handleChange}
              placeholder=''
              value={formik.values.identity_card}
            />
          </div>
        </div>

        {/* BIRTHDAY */}
        <div className='w-full'>
          <label htmlFor='birthday'>Fecha de nacimiento</label>
          <div className='inputLogin'>
            <input
              id='birthday'
              name='birthday'
              type='date'
              onChange={formik.handleChange}
              placeholder=''
              value={formik.values.birthday}
            />
          </div>
        </div>

        {/* ADRESS */}
        <div className='w-full'>
          <label htmlFor='address'>Dirección</label>
          <div className='inputLogin'>
            <input
              id='address'
              name='address'
              type='text'
              onChange={formik.handleChange}
              placeholder=''
              value={formik.values.address}
            />
          </div>
        </div>

        {/* SPICIFICATIONS */}
        <div className='w-full'>
          <label htmlFor='specifications'>
            Apartamento, local, etc. (Opcional)
          </label>
          <div className='inputLogin'>
            <input
              id='specifications'
              name='specifications'
              type='text'
              onChange={formik.handleChange}
              placeholder=''
              value={formik.values.specifications}
            />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-3 w-full'>
          {/* DEPARTAMENT */}
          <div>
            <label htmlFor='state'>Departamento</label>
            <div className='inputLogin'>
              <select
                name='state'
                id='state'
                value={idDeparmentSelected || ''}
                onChange={(e) => {
                  const selectedId = Number(e.target.value);
                  const selectedDepartamento =
                    info.find((location) => location.id === selectedId)
                      ?.departamento || '';
                  setIdDeparmentSelected(selectedId);
                  formik.setFieldValue('state', selectedDepartamento);
                  formik.setFieldValue('city', '');
                }}
                className='text-sm'
              >
                <option value='' disabled>
                  Seleccione un departamento
                </option>
                {info.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.departamento}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* CITY */}
          <div>
            <label htmlFor='city'>Ciudad</label>
            <div className='inputLogin'>
              <select
                name='city'
                id='city'
                value={formik.values.city}
                onChange={formik.handleChange}
                className='text-sm'
              >
                {ciudades.map((ciudad, index) => (
                  <option key={index} value={ciudad}>
                    {ciudad}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* PHONE */}
        <div className='w-full'>
          <label htmlFor='phone'>Celular</label>
          <div className='inputLogin'>
            <input
              id='phone'
              name='phone'
              type='text'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                formik.setFieldValue('phone', e.target.value.toString())
              }
              placeholder=''
              value={formik.values.phone}
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
              Guardar y confirmar
            </button>
          </div>
        </div>
      </form>
      {priceFinal}
    </main>
  );
}
