'use client';
import { Input } from "@/components/ui/input"
import { paths } from "@/constants/paths";
import { useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export function Search() {
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

    replace(`${paths.products}?${params.toString()}`);
  }, 300);

  return (
    <div>
      <Input
        type="search"
        placeholder="Tìm kiếm"
        className="h-9 md:w-[100px] lg:w-[300px]"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </div>
  )
}