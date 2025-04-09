'use client';

import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type ControllerRenderProps } from 'react-hook-form';
import { updateUserSchema } from '@/lib/validators';
import { useToast } from '@/hooks/use-toast';
import { USER_ROLES } from '@/lib/constants';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { updateUser } from '@/lib/actions/user.actions';

const UpdateUserForm = ({
  user,
}: {
  user: z.infer<typeof updateUserSchema>;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: user,
  });

  const onSubmit = async (values: z.infer<typeof updateUserSchema>) => {
    try {
      const res = await updateUser({
        ...values,
        id: user.id,
      });
  
      if (!res.success)
        return toast({
          variant: 'destructive',
          description: res.message,
        });
  
      toast({
        variant: 'default',
        description: res.message,
      });
  
      form.reset();
      router.push('/admin/users');
    } catch (error) {
      toast({
        variant: 'destructive',
        description: (error as Error).message,
      });
    };
  };

  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        {/* Email */}
        <div>
          <FormField
            control={form.control}
            name='email'
            render={({
              field,
            }: {
              field: ControllerRenderProps<z.infer<typeof updateUserSchema>, 'email'>;
            }) => (
              <FormItem className='w-full'>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled={true} placeholder='Enter user email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Name */}
        <div>
          <FormField
            control={form.control}
            name='name'
            render={({
              field,
            }: {
              field: ControllerRenderProps<z.infer<typeof updateUserSchema>, 'name'>;
            }) => (
              <FormItem className='w-full'>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter user name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Role */}
        <div>
          <FormField
            control={form.control}
            name='role'
            render={({
              field,
            }: {
              field: ControllerRenderProps<z.infer<typeof updateUserSchema>, 'role'>;
            }) => (
              <FormItem className=' items-center'>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} value={field.value.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a role' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {USER_ROLES?.map((role) => (
                      <SelectItem key={role} value={role}>
                        <span className='capitalize'>{role}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex-between'>
          <Button
            type='submit'
            className='w-full mt-4'
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Submitting...' : `Update User `}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateUserForm;