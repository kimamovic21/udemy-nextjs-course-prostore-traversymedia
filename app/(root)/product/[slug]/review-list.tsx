'use client';

import { useState } from 'react';
import { type Review } from '@/types';
import Link from 'next/link';
import ReviewForm from './review-form';

const ReviewList = ({
  userId,
  productId,
  productSlug,
}: {
  userId: string;
  productId: string;
  productSlug: string;
}) => {
  // console.log(userId, productId, productSlug);
  const [reviews, setReviews] = useState<Review[]>([]);

  return (
    <div className='space-y-4'>
      {reviews.length === 0 && <div>No reviews yet.</div>}

      {userId ? (
        <>
          <ReviewForm 
            userId={userId}
            productId={productId} 
          />
        </>
      ) : (
        <div>
          <span>Please</span>
          <Link
            className='-ml-1 px-2 text-blue-700 hover:underline'
            href={`/api/auth/signin?callbackUrl=/product/${productSlug}`}
          >
            sign in
          </Link>
          <span className='-ml-1'>to write a review.</span>
        </div>
      )}

      <div className='flex flex-col gap-3'>
        {/* REVIEWS HERE */}
      </div>
    </div>
  );
};

export default ReviewList;