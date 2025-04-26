"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/utils";
import { redirect } from "next/navigation";
import {z} from "zod";

export interface CreateNoteFormState {
  errors: {
    category?: string[];
    title?: string[];
    content?: string[];
    general?: string[];
  }
}

const formSchema = z.object({
  category: z.enum(["Home", "Personal", "Work"]),
  title: z.string().min(3).max(50),
  content: z.string().min(3).max(500)
});

export default async function createNote(
  formState: CreateNoteFormState,
  formData: FormData): Promise<CreateNoteFormState> {

  const category = formData.get("category");
  const title = formData.get("title");
  const content = formData.get("content");

  console.log(`category: ${category}`);
  console.log(`title: ${title}`);
  console.log(`content: ${content}`);

  const parsedForm = formSchema.safeParse({
    category, title, content
  });

  if (!parsedForm.success) {
    return {
      errors: {
        ...parsedForm?.error?.flatten().fieldErrors
      }
    }
  }

  const session = await auth();
  if (!session?.user?.id) {
    return {
      errors: {
        general: ["User must be signed in to create a note."]
      }
    }
  }

  try {
    await db.note.create({
      data: {
        ...parsedForm.data,
        userId: session.user.id
      }
    });
    // throw new Error("Something went wrong with db submission.")
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
          general: ["Something went wrong creating note, please try again."]
        }
      }
    }
  }

  // dont need to return formState object when we redirect!!
  // all other code paths MUST return it.
  redirect(paths.dashboard);
}