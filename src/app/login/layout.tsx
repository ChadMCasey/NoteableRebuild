import { auth } from '@/auth';
import { paths } from '@/utils';
import { redirect } from 'next/navigation';
import React from 'react';

interface LoginLayoutProps {
  children: React.ReactNode;
}

export default async function UnprotectedLoginLayout({
  children,
}: LoginLayoutProps) {
  const session = await auth();

  if (session) {
    redirect(paths.dashboard);
  }

  return <div>{children}</div>;
}
