import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "metric-card rounded-xl p-6 shadow-lg",
        className
      )}
      {...props}
    />
  );
});

Card.displayName = "Card";

export default Card;