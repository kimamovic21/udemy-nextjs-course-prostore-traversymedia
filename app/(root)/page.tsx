import { 
  getLatestProducts, 
  getFeaturedProducts 
} from '@/lib/actions/product.actions';
import ProductList from '@/components/shared/product/product-list';
import ProductCarousel from '@/components/shared/product/product-carousel';
import ViewAllProductsButton from '@/components/view-all-products-button';
import IconBoxes from '@/components/icon-boxes';

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const Homepage = async () => {
  await delay(500);

  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}

      <ProductList 
        data={latestProducts} 
        title='Newest Arrivals' 
        limit={4}
      />

      <ViewAllProductsButton />

      <IconBoxes />
    </>
  );
};

export default Homepage;