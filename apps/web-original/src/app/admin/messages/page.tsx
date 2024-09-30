import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";

export default function AdminMessagesPage() {
  return (
    <Tabs defaultValue="affiliates">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="affiliates">Affiliates</TabsTrigger>
        <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
        <TabsTrigger value="bulletins">Bulletins</TabsTrigger>
      </TabsList>
      <TabsContent value="affiliates"></TabsContent>
      <TabsContent value="inquiries"></TabsContent>
      <TabsContent value="bulletins"></TabsContent>
    </Tabs>
  );
}
