import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getOrderById } from '@/lib/actions/order.actions';
import { auth } from '@/auth';
import { type ShippingAddress } from '@/types';
import OrderDetailsTable from './order-details-table';

export const metadata: Metadata = {
  title: 'Order Details',
};

const OrderDetailsPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const session = await auth();

  const params = await props.params;

  const { id } = params;

  const order = await getOrderById(id);
  if (!order) notFound();

  return (
    <>
      <OrderDetailsTable
        order={{
          ...order,
          shippingAddress: order.shippingAddress as ShippingAddress,
        }}
        paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'}
        isAdmin={session?.user?.role === 'admin' || false}
      />
    </>
  );
};

export default OrderDetailsPage;