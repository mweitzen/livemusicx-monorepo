import Link from "next/link";

import { Button } from "@repo/ui/components/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";

export default function AdminAccountsPage() {
  return (
    <div className="flex flex-col">
      <Tabs defaultValue="active">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="musicians">Musicians</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
        </TabsList>
        <TabsContent value="musicians"></TabsContent>
        <TabsContent value="groups"></TabsContent>
        <TabsContent value="active"></TabsContent>
      </Tabs>
      <Button asChild>
        <Link href="/admin/accounts/create">Create Account</Link>
      </Button>
    </div>
  );
}
