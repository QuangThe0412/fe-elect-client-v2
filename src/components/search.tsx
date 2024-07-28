'use client';
import { Input } from "@/components/ui/input"
import { paths } from "@/lib/paths";
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from "react";
import { useDebouncedCallback } from 'use-debounce';

function Search() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.delete('page');
    params.delete('category');

    if (term) {
      params.set('query', term);
    } else {
      params.set('query', '');
    }

    replace(`${paths.search}?${params.toString()}`);
  }, 1000);

  return (
    <Input
      type="search"
      placeholder="Tìm kiếm..."
      className="border-gray-200 border p-2 pl-2 pr-6 rounded-lg w-full"
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
      defaultValue={searchParams.get('query')?.toString()}
    />
  )
}

export default function Searchbar() {
  return (
    <Suspense>
      <Search />
    </Suspense>
  )
}