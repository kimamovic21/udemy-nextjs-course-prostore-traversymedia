import { type Metadata } from 'next';
import { requireAdmin } from '@/lib/auth-guard';
import { getAllUsers, deleteUser } from '@/lib/actions/user.actions';
import { formatId } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Pagination from '@/components/shared/pagination';
import DeleteDialog from '@/components/shared/delete-dialog';

export const metadata: Metadata = {
  title: 'Admin Users',
};

const AdminUsersPage = async (props: {
  searchParams: Promise<{
    page: string;
    query: string;
  }>;
}) => {
  await requireAdmin();

  const searchParams = await props.searchParams;

  const { page = '1', query: searchText } = searchParams;

  const users = await getAllUsers({
    page: Number(page),
    query: searchText
  });

  return (
    <div className='space-y-2'>
      <div className='flex items-center gap-2'>
        <h2 className='h2-bold'>Orders</h2>
        {searchText && (
          <div className='flex items-center gap-4'>
            <p>
              <span className='mr-1'>Filtered by</span>
              <span className='italic'>&quot;{searchText}&quot;</span>
            </p>
            <Link href={'/admin/orders'}>
              <Button variant='outline' size='sm'>
                Remove Filter
              </Button>
            </Link>
          </div>
        )}
      </div>

      <div>
        {users?.data?.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>NAME</TableHead>
                <TableHead>EMAIL</TableHead>
                <TableHead>ROLE</TableHead>
                <TableHead>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>

              {users?.data?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    {formatId(user.id)}
                  </TableCell>

                  <TableCell>
                    {user.name}
                  </TableCell>

                  <TableCell>
                    {user.email}
                  </TableCell>

                  <TableCell>
                    {user.role === 'user' ? (
                      <Badge variant='secondary'>
                        User
                      </Badge>
                    ) : (
                      <Badge variant='default'>
                        Admin
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell className='flex gap-1'>
                    <Button asChild variant='outline' size='sm'>
                      <Link href={`/admin/users/${user.id}`}>Edit</Link>
                    </Button>

                    <DeleteDialog
                      id={user.id}
                      action={deleteUser}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className='text-center text-gray-600 mt-4'>No users found.</p>
        )}

        {users.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={users.totalPages}
          />
        )}
      </div>
    </div>
  );
};

export default AdminUsersPage;