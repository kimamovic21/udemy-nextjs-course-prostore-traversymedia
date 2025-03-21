import { type Metadata } from 'next';
import { formatCurrency, formatDateTime, formatId } from '@/lib/utils';
import { getMyOrders } from '@/lib/actions/order.actions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Pagination from '@/components/shared/pagination';

export const metadata: Metadata = {
  title: 'My Orders',
};

const OrdersPage = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await props.searchParams;

  const orders = await getMyOrders({
    page: Number(page) || 1,
  });

  return (
    <div className='space-y-2'>
      <h2 className='h2-bold'>Orders</h2>
      <div className='overflow-x-auto'>
        {orders?.data?.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>DATE</TableHead>
                <TableHead>TOTAL</TableHead>
                <TableHead>PAID</TableHead>
                <TableHead>DELIVERED</TableHead>
                <TableHead>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders?.data?.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    {formatId(order.id)}
                  </TableCell>

                  <TableCell>
                    {formatDateTime(order.createdAt).dateTime}
                  </TableCell>

                  <TableCell>
                    {formatCurrency(order.totalPrice)}
                  </TableCell>

                  <TableCell>
                    {order.isPaid && order.paidAt ? (
                      <span className='text-green-700'>
                        {formatDateTime(order.paidAt).dateTime}
                      </span>
                    ) : (
                      <span className='text-red-600'>Not Paid</span>
                    )}
                  </TableCell>

                  <TableCell>
                    {order.isDelivered && order.deliveredAt ? (
                      <span className='text-green-700'>
                        {formatDateTime(order.deliveredAt).dateTime}
                      </span>
                    ) : (
                      <span className='text-red-600'>Not Delivered</span>
                    )}
                  </TableCell>
                  
                  <TableCell>
                    <Button asChild variant='outline' size='sm'>
                      <Link href={`/order/${order.id}`}>Details</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className='text-center text-gray-600 mt-4'>
            No orders found.
          </p>
        )}

        {orders.totalPages > 1 && (
          <Pagination
            page={Number(page) || 1}
            totalPages={orders?.totalPages}
          />
        )}
      </div>
    </div>
  );
};

export default OrdersPage;