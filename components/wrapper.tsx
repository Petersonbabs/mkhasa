'use client'
import { cn } from "@/lib/utils";

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const Wrapper = ({ children, className = "" }: WrapperProps) => {
  return (
    <div className={cn("mx-auto w-11/12 max-w-[1140px]", className)}>
      {children}
    </div>
  );
};
