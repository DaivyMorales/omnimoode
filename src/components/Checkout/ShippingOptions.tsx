import { useEffect } from 'react';
import { useGetAddressByIdQuery } from '@/redux/api/addressApi';
import { useGetCardByIdQuery } from '@/redux/api/cardApi';
import { useAppSelector } from '@/redux/hooks';
import { useSession } from 'next-auth/react';
import { CartProduct, Card, Address } from '@/types';
import { HiCreditCard, HiOfficeBuilding } from 'react-icons/hi';
import ClipLoader from 'react-spinners/ClipLoader';
import axios from 'axios';
import { useRouter } from 'next/router';

interface ShippingOptionsProps {
  finalPrice: number;
  setPayment: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ShippingOptions({
  finalPrice,
  setPayment,
}: ShippingOptionsProps) {
  
  const { data: session } = useSession();

  const router = useRouter();

  const cart = useAppSelector((state: any) => state.cartSlice.cart);

  const userId = (session?.user as { id?: number })?.id ?? 0;

  const { data: dataAddress, refetch } = useGetAddressByIdQuery({
    id: userId,
  });

  const { data: dataCard } = useGetCardByIdQuery({
    id: userId,
  });

  useEffect(() => {
    refetch();
  }, []);

  const updateStock = async (cartProducts: CartProduct[]) => {
    try {
      await Promise.all(
        cartProducts.map(async (cartProduct) => {
          const {
            size: { id },
            quantity,
          } = cartProduct;

          const response = await axios.patch(`/api/size/${id}`, {
            subtractQuantity: quantity,
          });

          if (response.status === 200) {
            router.push('/checkout/SuccessPayment');

            await axios.delete(`/api/cart/cartProduct/${cartProduct.id}`);
          }
        })
      );
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='p-2 flex flex-col gap-5 justify-center items-center'>
        {dataAddress?.length === 0 ? (
          <>
            <button className='text-[12px] w-full bg-white border-1 text-[#666666] px-[6px] py-[5px] rounded-md '>
              Agregar domicilio
            </button>
          </>
        ) : (
          <div className='border-1 p-2 shadow-sm rounded-lg'>
            <div className='absolute p-1 border-1 rounded-full'>
              <HiOfficeBuilding size={15} />
            </div>
            {dataAddress?.map((address: Address) => (
              <div
                key={address.id}
                className='flex justify-between items-center gap-4 px-9 py-1'
              >
                <div className='flex flex-col gap-1'>
                  <h4 className='font-normal text-sm'>
                    Dirección de domicilio
                  </h4>
                  <p className='font-semibold'>
                    {address.city}, {address.state}, {address.address},{' '}
                    {address.neighborhood}
                  </p>
                  <p className='font-semibold'>
                    {address.country}, {address.phone}
                  </p>
                </div>
                <button className='text-[12px] bg-white border-1 text-[#666666] px-[6px] py-[5px] rounded-md '>
                  Cambiar
                </button>
              </div>
            ))}
          </div>
        )}

        {dataCard?.length === 0 ? (
          <>
            <button className='text-[12px] w-full bg-white border-1 text-[#666666] px-[6px] py-[5px] rounded-md '>
              Agregar tarjeta
            </button>
          </>
        ) : (
          <div className='relative shadow-sm border-1 p-2 rounded-lg w-full flex justify-between  items-center'>
            <div className='absolute top-2 p-1 border-1 rounded-full'>
              <HiCreditCard size={15} />
            </div>
            <div className='flex flex-col gap-1'>
              {dataCard?.map((card: Card) => (
                <div
                  key={card.id}
                  className='flex justify-between items-center gap-4 px-9 py-1'
                >
                  <div className='flex gap-4 items-center'>
                    <div className='flex flex-col gap-1'>
                      <h4 className='font-normal text-sm'>Cuenta de pago</h4>
                      <p className='font-semibold'>
                        {card.card_number
                          .replace(/.(?=.{4})/g, '*')
                          .replace(/\s/g, '')
                          .replace(/(.{4})/g, '$1')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setPayment(false)}
              className='text-[12px] bg-white border-1 text-[#666666] px-[6px] py-[5px] rounded-md '
            >
              Agregar tarjeta
            </button>
          </div>
        )}
        <button
          onClick={async () => {
            await updateStock(cart);
          }}
          className='font-medium bg-black p-2 text-white px-[12px] text-[14px] rounded-md hover:bg-gray-900 w-full flex'
        >
          Pagar{' '}
          {finalPrice === 0 ? (
            <ClipLoader
              size={35}
              color='#000000'
              loading={true}
              aria-label='Loading Spinner'
              data-testid='loader'
            />
          ) : (
            <>${finalPrice}</>
          )}
        </button>
      </div>
    </div>
  );
}
