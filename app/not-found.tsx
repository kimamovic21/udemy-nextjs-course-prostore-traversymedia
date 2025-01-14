'use client';

import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <Image
        src='/images/logo.svg'
        alt={`${APP_NAME} logo`}
        width={48}
        height={48}
        priority={true}
      />
      <div className='p-6 rounded-lg shadow-md w-1/3 text-center'>
        <h2 className='text-3xl font-bold mb-4'>
          Not Found
        </h2>
        <p className='text-destructive'>
          Could not find requested resource
        </p>
        <Link
          href='/'
          className='block mt-2 hover:underline'
        >
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;