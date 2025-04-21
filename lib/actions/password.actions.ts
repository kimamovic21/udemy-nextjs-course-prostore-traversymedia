'use server';

import { hashSync, compareSync } from 'bcrypt-ts-edge';
import { auth } from '@/auth';
import { prisma } from '@/db/prisma';
import { changePasswordSchema } from '../validators';
import { formatError } from '../utils';

export async function changePassword(prevState: unknown, formData: FormData) {
  try {
    const session = await auth();

    if (!session?.user?.id) throw new Error('User not authenticated');

    const data = {
      currentPassword: formData.get('currentPassword'),
      newPassword: formData.get('newPassword'),
      confirmNewPassword: formData.get('confirmNewPassword'),
    };

    const parsed = changePasswordSchema.parse(data);

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) throw new Error('User not found');

    const isPasswordValid = compareSync(parsed.currentPassword, user.password!);

    if (!isPasswordValid) {
      return {
        success: false,
        message: 'Something went wrong. Please try again.',
      };
    };

    const hashedNewPassword = hashSync(parsed.newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedNewPassword },
    });

    return {
      success: true,
      message: 'Password changed successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  };
};
