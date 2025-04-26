"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/utils";
import { redirect } from "next/navigation";
import {z} from "zod";

const formSchema = z.object({
  category: z.enum(["Home", "Personal", "Work"]),
  title: z.string().min(3).max(50),
  content: z.string().min(3).max(500)
});

export default async function createNote(formData: FormData) {
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
    return;
  }

  const session = await auth();
  if (!session?.user?.id) {
    return;
  }

  try {
    await db.notes.create({
      data: {
        ...parsedForm.data,
        userId: session.user.id
      }
    });
  }
  catch {
    return;
  }
  
  redirect(paths.dashboard);
}