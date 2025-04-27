"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/utils";
import { redirect } from "next/navigation";
import { z } from "zod";

export interface UpdateNoteFormState {
  errors: {
    category?: string[];
    title?: string[];
    content?: string[];
    general?: string[];
  }
}

const formSchema = z.object({
  action: z.enum(["update", "delete"]),
  noteId: z.string().length(25),
  category: z.enum(["Home", "Personal", "Work"]),
  title: z.string().min(3).max(50),
  content: z.string().min(3).max(500)
})

export async function updateNote(
  formState: UpdateNoteFormState,
  formData: FormData): Promise<UpdateNoteFormState> {

  // parse the form
  const parsedForm = formSchema.safeParse({
    action: formData.get("action"),
    noteId: formData.get("noteId"),
    category: formData.get("category"),
    title: formData.get("title"),
    content: formData.get("content")
  });

  // check for validation errors
  if (!parsedForm.success) {
    return {
      errors: {
        ...parsedForm.error.flatten().fieldErrors
      }
    }
  }

  // check for authorization
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      errors: {
        general: ["The user must be signed in to update note."]
      }
    }
  }

  const {
    noteId,
    action,
    category,
    title,
    content
  } = parsedForm.data;

  try {

    // update or delete
    switch (action) {
      case "update":
        await db.note.update({
          where: { id: noteId, userId: userId },
          data: { category, title, content }
        });
        break;
      case "delete":
        await db.note.delete({
          where: { id: noteId, userId: userId },
        });
        break;
      default:
        return {
          errors: {
            general: ["Invalid action type."]
          }
        }
    }
  }
  catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          general: [err.message]
        }
      }
    }
    else {
      return {
        errors: {
          general: ["Something went wrong while updating note. Please try again."]
        }
      }
    }
  }

  redirect(paths.dashboard);
}