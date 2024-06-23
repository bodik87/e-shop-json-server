"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  totalPages: number;
};

export default function Pagination({ totalPages }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    router.push(`?page=${pageNumber}`);
  };

  const pages = Array.from(Array((totalPages % 2) + 1).keys());

  return (
    <>
      {totalPages > 2 && (
        <div className="flex gap-4">
          {pages.map((page) => (
            <button
              key={page}
              className="flex p-1 border px-2"
              onClick={() => createPageURL(page + 1)}
            >
              {page + 1}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
