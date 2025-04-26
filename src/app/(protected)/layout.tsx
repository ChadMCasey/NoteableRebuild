import { auth } from '@/auth';
import Header from '@/components/header/Header';
import Sidebar from '@/components/Sidebar';
import { paths } from '@/utils';
import { redirect } from 'next/navigation';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  const session = await auth();

  if (!session) {
    redirect(paths.login);
  }

  return (
    <div className='max-w-7xl m-auto px-12 py-4 grid grid-cols-[1fr_4fr] gap-x-8 gap-y-12'>
      <Header />
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
