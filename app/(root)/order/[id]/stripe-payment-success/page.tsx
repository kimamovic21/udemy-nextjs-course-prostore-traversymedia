import { notFound, redirect } from 'next/navigation';
import { type Metadata } from 'next';
import { getOrderById } from '@/lib/actions/order.actions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Stripe from 'stripe';

export const metadata: Metadata = {
  title: 'Stripe Payment Success',
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const SuccessPage = async (props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ payment_intent: string }>;
}) => {
  const { id } = await props.params;
  const { payment_intent: paymentIntentId } = await props.searchParams;

  const order = await getOrderById(id);
  if (!order) notFound();

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  if (paymentIntent.metadata.orderId == null || paymentIntent.metadata.orderId !== order.id.toString()) {
    return notFound();
  };

  const isSuccess = paymentIntent.status === 'succeeded';

  if (!isSuccess) return redirect(`/order/${id}`);

  return (
    <div className='max-w-4xl w-full mx-auto space-y-8'>
      <div className='flex flex-col gap-6 items-center '>
        <h2 className='h2-bold'>Thanks for your purchase.</h2>

        <h3>We are now processing your order.</h3>

        <Button asChild>
          <Link href={`/order/${id}`}>
            View order
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default SuccessPage;