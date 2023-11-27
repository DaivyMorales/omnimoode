import { HiCheckCircle } from 'react-icons/hi';

export default function SuccessPayment() {
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
      <HiCheckCircle size={80} />
      <h1>Ok, tu paso ha sido exitoso!</h1>
    </div>
  );
}
