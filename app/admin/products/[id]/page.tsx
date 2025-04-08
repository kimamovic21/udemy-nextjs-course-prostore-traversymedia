import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/actions/product.actions';
import ProductForm from '../product-form';

export const metadata: Metadata = {
  title: 'Update product',
};

const AdminUpdateProductPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await props.params;

  const product = await getProductById(id);

  if (!product) return notFound();

  return (
    <div className='space-y-8 max-w-5xl mx-auto'>
      <h2 className='h2-bold'>Update Product</h2>
      <ProductForm 
        type='Update' 
        product={product} 
        productId={product.id} 
      />
    </div>
  );
};

export default AdminUpdateProductPage;