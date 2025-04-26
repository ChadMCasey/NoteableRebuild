'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { paths } from '@/utils';
import Theme from './Theme';

export default function Navigation() {
  const router = useRouter();

  return (
    <div className='flex gap-2'>
      <Theme />
      <Button
        variant='secondary'
        className='cursor-pointer'
        onClick={() => router.push(paths.dashboard)}
      >
        Dashboard
      </Button>
      <Button
        className='cursor-pointer'
        onClick={() => router.push(paths.newNote)}
      >
        Add New Note
      </Button>
    </div>
  );
}
