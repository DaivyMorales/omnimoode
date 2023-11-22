import { useGetCartByIdQuery } from '@/redux/api/cartApi';
import { setPriceFinal } from '@/redux/features/priceFinalSlice';
import { useAppSelector } from '@/redux/hooks';
import axios from 'axios';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { HiOfficeBuilding, HiSearch } from 'react-icons/hi';
import { number, string } from 'yup';

interface ILocation {
  id: number;
  departamento: string;
  ciudades: String[];
}

export default function Checkout() {
  const [info, setInfo] = useState<ILocation[]>([]);
  const [ciudades, setCiudades] = useState<string[]>([]);
  const [idDeparmentSelected, setIdDeparmentSelected] = useState<number>();
  const { isLoading, data, error } = useGetCartByIdQuery({
    id: 1,
  });

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
    // Filtrar las ciudades basadas en el departamento seleccionado
    if (idDeparmentSelected !== null) {
      const departamentoSeleccionado = info.find(
        (location) => location.id === idDeparmentSelected
      );
      if (departamentoSeleccionado) {
        setCiudades(departamentoSeleccionado.ciudades.map(String) || []);
      }
    }
  }, [idDeparmentSelected, info]);

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <Image
        src='https://res.cloudinary.com/dayloxa2a/image/upload/v1699804304/umsawepuoiinvzgiztr1.png'
        width={200}
        height={200}
        alt='Omnimoode logo'
      />
      <h2 className='font-bold'>Dirección de envio</h2>
      <form className='flex flex-col justify-center items-center gap-3'>
        {/* COUNTRY */}
        <div className='w-full'>
          <label htmlFor=''>País / Región</label>
          <div className='inputLogin'>
            <div className='bg-white p-2 rounded-md'>
              <HiSearch color='gray' />
            </div>
            {/* <input
            id='email'
            name='email'
            type='email'
            // onChange={handleInputChange}
            placeholder='Digita tu direccion'
            // value={formik.values.email}
          /> */}
            <select name='' id='' className='w-full text-sm'>
              <option value='Colombia'>Colombia</option>
            </select>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-3 w-full'>
          {/* NAME */}
          <div>
            <label htmlFor=''>Nombres</label>
            <div className='inputLogin'>
              <input
                id='email'
                name='email'
                type='text'
                // onChange={handleInputChange}
                placeholder=''
                // value={formik.values.email}
              />
            </div>
          </div>
          {/* lASTNAME */}
          <div>
            <label htmlFor=''>Apellidos</label>
            <div className='inputLogin'>
              <input
                id='email'
                name='email'
                type='text'
                // onChange={handleInputChange}
                placeholder=''
                // value={formik.values.email}
              />
            </div>
          </div>
        </div>

        {/* ID */}
        <div className='w-full'>
          <label htmlFor=''>Cedula</label>
          <div className='inputLogin'>
            <input
              id='email'
              name='email'
              type='email'
              // onChange={handleInputChange}
              placeholder=''
              // value={formik.values.email}
            />
          </div>
        </div>

        {/* BIRTHDAY */}
        <div className='w-full'>
          <label htmlFor=''>Fecha de nacimiento</label>
          <div className='inputLogin'>
            <input
              id='email'
              name='email'
              type='date'
              // onChange={handleInputChange}
              placeholder=''
              // value={formik.values.email}
            />
          </div>
        </div>

        {/* ADRESS */}
        <div className='w-full'>
          <label htmlFor=''>Dirección</label>
          <div className='inputLogin'>
            <input
              id='email'
              name='email'
              type='text'
              // onChange={handleInputChange}
              placeholder=''
              // value={formik.values.email}
            />
          </div>
        </div>

        {/* SPICIFICATIONS */}
        <div className='w-full'>
          <label htmlFor=''>Apartamento, local, etc. (Opcional)</label>
          <div className='inputLogin'>
            <input
              id='email'
              name='email'
              type='text'
              // onChange={handleInputChange}
              placeholder=''
              // value={formik.values.email}
            />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-3 w-full'>
          {/* DEPARTAMENT */}
          <div>
            <label htmlFor=''>Departamento</label>
            <div className='inputLogin'>
              <select
                value={idDeparmentSelected || ''}
                onChange={(e) => setIdDeparmentSelected(Number(e.target.value))}
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
            <label htmlFor=''>Ciudad</label>
            <div className='inputLogin'>
              <select name='' id='' className='text-sm'>
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
          <label htmlFor=''>Celular</label>
          <div className='inputLogin'>
            <input
              id='email'
              name='email'
              type='text'
              // onChange={handleInputChange}
              placeholder=''
              // value={formik.values.email}
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
    </div>
  );
}
