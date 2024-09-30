"use client";

import { useAuthStatus } from "~/lib/hooks/auth";

interface MenuSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  //   hidden?: boolean;
  type: "public" | "authenticated" | "authorized";
}

export const MenuSection = (props: MenuSectionProps) => {
  const authStatus = useAuthStatus();

  if (authStatus === "loading") return null;
  if (authStatus === "unauthenticated" && props.type !== "public") return null;
  if (authStatus === "authenticated" && props.type === "authorized")
    return null;

  return <div className="py-4" {...props} />;
};
