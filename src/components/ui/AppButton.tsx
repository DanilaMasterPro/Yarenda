import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const appButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-gray-900 shadow-sm",
        secondary:
          "border-2 border-gray-900 text-gray-900 bg-transparent hover:bg-gray-900 hover:text-white active:bg-gray-800",
        ghost:
          "text-gray-700 hover:bg-gray-100 active:bg-gray-200",
        outline:
          "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100",
      },
      size: {
        sm: "h-8 px-3 text-sm rounded-md",
        md: "h-10 px-4 text-sm rounded-lg",
        lg: "h-12 px-6 text-base rounded-lg",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface AppButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof appButtonVariants> {}

export function AppButton({ className, variant, size, ...props }: AppButtonProps) {
  return (
    <button
      className={cn(appButtonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
