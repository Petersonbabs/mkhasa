import { cn } from "@/lib/utils";

interface WrapperProp {
    children: React.ReactNode;
    className?: string;
  }

export const SubHeading = ({ children, className = "" }: WrapperProp) => {
  return (
    <h2 className={cn("font-normal text-gray-500 text-sm", className)}>
      {children}
    </h2>
  );
};
