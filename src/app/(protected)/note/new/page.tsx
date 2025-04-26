"use client";

import createNote from "@/actions/createNote";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useActionState } from "react";
import { CreateNoteFormState } from "@/actions/createNote";

const initialFormState: CreateNoteFormState = { errors: {} };

export default function NewNotePage() {
  const [formState, formAction] = useActionState(createNote, initialFormState);
  const errors = formState.errors;

  return (
    <form action={formAction} className='flex flex-col gap-y-5'>
      <div className='flex flex-col gap-y-2.5'>
        <Label htmlFor='category'>Category</Label>
        <Select name='category' defaultValue='Home'>
          <SelectTrigger className='cursor-pointer'>
            <SelectValue placeholder='Home' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className='cursor-pointer' value='Home'>
              Home
            </SelectItem>
            <SelectItem className='cursor-pointer' value='Work'>
              Work
            </SelectItem>
            <SelectItem className='cursor-pointer' value='Personal'>
              Personal
            </SelectItem>
          </SelectContent>
        </Select>
        {errors?.category && (
          <p className='text-red-500'>{errors.category.join(", ")}</p>
        )}
      </div>

      <div className='flex flex-col gap-y-2.5'>
        <Label htmlFor='title'>Title</Label>
        <Input name='title' placeholder='Note Title' />
        {errors?.title && (
          <p className='text-red-500'>{errors.title.join(", ")}</p>
        )}
      </div>

      <div className='flex flex-col gap-y-2.5'>
        <Label htmlFor='content'>Content</Label>
        <Textarea name='content' placeholder='Note Content' />
        {errors?.content && (
          <p className='text-red-500'>{errors.content.join(", ")}</p>
        )}
      </div>

      {errors?.general && (
        <p className='text-red-500'>{errors.general.join(", ")}</p>
      )}

      <Button type='submit' className='cursor-pointer max-w-min'>
        Create Note
      </Button>
    </form>
  );
}
