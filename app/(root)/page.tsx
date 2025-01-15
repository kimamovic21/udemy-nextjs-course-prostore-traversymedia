import { getLatestProducts } from '@/lib/actions/product.actions';
import ProductList from '@/components/shared/product/product-list';

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const Homepage = async () => {
  await delay(1000);

  const latestProducts = await getLatestProducts();

  return (
    <>
      <ProductList 
        data={latestProducts} 
        title='Newest Arrivals' 
        limit={4}
      />
    </>
  );
};

export default Homepage;