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
  }>;
}) => {
  await requireAdmin();

  const searchParams = await props.searchParams;

  const { page = '1' } = searchParams;

  const users = await getAllUsers({ page: Number(page) });

  return (
    <div className='space-y-2'>
      <h2 className='h2-bold'>Users</h2>

      <div>
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