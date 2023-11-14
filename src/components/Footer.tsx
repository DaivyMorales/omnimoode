import Image from 'next/image';
import Link from 'next/link';
import { BsGithub, BsInstagram } from 'react-icons/bs';

export default function Footer() {
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
            <div className='bg-[#f2f2f2] rounded  pl-3  py-[2px] pr-[2px] flex justify-between items-center '>
              <input
                type='email'
                placeholder='tu@correo.com'
                className='text-[14px]'
              />
              <button className='text-[12px] bg-white border-1 text-[#666666] px-[6px] py-[2px] rounded'>
                Suscribirme
              </button>
            </div>
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
            <Link href='https://github.com/DaivyMorales/omnimoode'>
              <BsGithub size={20}/>
            </Link>
            <span className='text-gray-200'>|</span>
            <Link href=''>
              <BsInstagram size={20}/>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
