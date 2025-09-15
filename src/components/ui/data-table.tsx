import { cn } from "@sglara/cn";
import { useState, type ReactElement } from "react";
import Button from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "./card";

const ROWSPERPAGE = 10;

export interface columnType<T> {
  accessorKey?: keyof T;
  header?: ReactElement | string;
  id: string;
  Cell?: ({ data }: { data: T }) => ReactElement | string;
}

interface props<T extends object> {
  columns: columnType<T>[];
  header?: ReactElement;
  stripped?: boolean;
  pagenation?: boolean;
  data: T[];
}

function DataTable<T extends { id: number }>({
  columns,
  header,
  stripped,
  pagenation = true,
  data,
}: props<T>) {
  const [page, setPage] = useState(0);

  const pages = Math.ceil(data.length / ROWSPERPAGE);

  let startPage = 0;
  let endPage = 0;

  if (pages <= 5) {
    // If there are 5 or fewer total pages, show all of them.
    startPage = 0;
    endPage = pages - 1;
  } else if (page <= 2) {
    // If the current page is one of the first 3 (0, 1, 2), show pages 1 to 5.
    startPage = 0;
    endPage = 4;
  } else if (page >= pages - 3) {
    // If the current page is one of the last 3, show the last 5 pages.
    startPage = pages - 5;
    endPage = pages - 1;
  } else {
    // Otherwise, show 2 pages before and 2 pages after the current page.
    startPage = page - 2;
    endPage = page + 2;
  }

  return (
    <Card className="text-base font-normal h-fit">
      {header}
      {data.length > 0 ? (
        <div className="overflow-x-scroll">
          <table className="group w-full" data-stripped={stripped}>
            <thead className="sticky top-0">
              <tr className="bg-table-header-bg text-table-header-text *:nth-[1]:rounded-l-md *:nth-last-[1]:rounded-r-md">
                {columns.map((column) => (
                  <th
                    className="px-2 py-1 text-start text-sm font-normal"
                    key={column.id}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data
                .slice(page * ROWSPERPAGE, (page + 1) * ROWSPERPAGE)
                .map((row) => (
                  <tr
                    key={row.id}
                    className={cn(
                      "hover:bg-table-row-hover border-table-border border-b nth-last-[1]:border-none",
                      "group-data-[stripped=true]:even:bg-zinc-200/50",
                    )}
                  >
                    {columns.map(({ accessorKey, Cell, id }) => (
                      <td className="px-2 py-1" key={id}>
                        {/* either Cell or row[column] */}
                        {Cell ? (
                          <Cell data={row} />
                        ) : typeof accessorKey !== "undefined" && // check if type is accessable
                          (typeof row[accessorKey] === "string" ||
                            typeof row[accessorKey] === "number") ? (
                          row[accessorKey]
                        ) : null}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        "No Data Found"
      )}
      {pagenation && (
        <div className="flex items-center justify-center gap-4">
          <Button
            icon
            className="w-fit"
            disabled={page === 0}
            variant="bordered"
            onClick={() => setPage(page - 1)}
          >
            <ChevronLeft />
          </Button>
          <div className="flex gap-1">
            {Array.from({ length: endPage - startPage + 1 }).map((_, i) => {
              const pageNumber = startPage + i;
              return (
                <Button
                  icon
                  key={pageNumber}
                  variant="ghost"
                  className={cn(
                    "w-8",
                    page === pageNumber ? "!bg-zinc-200": "",
                  )}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber + 1}
                </Button>
              );
            })}
          </div>
          <Button
            icon
            className="w-fit"
            disabled={pages - 1 <= page}
            variant="bordered"
            onClick={() => setPage(page + 1)}
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      </Card>
  );
}

export default DataTable;
