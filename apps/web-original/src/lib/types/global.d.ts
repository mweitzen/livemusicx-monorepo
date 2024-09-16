// TODO: add to monorepo

export type UserRole = "admin" | "user";
declare global {
  interface PublicDetailPageProps {
    params: { slug: string };
  }

  interface ErrorPageProps {
    error: Error & { digest?: string };
    reset: () => void;
  }

  interface LayoutProps {
    children: React.ReactNode;
  }

  interface SearchParams {
    [key: string]: string | string[] | undefined;
  }
}
