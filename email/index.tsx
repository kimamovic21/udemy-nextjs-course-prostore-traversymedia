import { Resend } from 'resend';
import { type Order } from '@/types';
import { SENDER_EMAIL, APP_NAME } from '@/lib/constants';
import dotenv from 'dotenv';
import PurchaseReceiptEmail from './purchase-receipt-email';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function sendPurchaseReceipt({ order }: { order: Order }) {
  await resend.emails.send({
    from: `${APP_NAME} <${SENDER_EMAIL}>`,
    to: order.user.email,
    subject: `Order Confirmation ${order.id}`,
    react: <PurchaseReceiptEmail order={order} />
  });
};