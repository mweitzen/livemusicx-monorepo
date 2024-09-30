import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";

export default function AdminAffiliatesPage() {
  return (
    <Tabs defaultValue="active">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="inactive">Inactive</TabsTrigger>
        <TabsTrigger value="requests">Requests</TabsTrigger>
      </TabsList>
      <TabsContent value="active"></TabsContent>
      <TabsContent value="inactive"></TabsContent>
      <TabsContent value="requests"></TabsContent>
    </Tabs>
  );
}
