'use client';

import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
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
          <Input
            id='password'
            name='password'
            required
            type='password'
            defaultValue={signInDefaultValues.password}
            autoComplete='current-password'
          />
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
          <span className='mr-1'>
            Don&apos;t have an account?
          </span> 
          <Link href='/sign-up' target='_self' className='link'>
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignInForm;