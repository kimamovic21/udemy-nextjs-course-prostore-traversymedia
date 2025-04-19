'use client';

import { useEffect, useState } from 'react';
import { Gift, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';

const PRODUCT_TARGET_DATE = new Date(
  process.env.NEXT_PUBLIC_PRODUCT_TARGET_DATE! || '2025-12-31T00:00:00'
);

const calculateTimeRemaining = (targetDate: Date) => {
  const currentTime = new Date();
  const timeDifference = Math.max(Number(targetDate) - Number(currentTime), 0);

  return {
    days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
    hours: Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    ),
    minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((timeDifference % (1000 * 60)) / 1000),
  };
};

const DealCountdown = () => {
  const [time, setTime] = useState<ReturnType<typeof calculateTimeRemaining>>();

  useEffect(() => {
    setTime(calculateTimeRemaining(PRODUCT_TARGET_DATE));

    const timerInterval = setInterval(() => {
      const newTime = calculateTimeRemaining(PRODUCT_TARGET_DATE);
      setTime(newTime);

      if (
        newTime.days === 0 &&
        newTime.hours === 0 &&
        newTime.minutes === 0 &&
        newTime.seconds === 0
      ) {
        clearInterval(timerInterval);
      };

      return () => clearInterval(timerInterval);
    }, 1000);
  }, []);

  if (!time) {
    return (
      <section className='grid grid-cols-1 md:grid-cols-2 my-20'>
        <div className='flex flex-col gap-2 justify-center'>
          <h3 className='text-3xl font-bold'>Loading Countdown...</h3>
        </div>
      </section>
    );
  };

  if (
    time.days === 0 &&
    time.hours === 0 &&
    time.minutes === 0 &&
    time.seconds === 0
  ) {
    return (
      <section className='grid grid-cols-1 md:grid-cols-2 my-20'>
        <div className='flex flex-col gap-2 justify-center'>
          <h3 className='text-3xl font-bold text-red-600'>
            Deal Has Ended!
          </h3>
          <p>
            This deal is no longer available. Check out our latest promotions!
          </p>

          <div className='text-center'>
            <Button asChild>
              <Link href='/search'>View Products</Link>
            </Button>
          </div>
        </div>
        <div className='flex justify-center'>
          <Image
            src='/images/promo.webp'
            alt='promotion'
            width={300}
            height={200}
          />
        </div>
      </section>
    );
  };

  return (
    <section className='grid grid-cols-1 md:grid-cols-2 my-20'>
      <div className='flex flex-col gap-2 justify-center'>
        <h3 className='text-3xl font-bold'>Deal Of The Month</h3>
        <div>
          <p>
            Get ready for a shopping experience like never before with our Deals
            of the Month! Every purchase comes with exclusive perks and offers,
            making this month a celebration of savvy choices and amazing deals.
          </p>

          <p className='flex gap-2'>
            <span>
              Don&apos;t miss out!
            </span>
            <span>
              <Gift />
            </span>
            <span>
              <ShoppingCart />
            </span>
          </p>
        </div>

        <ul className='grid grid-cols-4'>
          <StatBox label='Days' value={time.days} />
          <StatBox label='Hours' value={time.hours} />
          <StatBox label='Minutes' value={time.minutes} />
          <StatBox label='Seconds' value={time.seconds} />
        </ul>

        <div className='text-center'>
          <Button asChild>
            <Link href='/search'>View Products</Link>
          </Button>
        </div>
      </div>

      <div className='flex justify-center'>
        <Image
          src='/images/promo.webp'
          alt='promotion'
          width={300}
          height={200}
        />
      </div>
    </section>
  );
};

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <li className='p-4 w-full text-center'>
    <p className='text-3xl font-bold'>
      {value}
    </p>
    <p>
      {label}
    </p>
  </li>
);

export default DealCountdown; 