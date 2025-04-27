import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function DashboardSkeleton() {
  const array = Array.from({ length: 7 });

  return (
    <ul className='grid grid-cols-2 gap-6 w-full'>
      {array.map((_, i) => (
        <Card className='flex flex-col justify-between gap-y-4 p-4' key={i}>
          <div className='flex justify-between w-full h-min'>
            <Skeleton className='h-10 basis-50' />
            <Skeleton className='h-10 basis-20' />
          </div>
          <div>
            <Skeleton className='h-17 w-full' />
          </div>
          <div className='flex justify-between items-end'>
            <Skeleton className='h-3 basis-15' />
            <Skeleton className='h-10 basis-20' />
          </div>
        </Card>
      ))}
    </ul>
  );
}
