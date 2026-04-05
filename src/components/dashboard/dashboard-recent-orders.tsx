// @version 1.0.0
// @category dashboard
// @name dashboard-recent-orders
// @source custom

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const HEADING_SIZE = "1.125rem";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type OrderStatus = "completed" | "pending" | "cancelled" | "processing";

interface Order {
  id: string;
  customer: string;
  amount: string;
  status: OrderStatus;
  date: string;
}

interface DashboardRecentOrdersProps {
  headline?: string;
  orders: Order[];
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const STATUS_COLORS: Record<OrderStatus, { bg: string; text: string }> = {
  completed: {
    bg: "color-mix(in srgb, var(--primary) 10%, transparent)",
    text: "var(--primary)",
  },
  pending: {
    bg: "color-mix(in srgb, var(--foreground) 8%, transparent)",
    text: "var(--muted-foreground)",
  },
  cancelled: {
    bg: "color-mix(in srgb, var(--destructive, red) 10%, transparent)",
    text: "var(--destructive, red)",
  },
  processing: {
    bg: "color-mix(in srgb, var(--primary) 8%, transparent)",
    text: "var(--primary)",
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function DashboardRecentOrders({
  headline = "Recent Orders",
  orders,
  className,
}: DashboardRecentOrdersProps) {
  return (
    <div
      className={cn("rounded-xl border", className)}
      style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
    >
      <div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: "var(--border)" }}>
        <h3 className="font-semibold" style={{ fontSize: HEADING_SIZE, color: "var(--foreground)" }}>
          {headline}
        </h3>
        <span className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>
          {orders.length} orders
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: "color-mix(in srgb, var(--foreground) 2%, var(--background))" }}>
              <th className="px-5 py-2.5 text-left text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>Order</th>
              <th className="px-5 py-2.5 text-left text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>Customer</th>
              <th className="px-5 py-2.5 text-right text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>Amount</th>
              <th className="px-5 py-2.5 text-center text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>Status</th>
              <th className="px-5 py-2.5 text-right text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => {
              const sc = STATUS_COLORS[order.status];
              return (
                <tr
                  key={order.id}
                  className="border-t"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: i % 2 === 1
                      ? "color-mix(in srgb, var(--foreground) 1%, var(--card))"
                      : "var(--card)",
                  }}
                >
                  <td className="px-5 py-3 font-medium" style={{ color: "var(--foreground)" }}>{order.id}</td>
                  <td className="px-5 py-3" style={{ color: "var(--muted-foreground)" }}>{order.customer}</td>
                  <td className="px-5 py-3 text-right tabular-nums font-medium" style={{ color: "var(--foreground)" }}>{order.amount}</td>
                  <td className="px-5 py-3 text-center">
                    <span
                      className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize"
                      style={{ backgroundColor: sc.bg, color: sc.text }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right" style={{ color: "var(--muted-foreground)" }}>{order.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
