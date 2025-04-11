import { MenuIcon } from 'lucide-react';
import { getAllCategories } from '@/lib/actions/product.actions';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import Link from 'next/link';

const CategoriesDrawer = async () => {
  const categories = await getAllCategories();

  return (
    <Drawer direction='left'>
      <DrawerTrigger asChild>
        <Button variant='outline'>
          <MenuIcon />
        </Button>
      </DrawerTrigger>

      <DrawerContent className='h-full max-w-sm'>
        <DrawerHeader>
          <DrawerTitle>Select a category</DrawerTitle>
          <div className='space-y-1 mt-4'>
            {categories?.map((categoryItem) => (
              <Button
                key={categoryItem.category}
                className='w-full justify-start'
                variant='ghost'
                asChild
              >
                <DrawerClose asChild>
                  <Link href={`/search?category=${categoryItem.category}`}>
                    <span>{categoryItem.category}</span>
                    <span>( {categoryItem._count} )</span>
                  </Link>
                </DrawerClose>
              </Button>
            ))}
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default CategoriesDrawer;