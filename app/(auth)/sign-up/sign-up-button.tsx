import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

const SignUpButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className='w-full' variant='default'>
      {pending ? 'Submitting...' : 'Sign Up'}
    </Button>
  );
};

export default SignUpButton;