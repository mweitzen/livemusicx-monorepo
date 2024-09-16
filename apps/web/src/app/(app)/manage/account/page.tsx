import UnderConstruction from "@/components/under-construction";

export default function ManageAccountPage() {
  return (
    <UnderConstruction
      title='Manage Current Account'
      demoLinks={[
        { name: "Create Account", href: "/manage/account/new" },
        { name: "Invite Account Associate", href: "#" },
        { name: "Switch Account", href: "#" },
      ]}
    />
  );
}
