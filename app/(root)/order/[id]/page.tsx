import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getOrderById } from '@/lib/actions/order.actions';

export const metadata: Metadata = {
  title: 'Order Details',
};

const OrderDetailsPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const params = await props.params;

  const { id } = params;

  const order = await getOrderById(id);
  if (!order) notFound();

  return (
    <>
      Order Details Page: {id}
    </>
  );
};

export default OrderDetailsPage;