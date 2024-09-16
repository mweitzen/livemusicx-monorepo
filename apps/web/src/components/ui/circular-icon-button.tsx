import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface CircularIconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
}

const CircularIconButton = React.forwardRef<
  HTMLButtonElement,
  CircularIconButtonProps
>(({ icon, label, className, children, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      variant='ghost'
      size='icon'
      className={cn(
        "relative rounded-full h-10 w-10",
        "bg-background/0 hover:bg-background/50",
        "backdrop-blur-sm",
        "border border-border/40",
        "transition-all duration-300 ease-in-out",
        "hover:scale-105",
        className
      )}
      {...props}
    >
      <span className='sr-only'>{label}</span>
      {React.cloneElement(icon as React.ReactElement, {
        className: cn(
          "h-5 w-5",
          "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
          "transition-transform duration-300 ease-in-out",
          "group-hover:scale-110"
        ),
      })}
      {children}
    </Button>
  );
});

CircularIconButton.displayName = "CircularIconButton";

export { CircularIconButton };
