import Link from "next/link";
import { Badge } from "./ui/badge";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { db } from "@/db";
import { auth } from "@/auth";
import { paths } from "@/utils";

export default async function Sidebar() {
  const session = await auth();

  // Work, Personal, Home
  const groupedNotes = await db.note.groupBy({
    by: ["category"],
    where: {
      userId: session?.user?.id,
    },
    _count: { category: true },
  });

  // sum notes for our "All" category
  const totalNotes = groupedNotes.reduce(
    (acc, curr) => acc + curr._count.category,
    0
  );

  // Add "All" category
  const allCategories = [
    {
      label: "All",
      count: totalNotes,
    },
  ];

  // Now add the other three groups
  allCategories.push(
    ...groupedNotes.map((group) => ({
      label: group.category,
      count: group._count.category,
    }))
  );

  return (
    <Tabs>
      <h4 className='mb-2'>Categories</h4>
      <TabsList className='flex flex-col w-full h-auto gap-2 p-2'>
        {allCategories.map((cat) => (
          <Link
            // i.e., /dashboard?category=Work
            href={
              cat.label === "All"
                ? paths.dashboard
                : paths.dashboardCategory(cat.label)
            }
            key={cat.label}
            className='w-full'
          >
            <TabsTrigger
              value={cat.label}
              className='flex justify-between w-full cursor-pointer'
            >
              <p>{cat.label}</p>
              <Badge>{cat.count}</Badge>
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>
    </Tabs>
  );
}
