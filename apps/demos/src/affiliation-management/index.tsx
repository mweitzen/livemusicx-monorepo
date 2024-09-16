import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OutgoingInquiries, SendInquiry } from "./inquiries/outgoing";
import { CurrentAffiliates } from "./current-affiliates/list";
import { Separator } from "@/components/ui/separator";

export const AffiliationManagementPage = () => {
  return (
    <>
      <h1 className="text-center font-semibold tracking-tight text-xl mb-2">
        Affiliation Management Demos
      </h1>
      <Tabs defaultValue="current">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="current">Current</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
        </TabsList>
        <Separator className="my-8" />
        <TabsContent value="current">
          <CurrentAffiliates />
        </TabsContent>
        <TabsContent value="requests">{/* <AddDatesForm /> */}</TabsContent>
        <TabsContent value="inquiries">
          <div className="flex flex-col">
            <p>Outgoing Demo</p>
            <SendInquiry />
            <OutgoingInquiries />
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};
