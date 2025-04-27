import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { paths } from "@/utils";
import Link from "next/link";

export default function NoteNotFound() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Note Was Not Found</CardTitle>
        <CardDescription>
          Oh on! It looks like your note could not be found
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button className='cursor-pointer' variant='secondary' asChild>
          <Link href={paths.dashboard}>Return To Dashboard</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
