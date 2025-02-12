'use client';

import { useRouter } from 'next/navigation';
import { Plus, Minus } from 'lucide-react';
import { type CartItem, type Cart } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions';
import { ToastAction } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';

const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleAddToCart = async () => {
    const res = await addItemToCart(item);

    if (!res.success) {
      toast({
        variant: 'destructive',
        description: res.message,
      });
      return;
    };

    // Handle success add to cart
    toast({
      description: res.message,
      action: (
        <ToastAction
          className='bg-primary text-white hover:bg-gray-800'
          altText='Go to cart'
          onClick={() => router.push('/cart')}
        >
          Go to cart
        </ToastAction>
      ),
    });
  };

  const handleRemoveFromCart = async () => {
    const res = await removeItemFromCart(item.productId);

    toast({
      variant: res.success ? 'default' : 'destructive',
      description: res.message
    });

    return;
  };

  // Check if item is in cart
  const existItem = cart && cart.items.find((cartItem) => cartItem.productId === item.productId);

  return existItem ? (
    <div>
      <Button type='button' variant='outline' onClick={handleRemoveFromCart}>
        <Minus className='h-4 w-4' />
      </Button>
      <span className='px-2'>
        {existItem.qty}
      </span>
      <Button type='button' variant='outline' onClick={handleAddToCart}>
        <Plus className='h-4 w-4' />
      </Button>
    </div>
  ) : (
    <Button className='w-full' type='button' onClick={handleAddToCart}>
      <span><Plus /></span>
      <span>Add To Cart</span>
    </Button>
  );
};

export default AddToCart;