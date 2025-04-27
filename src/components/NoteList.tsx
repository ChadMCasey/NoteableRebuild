import { auth } from "@/auth";
import NoteCard from "@/components/NoteCard";
import { db } from "@/db";

interface NoteListProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}

export default async function NoteList(props: NoteListProps) {
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

  // simulating loading 1000 notes...
  // await new Promise((r) => setTimeout(r, 5000));

  return (
    <ul className='grid grid-cols-2 gap-6'>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </ul>
  );
}
