import type { ReactElement } from "react";

export interface columnType<T> {
  accessorKey?: keyof T;
  header: string;
  Cell?: ({ data }: { data: T }) => ReactElement;
}

interface props<T extends object> {
  columns: columnType<T>[];
  data: T[];
}

function DataTable<T extends { id: number }>({ columns, data }: props<T>) {
  return (
    <div className="overflow-x-scroll">
      <table className="w-full">
        <thead>
          <tr className="bg-zinc-300 *:nth-[1]:rounded-l-md *:nth-last-[1]:rounded-r-md">
            {columns.map((column) => (
              <th
                className="px-2 py-1 text-start text-sm font-normal"
                key={column.header}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className="border-b border-zinc-300 nth-last-[1]:border-none"
            >
              {columns.map(({ accessorKey, Cell, header }) => (
                <td className="px-2 py-1" key={header}>
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
  );
}

export default DataTable;
