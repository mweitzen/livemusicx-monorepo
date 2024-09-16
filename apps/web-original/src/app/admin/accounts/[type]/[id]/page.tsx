import { TypographyH1 } from "@/components/shared/typography";
import { api } from "@/lib/trpc/server";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    type: "venues" | "musicians" | "groups" | "organizers";
    id: string;
  };
}

export default async function AdminAccountDetailsPage({ params }: PageProps) {
  if (!["venues", "musicians", "groups", "organizers"].includes(params.type)) return notFound();
  const account = await api.accounts[params.type].getDetails.query({ id: params.id });
  if (!account) return notFound();

  return (
    <>
      <TypographyH1>Account Details</TypographyH1>
      <p>{account.name}</p>
    </>
  );
}
