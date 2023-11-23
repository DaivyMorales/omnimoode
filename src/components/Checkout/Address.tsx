import { useAppSelector } from '@/redux/hooks';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { HiSearch, HiGift } from 'react-icons/hi';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';

interface ILocation {
  id: number;
  departamento: string;
  ciudades: String[];
}

export default function Address() {
  const { data: session } = useSession();

  const [info, setInfo] = useState<ILocation[]>([]);
  const [ciudades, setCiudades] = useState<string[]>([]);
  const [idDeparmentSelected, setIdDeparmentSelected] = useState<number>();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // const { isLoading, data, error } = useGetCartByIdQuery({
  //   id: 1,
  // });

  const priceFinal = useAppSelector(
    (state) => state.priceFinalSlice.priceFinal
  );

  const formik = useFormik({
    initialValues: {
      names: '',
      surnames: '',
      address: '',
      neighborhood: 0,
      specifications: 0,
      state: '',
      city: '',
      phone: '',
      userId: 0,
    },
    onSubmit: async (values, { resetForm }) => {
      const userId = (session?.user as { id?: number })?.id?.toString() ?? '0';
      const formData = {
        ...values,
        userId: parseInt(userId),
      };
      console.log(formData);
      const response = await axios.post('/api/address', formData);
      console.log(response);
    },
  });

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

  return (
    <form
      onSubmit={formik.handleSubmit}
      className='flex flex-col justify-center items-start gap-3'
    >
      <div className='flex gap-3 justify-center items-center '>
        <div className=' p-2 rounded-full bg-black'>
          <HiGift size={25} color='white' />
        </div>
        <div className=''>
          <h3 className='font-bold'>Delivery</h3>
          <p>Ingresa tus datos de pago abajo para pagar.</p>
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
              placeholder='John'
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
              placeholder='Doe'
              value={formik.values.surnames}
            />
          </div>
        </div>
      </div>

      {/* COUNTRY */}
      <div className='w-full'>
        <label htmlFor=''>País / Región</label>
        <div className='inputLogin'>
          <div className='bg-white p-1 rounded-md'>
            <HiSearch color='gray' size={15} />
          </div>
          <select name='' id='' className='w-full text-sm font-medium'>
            <option value='Colombia'>Colombia</option>
          </select>
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
              <option value='' className='text-gray-400' disabled>
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

      <div className='grid grid-cols-2'>
        {/* NEIGHBORHOOD */}
        <div className='w-full'>
          <label htmlFor='neighborhood'>Vecindario</label>
          <div className='inputLogin' onClick={handleClick}>
            <input
              id='neighborhood'
              name='neighborhood'
              type='text'
              onChange={formik.handleChange}
              placeholder='Mi vecindario'
              value={formik.values.neighborhood}
              ref={inputRef}
            />
          </div>
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
            placeholder='Avn 123 #45'
            value={formik.values.address}
          />
        </div>
      </div>

      {/* SPICIFICATIONS */}
      <div className='w-full'>
        <label htmlFor='specifications'>
          Referencias adicionales de esta dirección
        </label>
        <div className='inputLogin'>
          <input
            id='specifications'
            name='specifications'
            type='text'
            onChange={formik.handleChange}
            placeholder='Apartamento 123'
            value={formik.values.specifications}
          />
        </div>
      </div>

      <div className='grid grid-cols-2'>
        {/* PHONE */}
        <div className='w-full'>
          <label htmlFor='phone'>Telefono de contacto</label>
          <div className='inputLogin' onClick={handleClick}>
            <input
              id='phone'
              name='phone'
              type='text'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                formik.setFieldValue('phone', e.target.value.toString())
              }
              placeholder='123 456 7890'
              value={formik.values.phone}
              ref={inputRef}
            />
          </div>
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
