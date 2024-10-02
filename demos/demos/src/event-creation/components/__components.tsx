import { cn } from "~/lib/utils";

export const CreateEventFormBase = () => {
  return <div>Create Event Form Base</div>;
};

export const CreateEventStep = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("space-y-6", className)}
      {...props}
    />
  );
};

export const CreateEventStepHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("space-y-2 text-center", className)}
    {...props}
  />
);

export const CreateEventStepTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className={cn("text-2xl font-bold", className)}
    {...props}
  />
);

export const CreateEventStepDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn("text-gray-500 dark:text-gray-400", className)}
    {...props}
  />
);

export const CreateEventStepContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("space-y-4", className)}
    {...props}
  />
);

export const CreateEventStepFooter = () => <div>Create Event Step Footer</div>;
