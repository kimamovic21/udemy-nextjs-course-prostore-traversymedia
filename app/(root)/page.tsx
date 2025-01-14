import sampleData from '@/db/sample-data';
import ProductList from '@/components/shared/product/product-list';

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const Homepage = async () => {
  await delay(1000);

  return (
    <>
      <ProductList 
        data={sampleData.products} 
        title='Newest Arrivals' 
        limit={4}
      />
    </>
  );
};

export default Homepage;