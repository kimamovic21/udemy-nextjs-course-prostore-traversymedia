import { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Sign In',
};

const SignInPage = () => {
  return (
    <div className='w-full max-w-md mx-auto'>
      <Card>
        <CardHeader className='space-y-4'>
          <Link href='/' className='flex-center'>
            <Image
              src='/images/logo.svg'
              alt={`${APP_NAME} logo`}
              width={100}
              height={100}
              priority={true}
            />
          </Link>

          <CardTitle className='text-center'>
            Sign In
          </CardTitle>

          <CardDescription className='text-center'>
            Select a method to sign in to your account
          </CardDescription>
        </CardHeader>

        <CardContent className='space-y-4'>
          {/* FORM HERE */}
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;