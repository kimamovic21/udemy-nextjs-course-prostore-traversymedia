'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { Prisma } from '@prisma/client';
import { type CartItem } from '@/types';
import { convertToPlainObject, formatError, round2 } from '../utils';
import { auth } from '@/auth';
import { prisma } from '@/db/prisma';
import { cartItemSchema, insertCartSchema } from '../validators';

// Calculate cart price based on items
const calcPrice = (items: CartItem[]) => {
  const itemsPrice = round2(
    items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
  ),
    shippingPrice = round2(itemsPrice > 100 ? 0 : 10),
    taxPrice = round2(0.15 * itemsPrice),
    totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};

export async function addItemToCart(data: CartItem) {
  try {
    // Check for cart cookie
    const sessionCartId = (await cookies()).get('sessionCartId')?.value;
    if (!sessionCartId) throw new Error('Cart session not found!');

    // Get session and user ID
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    // Get cart
    const cart = await getMyCart();

    // Parse and validate item
    const item = cartItemSchema.parse(data);

    // Find product in database
    const product = await prisma.product.findFirst({
      where: { id: item.productId }
    });
    if (!product) throw new Error('Product not found!');

    if (!cart) {
      // Create new cart object
      const newCart = insertCartSchema.parse({
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
        ...calcPrice([item]),
      });
      // console.log(newCart);
      
      // Add to database
      await prisma.cart.create({
        data: newCart,
      });

      // Revalidate product page
      revalidatePath(`/product/${product.slug}`);

      return {
        success: true,
        message: `${product.name} added to the cart.`,
      };
    } else {
      // Check if item is already in the cart
      const existItem = (cart.items as CartItem[]).find((cartItem) => cartItem.productId === item.productId);

      if (existItem) {
        // Check the stock
        if (product.stock < existItem.qty + 1) throw new Error('Not enough stock!');

        // Increase the quantity
        (cart.items as CartItem[]).find((cartItem) => cartItem.productId === item.productId)!.qty = existItem.qty + 1;
      } else {
        // If item does not exist in the cart
        // Check the stock
        if (product.stock < 1) throw new Error('Not enough stock!');

        // Add item to the cart.items
        cart.items.push(item);
      };

      // Save to database
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: cart.items as Prisma.CartUpdateitemsInput[],
          ...calcPrice(cart.items as CartItem[]),
        },
      });

      revalidatePath(`/product/${product.slug}`);

      return {
        success: true,
        message: `${product.name} ${existItem ? 'updated in' : 'added to'} cart.`,
      };
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  };
};

export async function getMyCart() {
  // Check for cart cookie
  const sessionCartId = (await cookies()).get('sessionCartId')?.value;
  if (!sessionCartId) throw new Error('Cart session not found!');

  // Get session and user ID
  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;

  // Get user cart from database
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId }
  });

  if (!cart) return undefined;

  // Convert decimals and return
  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  });
};

export async function removeItemFromCart(productId: string) {
  try {
    // Get session cart id
    const sessionCartId = (await cookies()).get('sessionCartId')?.value;
    if (!sessionCartId) throw new Error('Cart Session not found!');

    // Get Product
    const product = await prisma.product.findFirst({
      where: { id: productId },
    });
    if (!product) throw new Error('Product not found!');

    // Get user cart
    const cart = await getMyCart();
    if (!cart) throw new Error('Cart not found!');

    // Check if cart has item
    const existItem = (cart.items as CartItem[]).find((cartItem) => cartItem.productId === productId);
    if (!existItem) throw new Error('Item not found!');

    // Check if cart has only one item
    if (existItem.qty === 1) {
      // Remove item from cart
      cart.items = (cart.items as CartItem[]).filter((cartItem) => cartItem.productId !== existItem.productId);
    } else {
      // Decrease quantity of existing item
      (cart.items as CartItem[]).find((cartItem) => cartItem.productId === productId)!.qty = existItem.qty - 1;
    };

    // Update cart in database
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items as Prisma.CartUpdateitemsInput[],
        ...calcPrice(cart.items as CartItem[]),
      },
    });

    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: `${product.name} ${
        (cart.items as CartItem[]).find((cartItem) => cartItem.productId === productId)
          ? 'updated in'
          : 'removed from'
      } cart successfully`,
    };

  } catch (error) {
    return { 
      success: false,
      message: formatError(error),
    };
  };
};