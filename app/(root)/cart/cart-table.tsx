'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { ArrowRight, Loader, Minus, Plus } from 'lucide-react';
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions';
import { type Cart } from '@/types';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import Image from 'next/image';

const CartTable = ({ cart }: { cart?: Cart }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <h2 className='py-4 h2-bold'>
        Shopping Cart
      </h2>
      {!cart || cart.items.length === 0 ? (
        <div>
          Cart is empty. <Link href='/'>Go Shopping</Link>
        </div>
      ) : (
        <div className='grid md:grid-cols-4 md:gap-5'>
          <div className='overflow-x-auto md:col-span-3'>
            Table
          </div>
        </div>
      )}
    </>
  );
};

export default CartTable;