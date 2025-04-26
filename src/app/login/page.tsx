'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { paths } from '@/utils';

export default function LoginPage() {
  const login = () => signIn('github', { callbackUrl: paths.dashboard });

  return (
    <div className='flex items-center justify-center h-screen'>
      <Card className='flex flex-col basis-100'>
        <CardHeader className='pb-4'>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>
            Login with Github to get note-taking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className='w-full mb-1 cursor-pointer' onClick={login}>
            Sign In With Github
          </Button>
          <p className='mt-2 text-center text-sm'>
            Dont have an account?
            <Button
              variant='link'
              className='px-2 underline cursor-pointer'
              onClick={login}
            >
              Sign Up
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
