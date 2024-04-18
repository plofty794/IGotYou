import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatValue } from "react-currency-input-field";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalPages: number;
  fetchNextPage: () => void;
  totalAmount: number;
}

function AllPaymentsTable<TData, TValue>({
  columns,
  data,
  totalPages,
  totalAmount,
  fetchNextPage,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    pageCount: totalPages,
  });

  function getNextPage() {
    fetchNextPage();
    setTimeout(() => {
      table.nextPage();
    }, 200);
  }

  function getPrevPage() {
    table.previousPage();
  }

  return (
    <>
      <div className="w-full flex items-center justify-between gap-2">
        {totalPages > 1 && (
          <div className="flex items-center gap-1 ml-auto w-max">
            <Button
              disabled={!table.getCanPreviousPage()}
              onClick={getPrevPage}
              size={"sm"}
              variant={"outline"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </Button>
            <Button
              disabled={!table.getCanNextPage()}
              onClick={getNextPage}
              size={"sm"}
              variant={"outline"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </Button>
          </div>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) =>
                    cell.column.columnDef.header === "Username" ? (
                      <>
                        <TableCell
                          className={`${
                            String(cell.getContext().getValue())
                              .toLowerCase()
                              ?.includes(
                                table
                                  .getColumn("username")
                                  ?.getFilterValue() as string
                              )
                              ? "font-bold text-green-600"
                              : ""
                          }`}
                          key={cell.id}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      </>
                    ) : (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    )
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter className="bg-slate-50 text-black font-bold border">
            <TableRow>
              <TableCell className="pl-4 p-6" colSpan={6}>
                <p className="text-lg">Total</p>
              </TableCell>
              <TableCell>
                <Badge
                  variant={"outline"}
                  className="text-lg text-green-600 bg-white"
                >
                  {formatValue({
                    value: String(totalAmount),
                    intlConfig: {
                      locale: "ph",
                      currency: "php",
                    },
                    decimalScale: 2,
                  })}
                </Badge>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  );
}

export default AllPaymentsTable;
