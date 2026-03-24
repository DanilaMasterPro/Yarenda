import * as React from "react";

import { cn } from "./utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-9 w-full min-w-0 rounded-xl border border-gray-300 bg-white px-3 py-1 text-sm text-gray-900 placeholder:text-gray-400 transition-colors outline-none",
        "focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400/50",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-700",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-red-400",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
