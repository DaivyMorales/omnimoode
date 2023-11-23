import { useAppSelector } from '@/redux/hooks';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { HiSearch, HiGift } from 'react-icons/hi';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import * as Yup from 'yup';

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

  const priceFinal = useAppSelector(
    (state) => state.priceFinalSlice.priceFinal
  );

  const formik = useFormik({
    initialValues: {
      names: '',
      surnames: '',
      address: '',
      specifications: '',
      neighborhood: '',
      state: '',
      city: '',
      phone: '',
      userId: 0,
    },
    validationSchema: Yup.object({
      names: Yup.string()
        .max(50, 'No puedes sobrepasar los 50 caracteres!')
        .required('Haz olvidado escribir el nombre'),
      surnames: Yup.string()
        .max(50, 'No puedes sobrepasar los 50 caracteres!')
        .required('Haz olvidado escribir los apellidos'),
      address: Yup.string().required('Haz olvidado escribir la dirección'),
      specifications: Yup.string().required(
        'Haz olvidado escribir alguna especificación'
      ),
      neighborhood: Yup.string()
        .max(30, 'No puedes sobrepasar los 30 caracteres!')
        .required('Haz olvidado escribir el vecinadario'),
      state: Yup.string().required('Haz olvidado elegir el departamento'),
      city: Yup.string().required('Haz olvidado elegir el municipio/capital'),
      phone: Yup.string()
        .required('Haz olvidado escribir tu telefono')
        .max(10, 'No puedes sobrepasar los 10 caracteres!'),
    }),
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
        {/* NAMES */}
        <div>
          <label htmlFor='names'>Nombres</label>
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

        {/* lASTNAME */}
        <div>
          <label htmlFor='surnames'>Apellidos</label>
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
          {/* ERROR NAMES */}
          {formik.touched.surnames && formik.errors.surnames ? (
            <p className='form-errors'>{formik.errors.surnames}</p>
          ) : null}
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
        {/* STATE */}
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
          {/* ERROR STATE */}
          {formik.touched.state && formik.errors.state ? (
            <p className='form-errors'>{formik.errors.state}</p>
          ) : null}
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
          {/* ERROR STATE */}
          {formik.touched.city && formik.errors.city ? (
            <p className='form-errors'>{formik.errors.city}</p>
          ) : null}
        </div>
      </div>

      <div className='grid grid-cols-2'>
        {/* NEIGHBORHOOD */}
        <div className='w-full'>
          <label htmlFor='neighborhood'>Vecindario</label>
          <div className='inputLogin' onClick={handleClick}>
            <input
              className={`${
                formik.touched.neighborhood &&
                formik.errors.neighborhood &&
                'placeholder-red-300'
              }`}
              id='neighborhood'
              name='neighborhood'
              type='text'
              onChange={formik.handleChange}
              placeholder='Mi vecindario'
              value={formik.values.neighborhood}
              ref={inputRef}
            />
          </div>
          {/* ERROR NEIGHBORHOOD */}
          {formik.touched.neighborhood && formik.errors.neighborhood ? (
            <p className='form-errors'>{formik.errors.neighborhood}</p>
          ) : null}
        </div>
      </div>

      {/* ADRESS */}
      <div className='w-full'>
        <label htmlFor='address'>Dirección</label>
        <div className='inputLogin'>
          <input
            className={`${
              formik.touched.address &&
              formik.errors.address &&
              'placeholder-red-300'
            }`}
            id='address'
            name='address'
            type='text'
            onChange={formik.handleChange}
            placeholder='Avn 123 #45'
            value={formik.values.address}
          />
        </div>
        {/* ERROR ADDRESS */}
        {formik.touched.address && formik.errors.address ? (
          <p className='form-errors'>{formik.errors.address}</p>
        ) : null}
      </div>

      {/* SPICIFICATIONS */}
      <div className='w-full'>
        <label htmlFor='specifications'>
          Referencias adicionales de esta dirección
        </label>
        <div className='inputLogin'>
          <input
            className={`${
              formik.touched.specifications &&
              formik.errors.specifications &&
              'placeholder-red-300'
            }`}
            id='specifications'
            name='specifications'
            type='text'
            onChange={formik.handleChange}
            placeholder='Apartamento 123'
            value={formik.values.specifications}
          />
        </div>
        {/* ERROR SPICIFICATIONS */}
        {formik.touched.specifications && formik.errors.specifications ? (
          <p className='form-errors'>{formik.errors.specifications}</p>
        ) : null}
      </div>

      <div className='grid grid-cols-2'>
        {/* PHONE */}
        <div className='w-full'>
          <label htmlFor='phone'>Telefono de contacto</label>
          <div className='inputLogin' onClick={handleClick}>
            <input
              className={`${
                formik.touched.phone &&
                formik.errors.phone &&
                'placeholder-red-300'
              }`}
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
          {/* ERROR PHONE */}
          {formik.touched.phone && formik.errors.phone ? (
            <p className='form-errors'>{formik.errors.phone}</p>
          ) : null}
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
