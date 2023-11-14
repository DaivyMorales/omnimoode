import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsGithub, BsInstagram } from 'react-icons/bs';
import axios from 'axios';
import { HiCheckCircle } from 'react-icons/hi';

export default function Footer() {
  const [emailValue, setEmailValue] = useState('');
  const [statusResponse, setStatusResponse] = useState(0);

  const handleNewsletter = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputText = event.target.value;
    setEmailValue(inputText);
  };

  return (
    <footer className=' border-1 border-t-gray-200 dark:bg-gray-900'>
      <div className='w-full max-w-screen-xl mx-auto p-4 md:py-8 '>
        <div className='w-full grid grid-cols-2 gap-[32px]  sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-7'>
          <Link
            href='/'
            className='col-span-2  flex items-center justify-center sm:col-span-3 md:col-span-4 lg:col-span-1'
          >
            <Image
              src='https://res.cloudinary.com/dayloxa2a/image/upload/v1699804304/umsawepuoiinvzgiztr1.png'
              alt='Flowbite Logo'
              width={300}
              height={300}
              priority={true}
            />
          </Link>

          <div className='grid grid-rows-4 '>
            <h4>Nosotros</h4>
            <Link className='link-footer' href={''}>
              ¿Quienes somos?
            </Link>
          </div>
          <div className='grid grid-rows-4 '>
            <h4>Categorias</h4>
            <Link className='link-footer' href={''}>
              Shirts
            </Link>
            <Link className='link-footer' href={''}>
              Pants
            </Link>
            <Link className='link-footer' href={''}>
              Hoddies
            </Link>
          </div>
          <div className='grid grid-rows-4 '>
            <h4>Legal</h4>
            <Link className='link-footer' href={''}>
              Politica de privacidad
            </Link>
          </div>
          <div className='grid grid-rows-4 '>
            <h4>Guías</h4>
            <Link className='link-footer' href={''}>
              ¿Como compro?
            </Link>
          </div>
          <div className='grid gap-3 col-start-1 col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-2'>
            <h4>Suscribete a nuestro newsletter</h4>
            <p className='link-footer'>
              Únete a nuestro boletín de noticias para recibir actualizaciones
              exclusivas.
            </p>
            {statusResponse === 200 ? (
              <div className='flex gap-1 items-center '>
                <HiCheckCircle color='blue' />
                <span className='text-[14px] text-[#666666]'>
                  Gracias por suscribirte!
                </span>
              </div>
            ) : (
              <div className='flex items-center gap-2 '>
                <input
                  type='email'
                  placeholder='tu@correo.com'
                  className='text-[14px] bg-[#f2f2f2] rounded-md pl-3 py-[5px] pr-[2px]  focus:ring-offset-2 focus:ring-2 focus:ring-blue-500'
                  onChange={handleNewsletter}
                />
                <button
                  onClick={async () => {
                    const response = await axios.post('/api/newsletter', {
                      email: emailValue,
                    });

                    if (response.status === 200) {
                      setStatusResponse(200);
                    }
                  }}
                  disabled={emailValue === ''}
                  className={`${
                    emailValue === '' && 'cursor-not-allowed'
                  } text-[12px] bg-white border-1 text-[#666666] px-[6px] py-[5px] rounded-md `}
                >
                  Suscribirme
                </button>
              </div>
            )}
            <Link className='link-footer' href={''}></Link>
          </div>
        </div>
        <hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
        <div className='flex justify-center items-center flex-col gap-4'>
          <span className='block text-sm text-gray-500 sm:text-center dark:text-gray-400'>
            © 2023
            <Link href='/' className='hover:underline'>
              Omnimoode™
            </Link>
            . Todos los derechos reservados.
          </span>
          <div className='flex gap-3 justify-center items-center'>
            <Link
              href='https://github.com/DaivyMorales/omnimoode'
              target='_blank'
            >
              <BsGithub size={20} />
            </Link>
            <span className='text-gray-200'>|</span>
            <Link href='https://www.instagram.com/omnimoode/' target='_blank'>
              <BsInstagram size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
