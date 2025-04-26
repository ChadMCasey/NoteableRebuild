import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';

export default function Sidebar() {
  const categories = ['All', 'Work', 'Home', 'Personal'];

  return (
    <Tabs>
      <h4 className='mb-2'>Categories</h4>
      <TabsList className='flex flex-col w-full h-auto gap-2 p-2'>
        {categories.map((cat) => (
          <Link href='#' key={cat} className='w-full'>
            <TabsTrigger
              value={cat}
              className='flex justify-between w-full cursor-pointer'
            >
              <p>{cat}</p>
              <Badge>{0}</Badge>
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>
    </Tabs>
  );
}
