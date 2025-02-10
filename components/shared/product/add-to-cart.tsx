'use client';

import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { type CartItem } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { addItemToCart } from '@/lib/actions/cart.actions';
import { ToastAction } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';

const AddToCart = ({ item }: { item: CartItem }) => {
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

    toast({
      description: `${item.name} added to the cart`,
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

  return (
    <Button className='w-full' type='button' onClick={handleAddToCart}>
      <span><Plus /></span>
      <span>Add To Cart</span>
    </Button>
  );
};

export default AddToCart;