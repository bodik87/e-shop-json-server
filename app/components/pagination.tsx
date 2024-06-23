"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PER_PAGE } from "../lib/types/constatns";

type Props = {
  path: string;
  length: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export default function Pagination({
  path,
  length,
  hasNextPage,
  hasPrevPage,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? PER_PAGE;

  return (
    <>
      {length > Number(PER_PAGE) && (
        <div className="mt-2 flex gap-2 items-center">
          <button
            className="disabled:bg-gray-400 bg-black text-white rounded-full p-1"
            disabled={!hasPrevPage}
            onClick={() => {
              router.push(
                `${path}?page=${Number(page) - 1}&per_page=${per_page}`
              );
            }}
          >
            <ChevronLeft />
          </button>

          <div className="w-14 text-center">
            {page} / {Math.ceil(length / Number(per_page))}
          </div>

          <button
            className="disabled:bg-gray-400 bg-black text-white rounded-full p-1"
            disabled={!hasNextPage}
            onClick={() => {
              router.push(
                `${path}?page=${Number(page) + 1}&per_page=${per_page}`
              );
            }}
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </>
  );
}
