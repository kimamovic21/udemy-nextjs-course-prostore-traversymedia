import { z } from 'zod';
import { formatNumberWithDecimal } from './utils';
import { PAYMENT_METHODS } from './constants';

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    'Price must have exactly two decimal places'
  );

// Schema for inserting products
export const insertProductSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(30, 'Name must be at most 30 characters long'),
  slug: z
    .string()
    .min(3, 'Slug must be at least 3 characters')
    .max(30, 'Slug must be at most 30 characters long'),
  category: z
    .string()
    .min(3, 'Category must be at least 3 characters')
    .max(30, 'Category must be at most 30 characters long'),
  brand: z
    .string()
    .min(3, 'Brand must be at least 3 characters')
    .max(30, 'Brand must be at most 30 characters long'),
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters')
    .max(100, 'Description must be at most 100 characters long'),
  banner: z
    .string()
    .nullable(),
  images: z
    .array(z.string())
    .min(1, 'Product must have at least one image')
    .max(5, 'Product can have at most five images'),
  stock: z.coerce.number(),
  isFeatured: z.boolean(),
  price: currency,
});

// Schema for updating a product
export const updateProductSchema = insertProductSchema.extend({
  id: z
    .string()
    .min(1, 'Id is required'),
});

// Schema for signing in a user
export const signInFormSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(6, 'Email must be at least 6 characters long')
    .max(30, 'Email must be at most 30 characters long'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(30, 'Password must be at most 30 characters long'),
});

// Schema for signing up a user
export const signUpFormSchema = z.object({
  name: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must be at most 20 characters long'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(6, 'Email must be at least 6 characters long')
    .max(30, 'Email must be at most 30 characters long'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(30, 'Password must be at most 30 characters long'),
  confirmPassword: z
    .string()
    .min(6, 'Confirm password must be at least 6 characters long')
    .max(30, 'Confirm password must be at most 30 characters long'),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Schema for cart item
export const cartItemSchema = z.object({
  productId: z
    .string()
    .min(1, 'Product is required'),
  name: z
    .string()
    .min(1, 'Name is required'),
  slug: z
    .string()
    .min(1, 'Slug is required'),
  qty: z
    .number()
    .int()
    .nonnegative('Quantity must be a non-negative number'),
  image: z
    .string()
    .min(1, 'Image is required'),
  price: currency,
});

// Schema for inserting cart
export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z
    .string()
    .min(1, 'Session cart id is required'),
  userId: z
    .string()
    .optional()
    .nullable(),
});

// Schema for the shipping address
export const shippingAddressSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Full name must be at least 3 characters long')
    .max(30, 'Full name must be at most 30 characters long'),
  streetAddress: z
    .string()
    .min(3, 'Address must be at least 3 characters long')
    .max(30, 'Address must be at most 30 characters long'),
  city: z
    .string()
    .min(3, 'City must be at least 3 characters long')
    .max(30, 'City must be at most 30 characters long'),
  postalCode: z
    .string()
    .min(3, 'Postal code must be at least 3 characters long')
    .max(10, 'Postal code must be at most 10 characters long'),
  country: z
    .string()
    .min(3, 'Country must be at least 3 characters long')
    .max(30, 'Country must be at most 30 characters long'),
  lat: z
    .number()
    .optional(),
  lng: z
    .number()
    .optional(),
});

// Schema for payment method
export const paymentMethodSchema = z
  .object({
    type: z.string().min(1, 'Payment method is required'),
  })
  .refine((data) => PAYMENT_METHODS.includes(data.type), {
    path: ['type'],
    message: 'Invalid payment method',
  });

// Schema for inserting order
export const insertOrderSchema = z.object({
  userId: z
    .string()
    .min(1, 'User is required'),
  paymentMethod: z
    .string()
    .refine((data) => PAYMENT_METHODS.includes(data), {
      message: 'Invalid payment method',
    }),
  itemsPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  totalPrice: currency,
  shippingAddress: shippingAddressSchema,
});

// Schema for inserting an order item
export const insertOrderItemSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  image: z.string(),
  name: z.string(),
  price: currency,
  qty: z.number(),
});

// Schema for payment result
export const paymentResultSchema = z.object({
  id: z.string(),
  status: z.string(),
  email_address: z.string(),
  pricePaid: z.string(),
});

// Schema for updating the user profile
export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(20, ''),
  email: z
    .string()
    .email()
    .min(3, 'Email must be at least 3 characters'),
});

// Schema for updating users
export const updateUserSchema = updateProfileSchema.extend({
  id: z
    .string()
    .min(1, 'Id is required'),
  role: z
    .string()
    .min(1, 'Role is required'),
});

// Schema to insert reviews
export const insertReviewSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(30, 'Title must be at most 30 characters long'),
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters')
    .max(100, 'Description must be at most 100 characters long'),
  productId: z
    .string()
    .min(1, 'Product is required'),
  userId: z
    .string()
    .min(1, 'User is required'),
  rating: z.coerce
    .number()
    .int()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5'),
});

// Schema to change a password
export const changePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(30, 'Password must be at most 30 characters long'),
  confirmNewPassword: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(30, 'Password must be at most 30 characters long'),
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: 'Passwords do not match',
  path: ['confirmNewPassword'],
});