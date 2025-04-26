import Navigation from './Buttons';
import SearchInput from './SearchInput';
import User from './User';

export default function Header() {
  return (
    <div className='flex justify-between col-span-2'>
      <User />
      <SearchInput />
      <Navigation />
    </div>
  );
}
