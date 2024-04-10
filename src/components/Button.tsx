"use client";

import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type ButtonProps = {
  children: React.ReactNode;
} & ComponentProps<"button">;

export default function Button({
  children,
  className,
  type,
  ...props
}: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      {...props}
      type={type}
      className={`btn btn-primary ${className}`}
      disabled={pending}
    >
      {pending && <span className="loading loading-spinner"></span>}
      {children}
    </button>
  );
}
