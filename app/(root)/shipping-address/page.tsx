import { redirect } from 'next/navigation';
import { type Metadata } from 'next';
import { type ShippingAddress } from '@/types';
import { auth } from '@/auth';
import { getMyCart } from '@/lib/actions/cart.actions';
import { getUserById } from '@/lib/actions/user.actions';

export const metadata: Metadata = {
  title: 'Shipping Address',
};

const ShippingAddressPage = async () => {
  const cart = await getMyCart();

  if (!cart || cart.items.length === 0) redirect('/cart');

  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) throw new Error('User ID not found');

  const user = await getUserById(userId);

  return (
    <div>
      ShippingAddressPage
    </div>
  );
};

export default ShippingAddressPage;