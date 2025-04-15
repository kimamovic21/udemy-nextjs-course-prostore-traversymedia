'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { auth } from '@/auth';
import { formatError } from '../utils';
import { insertReviewSchema } from '../validators'; 
import { prisma } from '@/db/prisma';

// Create & Update Review
export async function createUpdateReview(
  data: z.infer<typeof insertReviewSchema>
) {
  try {
    const session = await auth();
    if (!session) throw new Error('User is not authenticated');

    // Validate and store the review
    const review = insertReviewSchema.parse({
      ...data,
      userId: session?.user.id,
    });

    // Get the product that is being reviewed
    const product = await prisma.product.findFirst({
      where: { id: review.productId },
    });

    if (!product) throw new Error('Product not found');

    // Check if user already reviewed the product
    const reviewExists = await prisma.review.findFirst({
      where: {
        productId: review.productId,
        userId: review.userId,
      },
    });

    await prisma.$transaction(async (tx) => {
      if (reviewExists) {
        // Update review
        await tx.review.update({
          where: { id: reviewExists.id },
          data: {
            description: review.description,
            title: review.title,
            rating: review.rating,
          },
        });
      } else {
        // Create review
        await tx.review.create({ data: review });
      };

      // Get average rating
      const averageRating = await tx.review.aggregate({
        _avg: { rating: true },
        where: { productId: review.productId },
      });

      // Get number of reviews
      const numReviews = await tx.review.count({
        where: { productId: review.productId },
      });

      // Update the rating and number of reviews in product table
      await tx.product.update({
        where: { id: review.productId },
        data: {
          rating: averageRating._avg.rating || 0,
          numReviews: numReviews,
        },
      });
    });

    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: 'Review updated successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  };
};