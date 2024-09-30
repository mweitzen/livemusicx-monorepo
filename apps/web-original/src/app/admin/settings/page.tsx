import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";

export default function AdminSettingsPage() {
  return (
    <Tabs defaultValue="accounts">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="accounts">Accounts</TabsTrigger>
        <TabsTrigger value="connections">Connections</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="accounts"></TabsContent>
      <TabsContent value="connections"></TabsContent>
      <TabsContent value="notifications"></TabsContent>
    </Tabs>
  );
}
