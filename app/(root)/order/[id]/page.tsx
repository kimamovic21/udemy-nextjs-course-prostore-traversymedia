import { notFound, redirect } from 'next/navigation';
import { type Metadata } from 'next';
import { type ShippingAddress } from '@/types';
import { auth } from '@/auth';
import { getOrderById } from '@/lib/actions/order.actions';
import Stripe from 'stripe';
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

  if (order.userId !== session?.user.id && session?.user.role !== 'admin') {
    return redirect('/unauthorized');
  };

  let client_secret = null;

  if (order.paymentMethod === 'Stripe' && !order.isPaid) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(order.totalPrice) * 100),
      currency: 'USD',
      metadata: { orderId: order.id },
    });

    client_secret = paymentIntent.client_secret;
  };

  return (
    <>
      <OrderDetailsTable
        order={{
          ...order,
          shippingAddress: order.shippingAddress as ShippingAddress,
        }}
        paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'}
        stripeClientSecret={client_secret}
        isAdmin={session?.user?.role === 'admin' || false}
      />
    </>
  );
};

export default OrderDetailsPage;