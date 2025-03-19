import { type Metadata } from 'next';
import { BadgeDollarSign, Barcode, CreditCard, Users } from 'lucide-react';
import { auth } from '@/auth';
import { getOrderSummary } from '@/lib/actions/order.actions';
import { formatCurrency, formatDateTime, formatNumber } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
};

const AdminOverviewPage = async () => {
  const session = await auth();

  if (session?.user?.role !== 'admin') throw new Error('User is not authorized');

  const summary = await getOrderSummary();

  return (
    <div className='space-y-2'>
      <h2 className='h2-bold'>Admin Dashboard</h2>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Revenue
            </CardTitle>
            <BadgeDollarSign />
          </CardHeader>
          <CardContent>
            <span className='text-2xl font-bold'>
              {formatCurrency(summary.totalSales._sum.totalPrice?.toString() || 0)}
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Sales
            </CardTitle>
            <CreditCard />
          </CardHeader>
          <CardContent>
            <span className='text-2xl font-bold'>
              {formatNumber(summary.ordersCount)}
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Customers
            </CardTitle>
            <Users />
          </CardHeader>
          <CardContent>
            <span className='text-2xl font-bold'>
              {summary.usersCount}
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Products
            </CardTitle>
            <Barcode />
          </CardHeader>
          <CardContent>
            <span className='text-2xl font-bold'>
              {summary.productsCount}
            </span>
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <Card className='col-span-4'>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className='pl-2'>
            CHART
          </CardContent>
        </Card>

        <Card className='col-span-3'>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>BUYER</TableHead>
                  <TableHead>DATE</TableHead>
                  <TableHead>TOTAL</TableHead>
                  <TableHead>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {summary?.latestOrders?.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      {order?.user?.name ? order?.user?.name : 'Deleted user'}
                    </TableCell>

                    <TableCell>
                      {formatDateTime(order.createdAt).dateOnly}
                    </TableCell>

                    <TableCell>
                      {formatCurrency(order.totalPrice)}
                    </TableCell>

                    <TableCell>
                      <Link 
                        href={`/order/${order.id}`}
                        className='text-blue-500 hover:underline hover:text-blue-600'
                      >
                        Details
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverviewPage;