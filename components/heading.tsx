import { cn } from "@/lib/utils";

interface WrapperProps {
    children: React.ReactNode;
    className?: string;
  }

export const Heading = ({ children, className = "" }: WrapperProps) => {
  return (
    <h2 className={cn("font-bold font-    text-app-black text-2xl md:text-3xl", className)}>
      {children}
    </h2>
  );
};
