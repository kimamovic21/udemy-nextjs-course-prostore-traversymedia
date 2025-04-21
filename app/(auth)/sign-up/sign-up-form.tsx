'use client';

import { useState, useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signUpDefaultValues } from '@/lib/constants';
import { signUpUser } from '@/lib/actions/user.actions';
import Link from 'next/link';
import SignUpButton from './sign-up-button';

const SignUpForm = () => {
  const [data, action] = useActionState(signUpUser, {
    message: '',
    success: false,
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(prev => !prev);

  return (
    <form action={action}>
      <input type='hidden' name='callbackUrl' value={callbackUrl} />
      <div className='space-y-6'>
        <div>
          <Label htmlFor='name'>Username</Label>
          <Input
            id='name'
            name='name'
            type='text'
            defaultValue={signUpDefaultValues.name}
            autoComplete='name'
          />
        </div>
        <div>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            name='email'
            type='text'
            defaultValue={signUpDefaultValues.email}
            autoComplete='email'
          />
        </div>

        <div>
          <Label htmlFor='password'>Password</Label>
          <div className='relative'>
            <Input
              id='password'
              name='password'
              type={showPassword ? 'text' : 'password'}
              defaultValue={signUpDefaultValues.password}
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
          <Label htmlFor='confirmPassword'>Confirm Password</Label>
          <div className='relative'>
            <Input
              id='confirmPassword'
              name='confirmPassword'
              type={showConfirmPassword ? 'text' : 'password'}
              defaultValue={signUpDefaultValues.confirmPassword}
              autoComplete='current-password'
            />
            <button
              type='button'
              onClick={toggleConfirmPasswordVisibility}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-xl text-muted-foreground hover:underline'
            >
              {showConfirmPassword ? <IoMdEyeOff /> : <IoMdEye />}
            </button>
          </div>
        </div>

        <div>
          <SignUpButton />
        </div>

        {!data.success && (
          <div className='text-center text-destructive'>
            {data.message}
          </div>
        )}

        <div className='text-sm text-center text-muted-foreground'>
          <p>
            <span className='mr-1'>Already have an account?</span>
            <Link
              target='_self'
              className='link text-blue-500 hover:underline'
              href={`/sign-in?callbackUrl=${callbackUrl}`}
            >
              Sign in here
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

export default SignUpForm;