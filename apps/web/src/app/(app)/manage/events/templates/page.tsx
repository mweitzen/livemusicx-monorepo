import UnderConstruction from "@/components/under-construction";

export default function EventTemplatesPage() {
  return (
    <UnderConstruction
      title='Event Templates'
      demoLinks={[
        { name: "Create Template", href: "/manage/events/templates/new" },
      ]}
    />
  );
}
