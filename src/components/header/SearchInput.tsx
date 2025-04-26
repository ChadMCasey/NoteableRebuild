"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { FormEvent } from "react";
import { paths } from "@/utils";
import { useRouter } from "next/navigation";

export default function SearchInput() {
  const router = useRouter();

  function searchChange(e: FormEvent<HTMLInputElement>) {
    const searchValue = e.currentTarget.value;
    const path = paths.dashboardSearch(searchValue);
    router.push(path);
  }

  return (
    <div className='relative flex items-center basis-70'>
      <Search className='absolute left-2 stroke-zinc-400 basis-70 size-4.5' />
      <Input
        type='search'
        placeholder='Search Notes'
        className='pl-9'
        onChange={searchChange}
      />
    </div>
  );
}
