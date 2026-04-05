// @source 21st.dev/r/coss.com/table
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactElement } from "react";

function Table({
  className,
  ...props
}: ComponentProps<"table">): ReactElement {
  return (
    <div
      className="relative w-full overflow-x-auto"
      data-slot="table-container"
    >
      <table
        className={cn(
          "w-full caption-bottom text-sm",
          className
        )}
        data-slot="table"
        {...props}
      />
    </div>
  );
}

function TableHeader({
  className,
  ...props
}: ComponentProps<"thead">): ReactElement {
  return (
    <thead
      className={cn("[&_tr]:border-b", className)}
      data-slot="table-header"
      {...props}
    />
  );
}

function TableBody({
  className,
  ...props
}: ComponentProps<"tbody">): ReactElement {
  return (
    <tbody
      className={cn("[&_tr:last-child]:border-0", className)}
      data-slot="table-body"
      {...props}
    />
  );
}

function TableFooter({
  className,
  ...props
}: ComponentProps<"tfoot">): ReactElement {
  return (
    <tfoot
      className={cn(
        "border-t bg-[var(--muted)]/72 font-medium [&>tr]:last:border-b-0",
        className
      )}
      data-slot="table-footer"
      {...props}
    />
  );
}

function TableRow({
  className,
  ...props
}: ComponentProps<"tr">): ReactElement {
  return (
    <tr
      className={cn(
        "border-b border-[var(--border)] transition-colors hover:bg-[var(--muted)]/72 data-[state=selected]:bg-[var(--muted)]/72",
        className
      )}
      data-slot="table-row"
      {...props}
    />
  );
}

function TableHead({
  className,
  ...props
}: ComponentProps<"th">): ReactElement {
  return (
    <th
      className={cn(
        "h-10 whitespace-nowrap px-2.5 text-left align-middle font-medium text-[var(--muted-foreground)] leading-none",
        className
      )}
      data-slot="table-head"
      {...props}
    />
  );
}

function TableCell({
  className,
  ...props
}: ComponentProps<"td">): ReactElement {
  return (
    <td
      className={cn(
        "whitespace-nowrap p-2.5 align-middle leading-none",
        className
      )}
      data-slot="table-cell"
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: ComponentProps<"caption">): ReactElement {
  return (
    <caption
      className={cn(
        "mt-4 text-[var(--muted-foreground)] text-sm",
        className
      )}
      data-slot="table-caption"
      {...props}
    />
  );
}

/* ---------- Demo data ---------- */

interface Invoice {
  id: string;
  status: "Paid" | "Pending" | "Overdue";
  method: string;
  amount: string;
}

const invoices: Invoice[] = [
  { id: "INV-001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { id: "INV-002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { id: "INV-003", status: "Overdue", method: "Bank Transfer", amount: "$350.00" },
  { id: "INV-004", status: "Paid", method: "Credit Card", amount: "$450.00" },
  { id: "INV-005", status: "Paid", method: "PayPal", amount: "$550.00" },
  { id: "INV-006", status: "Pending", method: "Bank Transfer", amount: "$200.00" },
  { id: "INV-007", status: "Overdue", method: "Credit Card", amount: "$300.00" },
];

const statusColors: Record<Invoice["status"], string> = {
  Paid: "text-green-600 dark:text-green-400",
  Pending: "text-yellow-600 dark:text-yellow-400",
  Overdue: "text-[var(--destructive)]",
};

export default function TablesDataGrid() {
  return (
    <div className="w-full max-w-3xl mx-auto rounded-xl border border-[var(--border)] bg-[var(--card)] p-1">
      <Table>
        <TableCaption>A list of recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium text-[var(--foreground)]">
                {invoice.id}
              </TableCell>
              <TableCell>
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                    statusColors[invoice.status]
                  )}
                >
                  {invoice.status}
                </span>
              </TableCell>
              <TableCell className="text-[var(--muted-foreground)]">
                {invoice.method}
              </TableCell>
              <TableCell className="text-right font-medium text-[var(--foreground)]">
                {invoice.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="font-semibold text-[var(--foreground)]">
              Total
            </TableCell>
            <TableCell className="text-right font-semibold text-[var(--foreground)]">
              $2,250.00
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
