'use client';

import { useEffect, useRef, useState, useActionState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { changePassword } from '@/lib/actions/password.actions';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const initialState = {
  success: false,
  message: '',
};

const NewPasswordForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction] = useActionState(changePassword, initialState);

  const { toast } = useToast();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? 'Success' : 'Error',
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      });
    };

    if (state.success && formRef.current) {
      formRef.current.reset();
    };
  }, [state, toast]);

  return (
    <form ref={formRef} action={formAction} className='space-y-4'>
      <div className='space-y-2 relative'>
        <Label htmlFor='currentPassword'>Current Password</Label>
        <Input
          type={showCurrent ? 'text' : 'password'}
          name='currentPassword'
          id='currentPassword'
          required
        />
        <span
          onClick={() => setShowCurrent((prev) => !prev)}
          className='absolute right-3 top-[34px] cursor-pointer text-xl text-muted-foreground'
        >
          {showCurrent ? <IoMdEyeOff /> : <IoMdEye />}
        </span>
      </div>

      <div className='space-y-2 relative'>
        <Label htmlFor='newPassword'>New Password</Label>
        <Input
          type={showNew ? 'text' : 'password'}
          name='newPassword'
          id='newPassword'
          required
        />
        <span
          onClick={() => setShowNew((prev) => !prev)}
          className='absolute right-3 top-[34px] cursor-pointer text-xl text-muted-foreground'
        >
          {showNew ? <IoMdEyeOff /> : <IoMdEye />}
        </span>
      </div>

      <div className='space-y-2 relative'>
        <Label htmlFor='confirmNewPassword'>Confirm New Password</Label>
        <Input
          type={showConfirm ? 'text' : 'password'}
          name='confirmNewPassword'
          id='confirmNewPassword'
          required
        />
        <span
          onClick={() => setShowConfirm((prev) => !prev)}
          className='absolute right-3 top-[34px] cursor-pointer text-xl text-muted-foreground'
        >
          {showConfirm ? <IoMdEyeOff /> : <IoMdEye />}
        </span>
      </div>

      <Button type='submit' className='w-full'>
        Change Password
      </Button>
    </form>
  );
};

export default NewPasswordForm;