import { ShoppingCart, UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import ModeToggle from './mode-toggle';

const Header = () => {
  return (
    <header className='w-full border-b'>
      <div className='wrapper flex-between'>
        <div className='flex-start'>
          <Link href='/' className='flex-start'>
            <Image
              src='/images/logo.svg'
              alt={`${APP_NAME} logo`}
              width={48}
              height={48}
              priority={true}
            />
            <span className='hidden lg:block font-bold text-2xl ml-3'>
              {APP_NAME}
            </span>
          </Link>
        </div>

        <div className='space-x-2'>  
          <ModeToggle />

          <Button asChild variant='ghost'>
            <Link href='/cart'>
              <span><ShoppingCart /></span>
              <span>Cart</span>
            </Link>
          </Button>

          <Button asChild>
            <Link href='/sign-in'>
              <span><UserIcon /></span>
              <span>Sign In</span> 
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;