// @version 1.0.0
// @category ecommerce
// @name ecommerce-cart-summary
// @source custom

import { cn } from "@/lib/utils";

const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";

interface CartItem {
  name: string;
  quantity: number;
  price: string;
  imageSrc?: string;
}

interface EcommerceCartSummaryProps {
  headline?: string;
  items: CartItem[];
  subtotal: string;
  shipping?: string;
  total: string;
  className?: string;
}

export default function EcommerceCartSummary({
  headline = "Order Summary",
  items,
  subtotal,
  shipping = "Free",
  total,
  className,
}: EcommerceCartSummaryProps) {
  return (
    <section
      className={cn("w-full", className)}
      style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}
    >
      <div className="mx-auto max-w-md">
        <div className="rounded-xl border p-6" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
          <h2 className="mb-5 text-lg font-bold" style={{ color: "var(--foreground)" }}>{headline}</h2>

          <ul className="space-y-4" role="list">
            {items.map((item) => (
              <li key={item.name} className="flex items-center gap-3">
                {item.imageSrc && (
                  <img src={item.imageSrc} alt={item.name} className="size-12 rounded-lg border object-cover" style={{ borderColor: "var(--border)" }} />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{item.name}</p>
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Qty: {item.quantity}</p>
                </div>
                <span className="text-sm font-medium tabular-nums" style={{ color: "var(--foreground)" }}>{item.price}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 space-y-2 border-t pt-4" style={{ borderColor: "var(--border)" }}>
            <div className="flex justify-between text-sm">
              <span style={{ color: "var(--muted-foreground)" }}>Subtotal</span>
              <span className="tabular-nums font-medium" style={{ color: "var(--foreground)" }}>{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: "var(--muted-foreground)" }}>Shipping</span>
              <span className="tabular-nums" style={{ color: "var(--foreground)" }}>{shipping}</span>
            </div>
            <div className="flex justify-between border-t pt-2 text-base font-bold" style={{ borderColor: "var(--border)" }}>
              <span style={{ color: "var(--foreground)" }}>Total</span>
              <span className="tabular-nums" style={{ color: "var(--foreground)" }}>{total}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
