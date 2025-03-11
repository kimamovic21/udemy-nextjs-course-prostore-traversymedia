'use client';

import { useRouter } from 'next/navigation';
import { createOrder } from '@/lib/actions/order.actions';
import PlaceOrderButton from './place-order-button';

const PlaceOrderForm = () => {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await createOrder();

    if (res.redirectTo) {
      router.push(res.redirectTo);
    };
  };

  return (
    <form className='w-full' onSubmit={handleSubmit}>
      <PlaceOrderButton />
    </form>
  );
};

export default PlaceOrderForm;