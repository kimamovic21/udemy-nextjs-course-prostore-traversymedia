'use client';

import { useState, useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signInDefaultValues } from '@/lib/constants';
import { signInWithCredentials } from '@/lib/actions/user.actions';
import Link from 'next/link';
import SignInButton from './signin-button';

const CredentialsSignInForm = () => {
  const [data, action] = useActionState(signInWithCredentials, {
    message: '',
    success: false,
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  return (
    <form action={action}>
      <input
        type='hidden'
        name='callbackUrl'
        value={callbackUrl}
      />

      <div className='space-y-6'>
        <div>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            name='email'
            required
            type='email'
            defaultValue={signInDefaultValues.email}
            autoComplete='email'
          />
        </div>

        <div>
          <Label htmlFor='password'>Password</Label>
          <div className='relative'>
            <Input
              id='password'
              name='password'
              required
              type={showPassword ? 'text' : 'password'}
              defaultValue={signInDefaultValues.password}
              autoComplete='current-password'
            />
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-xl text-muted-foreground hover:underline'
            >
              {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
            </button>
          </div>
        </div>

        <div>
          <SignInButton />
        </div>

        {data && !data.success && (
          <div className='text-center text-destructive'>
            {data.message}
          </div>
        )}

        <div className='text-sm text-center text-muted-foreground'>
          <p>
            <span className='mr-1'>
              Don&apos;t have an account?
            </span>
            <Link
              href='/sign-up'
              target='_self'
              className='text-blue-500 hover:underline'
            >
              Sign up here
            </Link>
          </p>
          <p>
            <span className='mr-1'>Not interested ?</span>
            <Link
              href='/'
              target='_self'
              className='text-blue-500 hover:underline'
            >
              Go back to home page
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignInForm;