import { type Metadata } from 'next';
import { requireAdmin } from '@/lib/auth-guard';
import { deleteOrder, getAllOrders } from '@/lib/actions/order.actions';
import { formatCurrency, formatDateTime, formatId } from '@/lib/utils';
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
import DeleteDialog from '@/components/shared/delete-dialog';

export const metadata: Metadata = {
  title: 'Admin Orders',
};

const AdminOrdersPage = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  await requireAdmin();

  const { page = '1' } = await props.searchParams;

  const orders = await getAllOrders({
    page: Number(page),
    // limit: 2
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
                  <TableCell>{formatId(order.id)}</TableCell>

                  <TableCell>{formatCurrency(order.totalPrice)}</TableCell>

                  <TableCell>{formatCurrency(order.totalPrice)}</TableCell>

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

                  <TableCell className='flex gap-2'>
                    <Button asChild variant='outline' size='sm'>
                      <Link href={`/order/${order.id}`}>Details</Link>
                    </Button>
                    
                    <DeleteDialog 
                      id={order.id} 
                      action={deleteOrder}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className='text-center text-gray-600 mt-4'>No orders found.</p>
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

export default AdminOrdersPage;