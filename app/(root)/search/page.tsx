import { getAllProducts } from '@/lib/actions/product.actions';
import ProductCard from '@/components/shared/product/product-card';
import Pagination from '@/components/shared/pagination';

const SearchPage = async (props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>;
}) => {
  const {
    q = 'all',
    category = 'all',
    price = 'all',
    rating = 'all',
    sort = 'newest',
    page = '1',
  } = await props.searchParams;

  console.log(q, category, price, rating, sort, page);

  const products = await getAllProducts({
    query: q,
    category,
    price,
    rating,
    sort,
    page: Number(page),
  });

  return (
    <div className='grid md:grid-cols-5 md:gap-5'>
      <div className='filter-links'>
        FILTERS
      </div>

      <div className='md:col-span-4 space-y-4'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          {products?.data?.length === 0 && (
            <p className='text-left text-gray-600 mt-4'>
              No product found.
            </p>
          )}

          {products?.data?.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
            />
          ))}
        </div>
        
        {products?.totalPages > 1 && (
          <Pagination 
            page={page} 
            totalPages={products!.totalPages} 
          />
        )}
      </div>
    </div>
  );
};

export default SearchPage;