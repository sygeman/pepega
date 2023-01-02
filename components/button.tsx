import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";

export const Button: React.FC<
  ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "primary" }
> = ({ className, variant, ...props }) => (
  <button
    {...props}
    className={clsx(
      `inline-flex items-center justify-center rounded h-8 px-3`,
      "text-white text-sm font-medium focus:outline-none",
      "transition-colors delay-75",
      variant && "bg-primary hover:bg-primary/80",
      className
    )}
  />
);
