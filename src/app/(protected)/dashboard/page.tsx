import { auth } from "@/auth";
import NoteCard from "@/components/NoteCard";
import { db } from "@/db";

// /dashboard?category=Work
// { category: Work }
interface DashboardPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}

export default async function DashboardPage(props: DashboardPageProps) {
  // parse search params
  const params = await props.searchParams;
  const { category, search } = params;

  const session = await auth();
  const id = session?.user?.id;

  const notes = await db.note.findMany({
    where: {
      userId: id,
      category, // if undefined, we fetch "All" notes
      title: { contains: search },
    },
  });

  return (
    <ul className='grid grid-cols-2 gap-6'>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </ul>
  );
}
