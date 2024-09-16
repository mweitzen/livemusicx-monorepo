import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ShareEventsPage = () => {
  return (
    <>
      <h1 className="text-center font-semibold tracking-tight text-xl mb-2">
        Share Events Demos
      </h1>
      <Tabs defaultValue="social">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="publish">External Publish</TabsTrigger>
        </TabsList>
        <TabsContent value="social">{/* <BlankForm /> */}</TabsContent>
        <TabsContent value="email">{/* <AddDatesForm /> */}</TabsContent>
        <TabsContent value="publish">{/* <FromTemplateForm /> */}</TabsContent>
      </Tabs>
    </>
  );
};
