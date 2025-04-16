'use client';

import { useState, useEffect } from 'react';
import { Calendar, User } from 'lucide-react';
import { type Review } from '@/types';
import { getReviews } from '@/lib/actions/review.actions';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import Link from 'next/link';
import ReviewForm from './review-form';
import { formatDateTime } from '@/lib/utils';
import Rating from '@/components/shared/product/rating';

const ReviewList = ({
  userId,
  productId,
  productSlug,
}: {
  userId: string;
  productId: string;
  productSlug: string;
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const loadReviews = async () => {
      const res = await getReviews({ productId });
      setReviews(res.data);
    };

    loadReviews();
  }, [productId]);

  const reload = async () => {
    console.log('review submitted');
  };

  return (
    <div className='space-y-4'>
      {reviews.length === 0 && <div>No reviews yet.</div>}

      {userId ? (
        <>
          <ReviewForm
            userId={userId}
            productId={productId}
            onReviewSubmitted={reload}
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
        {reviews?.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className='flex-between'>
                <CardTitle>
                  {review.title}
                </CardTitle>
              </div>

              <CardDescription>
                {review.description}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className='flex space-x-4 text-sm text-muted-foreground'>
                <Rating value={review.rating} />

                <div className='flex items-center'>
                  <span><User className='mr-1 h-3 w-3' /></span>
                  <span>{review.user ? review.user.name : 'Deleted User'}</span>
                </div>
                <div className='flex items-center'>
                  <span><Calendar className='mr-1 h-3 w-3' /></span>
                  <span>{formatDateTime(review.createdAt).dateTime}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;