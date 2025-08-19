import React, { useMemo, useState } from "react";

/** Column definition */
export interface Column<T> {
  key: string;                 // unique id for column
  title: string;               // header label
  dataIndex: keyof T;          // field on the row
  sortable?: boolean;          // enable header click sorting
  render?: (value: any, row: T, rowIndex: number) => React.ReactNode; // optional custom cell
}

/** Component props */
export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;                               // enable row selection
  onRowSelect?: (selectedRows: T[]) => void;
  /** OPTIONAL but handy: single vs multiple selection (defaults to multiple) */
  selectionMode?: "single" | "multiple";
  /** OPTIONAL: how to uniquely identify a row (defaults to row index) */
  rowKey?: (row: T, index: number) => string | number;
  /** OPTIONAL: initial sort state */
  initialSort?: { key: string; direction: "asc" | "desc" };
  /** OPTIONAL: empty message */
  emptyMessage?: string;
  /** Optional className passthrough */
  className?: string;
}

/** A tiny helper that compares strings/numbers/dates reasonably */
function defaultCompare(a: unknown, b: unknown) {
  // handle undefined/null first
  if (a == null && b == null) return 0;
  if (a == null) return -1;
  if (b == null) return 1;

  // numbers
  if (typeof a === "number" && typeof b === "number") return a - b;

  // dates
  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();

  // fallback to string compare (case-insensitive)
  return String(a).localeCompare(String(b), undefined, { sensitivity: "base" });
}

export function DataTable<T>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  selectionMode = "multiple",
  rowKey,
  initialSort,
  emptyMessage = "No data to display",
  className = "",
}: DataTableProps<T>) {
  const [sort, setSort] = useState<{ key: string; direction: "asc" | "desc" } | null>(
    initialSort ?? null
  );
  const [selectedKeys, setSelectedKeys] = useState<Set<string | number>>(new Set());

  // create row keys
  const keys = useMemo(
    () => data.map((row, i) => (rowKey ? rowKey(row, i) : i)),
    [data, rowKey]
  );

  // derived sorted data
  const sortedData = useMemo(() => {
    if (!sort) return data;
    const col = columns.find((c) => c.key === sort.key);
    if (!col) return data;

    const idx = col.dataIndex;
    const dir = sort.direction;
    const sorted = [...data].sort((ra, rb) => {
      const res = defaultCompare(ra[idx], rb[idx]);
      return dir === "asc" ? res : -res;
    });
    return sorted;
  }, [data, columns, sort]);

  const allSelected = selectable && selectedKeys.size === data.length && data.length > 0;

  function toggleSort(col: Column<T>) {
    if (!col.sortable) return;
    setSort((prev) => {
      if (!prev || prev.key !== col.key) return { key: col.key, direction: "asc" };
      if (prev.direction === "asc") return { key: col.key, direction: "desc" };
      return null; // third click clears sort
    });
  }

  function toggleRowSelection(key: string | number, row: T) {
    if (!selectable) return;

    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (selectionMode === "single") {
        next.clear();
        next.add(key);
      } else {
        if (next.has(key)) next.delete(key);
        else next.add(key);
      }
      // fire callback with selected rows
      if (onRowSelect) {
        const selectedRows = sortedData.filter((r, i) => {
          const k = rowKey ? rowKey(r, i) : i;
          return next.has(k);
        });
        onRowSelect(selectedRows);
      }
      return next;
    });
  }

  function toggleAll() {
    if (!selectable || selectionMode === "single") return;
    setSelectedKeys((prev) => {
      let next: Set<string | number>;
      if (prev.size === data.length) {
        next = new Set();
      } else {
        next = new Set(keys);
      }
      if (onRowSelect) {
        const selectedRows = sortedData.filter((r, i) => {
          const k = rowKey ? rowKey(r, i) : i;
          return next.has(k);
        });
        onRowSelect(selectedRows);
      }
      return next;
    });
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <table
          role="table"
          className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900"
        >
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {selectable && (
                <th scope="col" className="w-12 px-4 py-3">
                  {selectionMode === "multiple" ? (
                    <input
                      aria-label={allSelected ? "Deselect all rows" : "Select all rows"}
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                      className="h-4 w-4 rounded border-gray-300 dark:border-gray-600"
                    />
                  ) : (
                    <span className="sr-only">Selection</span>
                  )}
                </th>
              )}
              {columns.map((col) => {
                const isSorted = sort?.key === col.key;
                const ariaSort = isSorted ? (sort!.direction === "asc" ? "ascending" : "descending") : "none";
                return (
                  <th
                    key={col.key}
                    scope="col"
                    aria-sort={ariaSort as "none" | "ascending" | "descending"}
                    className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200"
                  >
                    {col.sortable ? (
                      <button
                        type="button"
                        onClick={() => toggleSort(col)}
                        className="inline-flex items-center gap-1 hover:underline"
                        aria-label={
                          isSorted
                            ? `Sort ${col.title} ${sort!.direction === "asc" ? "descending" : "none"}`
                            : `Sort ${col.title} ascending`
                        }
                      >
                        {col.title}
                        <span className="text-xs opacity-60">
                          {isSorted ? (sort!.direction === "asc" ? "▲" : "▼") : "↕"}
                        </span>
                      </button>
                    ) : (
                      col.title
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {/* Loading state */}
            {loading && (
              <>
                {Array.from({ length: Math.max(3, Math.min(6, data.length || 3)) }).map(
                  (_, i) => (
                    <tr key={`skeleton-${i}`} className="animate-pulse">
                      {selectable && <td className="px-4 py-3"><div className="h-4 w-4 rounded bg-gray-200 dark:bg-gray-700" /></td>}
                      {columns.map((c) => (
                        <td key={`${c.key}-${i}`} className="px-4 py-3">
                          <div className="h-4 w-40 max-w-full rounded bg-gray-200 dark:bg-gray-700" />
                        </td>
                      ))}
                    </tr>
                  )
                )}
              </>
            )}

            {/* Empty state */}
            {!loading && sortedData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-4 py-10 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}

            {/* Data rows */}
            {!loading &&
              sortedData.map((row, rowIndex) => {
                const k = rowKey ? rowKey(row, rowIndex) : rowIndex;
                const isSelected = selectedKeys.has(k);

                return (
                  <tr
                    key={k}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                      isSelected ? "bg-indigo-50/60 dark:bg-indigo-900/20" : ""
                    }`}
                  >
                    {selectable && (
                      <td className="px-4 py-3 align-middle">
                        {selectionMode === "multiple" ? (
                          <input
                            type="checkbox"
                            aria-label={`Select row ${rowIndex + 1}`}
                            className="h-4 w-4 rounded border-gray-300 dark:border-gray-600"
                            checked={isSelected}
                            onChange={() => toggleRowSelection(k, row)}
                          />
                        ) : (
                          <input
                            type="radio"
                            name="datatable-radio"
                            aria-label={`Select row ${rowIndex + 1}`}
                            className="h-4 w-4 border-gray-300 dark:border-gray-600"
                            checked={isSelected}
                            onChange={() => toggleRowSelection(k, row)}
                          />
                        )}
                      </td>
                    )}

                    {columns.map((col, ci) => {
                      const val = row[col.dataIndex];
                      return (
                        <td key={`${k}-${col.key}-${ci}`} className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">
                          {col.render ? col.render(val, row, rowIndex) : (val as React.ReactNode)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
