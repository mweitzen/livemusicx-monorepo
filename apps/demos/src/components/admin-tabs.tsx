import React from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const AdminTabs = (props: React.ComponentProps<typeof Tabs>) => {
  return <Tabs {...props} />;
};

export const AdminTabsList = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsList>) => {
  return <TabsList {...props} className={cn("grid grid-cols-1", className)} />;
};

export const AdminTabsTrigger = ({
  hidden,
  ...props
}: React.ComponentProps<typeof TabsTrigger>) => {
  if (hidden) return null;
  return <TabsTrigger {...props} />;
};

export const AdminTabsContent = ({
  hidden,
  ...props
}: React.ComponentProps<typeof TabsContent>) => {
  if (hidden) return null;
  return <TabsContent {...props} />;
};
