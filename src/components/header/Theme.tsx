import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '../ui/button';

export default function Theme() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <Button
      variant='outline'
      size='icon'
      className='cursor-pointer'
      onClick={toggleTheme}
    >
      <Sun className='dark:hidden' />
      <Moon className='hidden dark:block' />
    </Button>
  );
}
