import { useFormStatus } from 'react-dom';
import { Check, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PlaceOrderButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className='w-full'>
      <span>
        {pending ? (
          <Loader className='w-4 h-4 animate-spin' />
        ) : (
          <Check className='w-4 h-4' />
        )}
      </span>
      <span>Place Order</span> 
    </Button>
  );
};

export default PlaceOrderButton;