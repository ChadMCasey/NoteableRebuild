import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import { Note } from "../../prisma/generated/prisma";

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  return (
    <Card key={note.id} className='p-6 flex flex-col gap-4'>
      <div className='flex justify-between items-start'>
        <h3 className='font-semibold text-lg'>{note.title}</h3>
        <Badge className='text-xs h-8 font-medium'>{note.category}</Badge>
      </div>
      <p className='text-sm/7 text-muted-foreground'>{note.content}</p>
      <div className='mt-auto flex justify-between items-center text-xs'>
        <p>{note.createdAt.toLocaleDateString()}</p>
        <Link href='#'>
          <PencilIcon className='stroke-zinc-400 cursor-pointer' />
        </Link>
      </div>
    </Card>
  );
}
