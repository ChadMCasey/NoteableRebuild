import { Search } from 'lucide-react';
import { Input } from '../ui/input';

export default function SearchInput() {
  return (
    <div className='relative flex items-center basis-70'>
      <Search className='absolute left-2 stroke-zinc-400 basis-70 size-4.5' />
      <Input type='search' placeholder='Search Notes' className='pl-9' />
    </div>
  );
}
