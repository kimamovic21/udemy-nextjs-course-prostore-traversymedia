import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }: { product: any }) => {
  return (
    <Card className='w-full max-w-sm'>
      <CardHeader className='p-0 items-center'>
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.images![0]}
            alt={product.name}
            width={300}
            height={300}
            className='aspect-square object-cover rounded'
            priority={true}
          />
        </Link>
      </CardHeader>

      <CardContent className='p-4 grid gap-4'>
          <div className='text-xs'>{product.brand}</div>
          <Link href={`/product/${product.slug}`}>
            <h2 className='text-sm font-medium'>{product.name}</h2>
          </Link>
        <div className='flex-between gap-4'>
          <p>
            <span className='mr-1'>{product.rating}</span> 
            <span>stars</span> 
          </p>
          {product?.stock > 0 ? (
            <p className='font-bold'>${product.price}</p>
          ) : (
            <p className='text-destructive'>Out of Stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;