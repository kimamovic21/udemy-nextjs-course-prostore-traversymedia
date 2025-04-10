import { requireAdmin } from '@/lib/auth-guard';
import { getAllProducts, deleteProduct } from '@/lib/actions/product.actions';
import { formatCurrency, formatId } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import Pagination from '@/components/shared/pagination';
import DeleteDialog from '@/components/shared/delete-dialog';

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

  return (
    <div className='space-y-2'>
      <div className='flex-between gap-2'>
        <div className='flex items-center gap-2'>
          <h2 className='h2-bold'>Products</h2>
          {searchText && (
            <div className='flex items-center gap-4'>
              <p>
                <span className='mr-1'>Filtered by</span> 
                <span className='italic'>&quot;{searchText}&quot;</span> 
              </p> 
              <Link href={`/admin/products`}>
                <Button variant='outline' size='sm'>
                  Remove Filter
                </Button>
              </Link>
            </div>
          )}
        </div>

        <Button asChild variant='default'>
          <Link href='/admin/products/create'>Create Product</Link>
        </Button>
      </div>

      <div>
        {products?.data?.length === 0 ? (
          <p className='text-center text-gray-500 py-10'>
            No products found.
          </p>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>NAME</TableHead>
                  <TableHead className='text-right'>PRICE</TableHead>
                  <TableHead>CATEGORY</TableHead>
                  <TableHead>STOCK</TableHead>
                  <TableHead>RATING</TableHead>
                  <TableHead className='w-[100px]'>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {products?.data?.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      {formatId(product.id)}
                    </TableCell>

                    <TableCell>
                      {product.name}
                    </TableCell>

                    <TableCell className='text-right'>
                      {formatCurrency(product.price)}
                    </TableCell>

                    <TableCell>
                      {product.category}
                    </TableCell>

                    <TableCell>
                      {product.stock}
                    </TableCell>

                    <TableCell>
                      {product.rating}
                    </TableCell>

                    <TableCell className='flex gap-1'>
                      <Button asChild variant='outline' size='sm'>
                        <Link href={`/admin/products/${product.id}`}>
                          Edit
                        </Link>
                      </Button>

                      <DeleteDialog
                        id={product.id}
                        action={deleteProduct}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {products?.totalPages > 1 && (
              <Pagination
                page={page}
                totalPages={products.totalPages}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminProductsPage;