import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/actions/product.actions';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductPrice from '@/components/shared/product/product-price';
import ProductImages from '@/components/shared/product/product-images';
import AddToCart from '@/components/shared/product/add-to-cart';

const ProductDetailsPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const params = await props.params;

  const { slug } = params;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <section>
      <div className='grid grid-cols-1 md:grid-cols-5'>
        {/* Images Column */}
        <div className='col-span-2'>
          <ProductImages images={product.images} />
        </div>

        {/* Details Column */}
        <div className='col-span-2 p-5'>
          <div className='flex flex-col gap-6'>
            <h3 className='flex gap-1'>
              <span>{product.brand}</span>
              <span>{product.category}</span>
            </h3>
            <h2 className='h3-bold'>
              {product.name}
            </h2>
            <p className='flex gap-1'>
              <span>{product.rating}</span>
              <span>of</span>
              <span>{product.numReviews} </span>
              <span>reviews</span>
            </p>

            <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
              <ProductPrice
                value={Number(product.price)}
                className='w-24 rounded-full bg-green-100 text-green-700 px-5 py-2'
              />
            </div>
          </div>

          <div className='mt-10'>
            <h3>Description:</h3>
            <p>{product.description}</p>
          </div>
        </div>

        {/* Action Column */}
        <div>
          <Card>
            <CardContent className='p-4'>
              <div className='mb-2 flex justify-between'>
                <h3>Price</h3>
                <div>
                  <ProductPrice value={Number(product.price)} />
                </div>
              </div>

              <div className='mb-2 flex justify-between'>
                <h3>Status</h3>
                {product?.stock > 0 ? (
                  <Badge variant='outline'>In stock</Badge>
                ) : (
                  <Badge variant='destructive'>Unavailable</Badge>
                )}
              </div>

              {product?.stock > 0 && (
                <div className='flex-center'>
                <AddToCart
                  item={{
                    productId: product.id,
                    name: product.name,
                    slug: product.slug,
                    price: product.price,
                    qty: 1,
                    image: product.images![0],
                  }}
                />
              </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;