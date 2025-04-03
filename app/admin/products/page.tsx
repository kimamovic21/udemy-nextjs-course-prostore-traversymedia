import { requireAdmin } from '@/lib/auth-guard';
import { getAllProducts } from '@/lib/actions/product.actions';
import { formatCurrency, formatId } from '@/lib/utils';
import Link from 'next/link';

const AdminProductsPage = async (props: {
  searchParams: Promise<{
    page: string;
    query: string;
    category: string;
  }>;
}) => {
  await requireAdmin();

  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const searchText = searchParams.query || '';
  const category = searchParams.category || '';

  const products = await getAllProducts({
    query: searchText,
    page,
    category,
  });
  console.log(products);

  return (
    <div className='space-y-2'>
      <div className='flex-between'>
        <h2 className='h2-bold'>Products</h2>
      </div>
    </div>
  );
};

export default AdminProductsPage;