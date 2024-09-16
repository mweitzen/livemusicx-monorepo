import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface FormStepProps extends React.HTMLAttributes<HTMLDivElement> {
  display?: boolean;
}

export const FormStep = ({ display, className, ...props }: FormStepProps) => {
  if (!display) return null;

  return <Card className={cn("space-y-6 px-6 py-8", className)} {...props} />;
};

export const FormStepHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("space-y-2 text-center", className)} {...props} />
);

export const FormStepTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("text-2xl font-bold", className)} {...props} />
);

export const FormStepDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-gray-500 dark:text-gray-400", className)} {...props} />
);

export const FormStepContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-4", className)} {...props} />
);

export const FormStepFooter = () => <div>Create Event Step Footer</div>;
