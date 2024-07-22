"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { defaultSort } from "@/lib/constants";
import { paths } from "@/lib/paths";
import { useSearchParams } from "next/navigation";
export interface PaginationProps {
  totalPages: number;
  totalPagesToDisplay?: number;
}

export const PaginationProduct: React.FC<PaginationProps> = ({
  totalPages,
  totalPagesToDisplay = 5,
}: PaginationProps) => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createURL = (pageNumber: number) => {
    const sortKey = searchParams.get('sortKey') || defaultSort.sortKey;
    const sortType = searchParams.get('sortType') || defaultSort.sortType;
    return `${paths.search}/?sortKey=${sortKey}&sortType=${sortType}&page=${pageNumber}`;
  };

  const showLeftEllipsis = currentPage - 1 > totalPagesToDisplay / 2;
  const showRightEllipsis = totalPages - currentPage + 1 > totalPagesToDisplay / 2;
  const getPageNumbers = () => {
    if (totalPages <= totalPagesToDisplay) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      const half = Math.floor(totalPagesToDisplay / 2);
      // To ensure that the current page is always in the middle
      let start = currentPage - half;
      let end = currentPage + half;
      // If the current page is near the start
      if (start < 1) {
        start = 1;
        end = totalPagesToDisplay;
      }
      // If the current page is near the end
      if (end > totalPages) {
        start = totalPages - totalPagesToDisplay + 1;
        end = totalPages;
      }
      // If showLeftEllipsis is true, add an ellipsis before the start page
      if (showLeftEllipsis) {
        start++;
      }
      // If showRightEllipsis is true, add an ellipsis after the end page
      if (showRightEllipsis) {
        end--;
      }
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }
  };

  const renderPaginationItems = () => {
    const pageNumbers = getPageNumbers();
    return pageNumbers.map((pageNumber) => (
      <PaginationItem key={pageNumber}>
        <PaginationLink
          href={createURL(pageNumber)}
          isActive={pageNumber === currentPage}
        // onClick={(e) => {handleClick(pageNumber)}}
        >
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    ));
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={currentPage <= 1 ? 'cursor-not-allowed pointer-events-none opacity-50' : ''}
            href={createURL(currentPage - 1)}
          // onClick={(e) => { handleClick(currentPage - 1) }}
          />
        </PaginationItem>
        {showLeftEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {renderPaginationItems()}
        {showRightEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            className={currentPage >= totalPages ? 'cursor-not-allowed pointer-events-none opacity-50' : ''}
            href={createURL(currentPage + 1)}
          // onClick={(e) => { handleClick(currentPage + 1) }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};