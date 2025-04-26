import { auth } from '@/auth';
import { paths } from '@/utils';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect(paths.dashboard);
  } else {
    redirect(paths.login);
  }
}
