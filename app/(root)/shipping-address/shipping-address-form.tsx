'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { type ShippingAddress } from '@/types';
import { shippingAddressSchema } from '@/lib/validators';
import { shippingAddressDefaultValues } from '@/lib/constants';
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ShippingAddressForm = ({ address }: { address: ShippingAddress }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: address || shippingAddressDefaultValues,
  });

  const onSubmit = (values: z.infer<typeof shippingAddressSchema>) => {
    console.log(values);
    return;
  };

  return (
    <>
      <div className='max-w-md mx-auto space-y-4'>
        <h2 className='h2-bold mt-4'>Shipping Address</h2>
        <p className='text-sm text-muted-foreground'>
          Please enter an address to ship to
        </p>
        <Form {...form}>
          <form
            method='post'
            className='space-y-4'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className='flex flex-col md:flex-row gap-5'>
              <FormField
                control={form.control}
                name='fullName'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter full name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex flex-col md:flex-row gap-5'>
              <FormField
                control={form.control}
                name='streetAddress'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter Address' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex flex-col md:flex-row gap-5'>
              <FormField
                control={form.control}
                name='city'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter City' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex flex-col md:flex-row gap-5'>
              <FormField
                control={form.control}
                name='postalCode'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter postal code' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex flex-col md:flex-row gap-5'>
              <FormField
                control={form.control}
                name='country'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter country' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex gap-2'>
              <Button type='submit' disabled={isPending}>
                <span>
                  {isPending ? (
                    <Loader className='w-4 h-4 animate-spin' />    
                  ) : (
                    <ArrowRight className='w-4 h-4' />
                  )}
                </span>
                <span>Continue</span>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ShippingAddressForm;