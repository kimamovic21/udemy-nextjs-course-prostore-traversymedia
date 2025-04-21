import { SessionProvider } from 'next-auth/react'
import { type Metadata } from 'next';
import { auth } from '@/auth';
import NewPasswordForm from './new-password-form';

export const metadata: Metadata = {
  title: 'Change Password'
};

const SettingsPage = async () => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className='max-w-md mx-auto space-y-4'>
        <h2 className='h2-bold'>
          Settings
        </h2>

        <h3 className='h3-bold'>
          Change Password
        </h3>

        <NewPasswordForm />
      </div>
    </SessionProvider>
  );
};

export default SettingsPage;