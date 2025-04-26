'use client';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { paths } from '@/utils';

export default function User() {
  const { data: session } = useSession();
  const logout = () => signOut({ callbackUrl: paths.login });

  return (
    <div>
      {session?.user && (
        <DropdownMenu>
          <DropdownMenuTrigger className='flex items-center gap-x-3 cursor-pointer'>
            <Avatar className='size-10'>
              <AvatarImage src={session?.user?.image || ''} alt='User Image' />
              <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{session?.user?.name}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuItem className='cursor-pointer' onClick={logout}>
              <LogOut />
              <span>sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
