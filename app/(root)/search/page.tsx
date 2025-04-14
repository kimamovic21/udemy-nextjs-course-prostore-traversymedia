import {
  getAllProducts,
  getAllCategories
} from '@/lib/actions/product.actions';
import { prices } from '@/helpers/prices';
import Link from 'next/link';
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

  type GetFilterUrlProps = {
    c?: string;
    s?: string;
    p?: string;
    r?: string;
    pg?: string;
  };

  const getFilterUrl = ({
    c, // (category)
    s, // (sort order)
    p, // (price)
    r, // (rating)
    pg // (page number)
  }: GetFilterUrlProps) => {
    const params = { q, category, price, rating, sort, page };

    if (c) params.category = c;
    if (p) params.price = p;
    if (r) params.rating = r;
    if (pg) params.page = pg;
    if (s) params.sort = s;

    return `/search?${new URLSearchParams(params).toString()}`;
  };

  const products = await getAllProducts({
    query: q,
    category,
    price,
    rating,
    sort,
    page: Number(page),
  });

  const categories = await getAllCategories();

  return (
    <div className='grid md:grid-cols-5 md:gap-5'>
      <div className='filter-links'>
        {/* Category Links */}
        <div className='text-xl mt-3 mb-2'>Categories</div>
        <div>
          <ul className='space-y-1'>
            <li>
              <Link
                href={getFilterUrl({ c: 'all' })}
                className={`${('all' === category || '' === category) && 'font-bold'}`}
              >
                Any
              </Link>
            </li>

            {categories?.map((categoryItem) => (
              <li key={categoryItem.category}>
                <Link
                  href={getFilterUrl({ c: categoryItem.category })}
                  className={`${categoryItem.category === category && 'font-bold'}`}
                >
                  {categoryItem.category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Price Links */}
        <div className='text-xl mb-2 mt-8'>Prices</div>
        <div>
          <ul className='space-y-1'>
            <li>
              <Link
                className={`${price === 'all' && 'font-bold'}`}
                href={getFilterUrl({ p: 'all' })}
              >
                Any
              </Link>
            </li>
            {prices?.map((p) => (
              <li key={p.value}>
                <Link
                  className={`${price === p.value && 'font-bold'}`}
                  href={getFilterUrl({ p: p.value })}
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
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
            totalPages={products?.totalPages}
          />
        )}
      </div>
    </div>
  );
};

export default SearchPage;