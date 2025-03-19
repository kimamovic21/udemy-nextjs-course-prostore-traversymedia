import { Button } from '@/components/ui/button';
import { type Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Unauthorized Access'
};

const UnauthorizedPage = () => {
  return (
    <div className='container mx-auto flex flex-col items-center justify-center space-y-4 h-[calc(100vh-200px)]'>
      <h2 className='h2-bold text-4xl'>Unauthorized Access</h2>
      <p className='text-muted-foreground'>
        You do not have permission to access this page
      </p>
      <Button asChild>
        <Link href='/'>Return Home</Link>
      </Button>
    </div>
  );
};

export default UnauthorizedPage;