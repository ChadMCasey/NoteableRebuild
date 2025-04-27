import { db } from "@/db";
import { auth } from "@/auth";
import NoteUpdateForm from "@/components/NoteUpdateForm";
import { notFound } from "next/navigation";

interface NoteUpdatePageProps {
  params: Promise<{ noteId: string }>;
}

export default async function NoteUpdatePage(props: NoteUpdatePageProps) {
  const { noteId } = await props.params;

  const session = await auth();

  const note = await db.note.findFirst({
    where: {
      userId: session?.user?.id,
      id: noteId,
    },
  });

  if (!note) {
    // navigate to specially named not-found.tsx file
    return notFound();
  }

  return <NoteUpdateForm note={note} />;
}
