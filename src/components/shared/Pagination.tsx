import { Button } from "@/components/ui/button";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Select } from "@radix-ui/react-select";
import { useEffect, useState } from "react";

interface AllProductPaginationProps {
  currentPage: number;
  limit: number;
  totalItems: number;
  setCurrentPage: (page: number) => void;
  setLimit: (limit: number) => void;
}
export function AllProductPagination({
  currentPage,
  limit,
  totalItems,
  setCurrentPage,
  setLimit,
}: AllProductPaginationProps) {
  const numberOfPages = Math.ceil(totalItems / limit);
  const pages = [...Array(numberOfPages).keys()];
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);

  //   handle previous page
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  //   handle Next page
  const handleNext = () => {
    if (currentPage < numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Set when the next and previous button will be visible and disable
  useEffect(() => {
    if (currentPage === 1) {
      setPrevDisabled(true);
    } else {
      setPrevDisabled(false);
    }
    if (currentPage === numberOfPages) {
      setNextDisabled(true);
    } else {
      setNextDisabled(false);
    }
    if (currentPage === 1 && numberOfPages === 1) {
      setPrevDisabled(true);
      setNextDisabled(true);
    }
  }, [currentPage, numberOfPages]);

  return (
    <div className="my-12 flex flex-col items-center justify-center gap-5">
      <div className="flex gap-3">
        {/* Page Button */}
        {pages.map((page) =>
          page === currentPage - 2 ||
          page === currentPage - 1 ||
          page === currentPage ||
          page === numberOfPages - 1 ? (
            <Button
              onClick={() => setCurrentPage(page + 1)}
              key={page}
              className={`btn rounded-sm bg-transparent px-3 text-white ${
                currentPage === page + 1 ? "border border-primary" : ""
              }`}
            >
              {page + 1}
            </Button>
          ) : (
            <p key={page} className="text-3xl">
              <sup>.</sup>
            </p>
          )
        )}
      </div>
      <div className="flex gap-3">
        {/* Previous Button */}
        <Button
          disabled={prevDisabled}
          onClick={handlePrevious}
          className="btn btn-primary btn-outline py-2 disabled:cursor-not-allowed disabled:text-gray-500 md:px-4"
        >
          <div className="-mx-1 flex items-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-1 h-6 w-6 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>

            <span className="hidden lg:flex">Previous</span>
          </div>
        </Button>
        {/* Select Items per page */}
        <div className="ml-2">
          <Select
            value={limit.toString()}
            onValueChange={(value) => {
              setLimit(Number(value));
              setCurrentPage(1);
              setPrevDisabled(true);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Limit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="8">8</SelectItem>
                <SelectItem value="12">12</SelectItem>
                <SelectItem value="16">16</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* Next Button */}
        <Button
          disabled={nextDisabled}
          onClick={handleNext}
          className="btn btn-primary btn-outline py-2 text-white disabled:cursor-not-allowed disabled:text-gray-500 md:px-4"
        >
          <div className="-mx-1 flex items-center">
            <span className="hidden lg:flex">Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-1 h-6 w-6 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </Button>
      </div>
    </div>
  );
}
