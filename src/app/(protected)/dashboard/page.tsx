import { Suspense } from "react";
import NoteList from "@/components/NoteList";
import DashboardSkeleton from "@/components/DashboardSkeleton";

// { category: Work }
interface DashboardPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}

export default async function DashboardPage(props: DashboardPageProps) {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <NoteList searchParams={props.searchParams} />
    </Suspense>
  );
}
