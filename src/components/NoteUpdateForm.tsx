"use client";

import CategoryDropdown from "@/components/CategoryDropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Note } from "../../prisma/generated/prisma";
import { updateNote, UpdateNoteFormState } from "@/actions/updateNote";
import { useActionState } from "react";

interface NoteUpdateFormProps {
  note: Note;
}

const initialFormState: UpdateNoteFormState = {
  errors: {},
};

export default function NoteUpdateForm({ note }: NoteUpdateFormProps) {
  const [formState, formAction, isPending] = useActionState(
    updateNote,
    initialFormState
  );
  const { errors } = formState;

  return (
    <form action={formAction} className='flex flex-col gap-y-5'>
      <Input hidden name='noteId' value={note.id} readOnly />

      <div className='flex flex-col gap-y-2.5'>
        <Label>Category</Label>
        <CategoryDropdown default={note?.category} />
        {errors?.category && (
          <p className='text-red-500'>{errors.category.join(", ")}</p>
        )}
      </div>

      <div className='flex flex-col gap-y-2.5'>
        <Label>Title</Label>
        <Input
          name='title'
          placeholder='Note Title'
          defaultValue={note.title}
        />
        {errors?.title && (
          <p className='text-red-500'>{errors.title.join(", ")}</p>
        )}
      </div>

      <div className='flex flex-col gap-y-2.5'>
        <Label>Content</Label>
        <Textarea
          name='content'
          placeholder='Type Your Note Here...'
          defaultValue={note.content}
        />
        {errors?.content && (
          <p className='text-red-500'>{errors.content.join(", ")}</p>
        )}
      </div>

      {errors?.general && (
        <p className='text-red-500'>{errors.general.join(", ")}</p>
      )}

      <div className='flex gap-2'>
        <Button
          type='submit'
          variant='destructive'
          name='action'
          value='delete'
          className='cursor-pointer'
          disabled={isPending} // disabled if true
        >
          Delete
        </Button>
        <Button
          type='submit'
          name='action'
          value='update'
          className='cursor-pointer'
          disabled={isPending}
        >
          Update
        </Button>
      </div>
    </form>
  );
}
