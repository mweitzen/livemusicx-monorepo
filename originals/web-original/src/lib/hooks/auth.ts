import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const session = useSession();

  return session.data?.user;
};

export const useCurrentRole = () => {
  const session = useSession();

  return session.data?.user?.role;
};

export const useCurrentAccountType = () => {
  const session = useSession();

  return session.data?.user?.accountType;
};

export const useAuthStatus = () => {
  const { data: session, status } = useSession();
  return status === "authenticated" && session!.user!.accountType !== "PUBLIC"
    ? "authorized"
    : status;
};
