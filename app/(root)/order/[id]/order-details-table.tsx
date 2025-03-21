'use client';

import { useTransition } from 'react';
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import { 
  formatCurrency, 
  formatDateTime, 
  formatId 
} from '@/lib/utils';
import {
  approvePayPalOrder, 
  createPayPalOrder,
  updateOrderToPaidCOD,
  deliverOrder 
} from '@/lib/actions/order.actions';
import { useToast } from '@/hooks/use-toast';
import { type Order } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const OrderDetailsTable = ({ 
  order, 
  paypalClientId,
  isAdmin 
}: { 
  order: Order;
  paypalClientId: string;
  isAdmin: boolean;
}) => {
  const {
    id,
    shippingAddress,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  const { toast } = useToast();

  const PrintLoadingState = () => {
    const [{ isPending, isRejected }] = usePayPalScriptReducer();

    let status = '';

    if (isPending) {
      status = 'Loading PayPal...';
    } else if (isRejected) {
      status = 'Error in loading PayPal!';
    };
    return status;
  };

  const handleCreatePayPalOrder = async () => {
    const res = await createPayPalOrder(order.id);
    if (!res.success)
      return toast({
        description: res.message,
        variant: 'destructive',
      });
    return res.data;
  };

  const handleApprovePayPalOrder = async (data: { orderID: string }) => {
    const res = await approvePayPalOrder(order.id, data);
    toast({
      description: res.message,
      variant: res.success ? 'default' : 'destructive',
    });
  };

  // Button to mark order as paid
  const MarkAsPaidButton = () => {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    return (
      <Button
        type='button'
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const res = await updateOrderToPaidCOD(order.id);
            toast({
              variant: res.success ? 'default' : 'destructive',
              description: res.message,
            });
          })
        }
      >
        {isPending ? 'processing...' : 'Mark As Paid'}
      </Button>
    );
  };

  // Button To mark the order as delivered
  const MarkAsDeliveredButton = () => {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    return (
      <Button
        type='button'
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const res = await deliverOrder(order.id);
            toast({
              variant: res.success ? 'default' : 'destructive',
              description: res.message,
            });
          })
        }
      >
        {isPending ? 'processing...' : 'Mark As Delivered'}
      </Button>
    );
  };

  return (
    <>
      <h2 className='py-4 text-2xl'>
        <span className='mr-1'>Order</span>
        <span>{formatId(id)}</span>
      </h2>
      <div className='grid md:grid-cols-3 md:gap-5'>
        <div className='overflow-x-auto md:col-span-2 space-y-4'>
          <Card>
            <CardContent className='p-4 gap-4'>
              <h3 className='text-xl pb-4'>Payment Method</h3>
              <p className='mb-2'>{paymentMethod}</p>
              <span>
                {isPaid ? (
                  <Badge variant='secondary'>
                    Paid at {formatDateTime(paidAt!).dateTime}
                  </Badge>
                ) : (
                  <Badge variant='destructive'>Not paid</Badge>
                )}
              </span>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-4 gap-4'>
              <h2 className='text-xl pb-4'>Shipping Address</h2>
              <p>{shippingAddress.fullName}</p>
              <p className='mb-2'>
                <span className='mr-1'>{shippingAddress.streetAddress},</span>
                <span className='mr-1'>{shippingAddress.city},</span>
                <span className='mr-1'>{shippingAddress.postalCode},</span>
                <span>{shippingAddress.country}</span>
              </p>
              <span>
                {isDelivered ? (
                  <Badge variant='secondary'>
                    Delivered at {formatDateTime(deliveredAt!).dateTime}
                  </Badge>
                ) : (
                  <Badge variant='destructive'>Not delivered</Badge>
                )}
              </span>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-4 gap-4'>
              <h2 className='text-xl pb-4'>Order Items</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderItems?.map((item) => (
                    <TableRow key={item.slug}>
                      <TableCell>
                        <Link
                          href={`/product/${item.slug}`}
                          className='flex items-center'
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                          <span className='px-2'>{item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <span className='px-2'>{item.qty}</span>
                      </TableCell>
                      <TableCell className='text-right'>
                        ${item.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className='mt-4 md:mt-0'>
          <Card>
            <CardContent className='p-4 space-y-4 gap-4'>
              <h2 className='text-xl pb-4'>Order Summary</h2>
              <div className='flex justify-between'>
                <div>Items</div>
                <div>{formatCurrency(itemsPrice)}</div>
              </div>
              <div className='flex justify-between'>
                <div>Tax</div>
                <div>{formatCurrency(taxPrice)}</div>
              </div>
              <div className='flex justify-between'>
                <div>Shipping</div>
                <div>{formatCurrency(shippingPrice)}</div>
              </div>
              <div className='flex justify-between'>
                <div>Total</div>
                <div>{formatCurrency(totalPrice)}</div>
              </div>

              {/* PayPal Payment */}
              {!isPaid && paymentMethod === 'PayPal' && (
                <div>
                  <PayPalScriptProvider options={{ clientId: paypalClientId }}>
                    <PrintLoadingState />
                    <PayPalButtons 
                      createOrder={handleCreatePayPalOrder} 
                      onApprove={handleApprovePayPalOrder}
                    />
                  </PayPalScriptProvider>
                </div>
              )}

              {/* Cash On Delivery */}
              {isAdmin && !isPaid && paymentMethod === 'CashOnDelivery' && (
                <MarkAsPaidButton />
              )}

              {isAdmin && isPaid && !isDelivered && (
                <MarkAsDeliveredButton />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsTable;