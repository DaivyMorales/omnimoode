import Payment from '@/components/Checkout/Payment';
import Address from '@/components/Checkout/Address';
import Head from 'next/head';

export default function Checkout() {
  return (
    <main className='h-full flex flex-col justify-start items-center px-3'>
      <Head>
        <title>Checkout | Omnimoode</title>
      </Head>

      <div className='grid grid-cols-2 gap-6'>
        {/* <Payment /> */}
        <Address />
      </div>
    </main>
  );
}
