import { useState } from "react";
import {
  AdminTabs,
  AdminTabsContent,
  AdminTabsList,
  AdminTabsTrigger,
} from "@/components/admin-tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const BulletinBoardPage = () => {
  const [selectedFilter, setSelectedFilter] = useState<
    "venues" | "organizers" | "performers" | null
  >(null);
  return (
    <>
      <h1 className="text-center font-semibold tracking-tight text-xl mb-2">
        Bulletin Board Demos
      </h1>
      <AdminTabs defaultValue="feed">
        <AdminTabsList className="grid w-full grid-cols-3">
          <AdminTabsTrigger value="feed">Feed</AdminTabsTrigger>
          <AdminTabsTrigger value="posts">Posts</AdminTabsTrigger>
          <AdminTabsTrigger value="replies">Replies</AdminTabsTrigger>
        </AdminTabsList>
        <AdminTabsContent value="feed">
          <div>
            <div>
              <Input type="search" placeholder="Search feed" />
              <div className="grid grid-cols-4 gap-2">
                <Button
                  onClick={() => setSelectedFilter(null)}
                  variant={selectedFilter === null ? "default" : "outline"}
                >
                  All
                </Button>
                <Button
                  onClick={() => setSelectedFilter("venues")}
                  variant={selectedFilter === "venues" ? "default" : "outline"}
                >
                  Venues Seeking
                </Button>
                <Button
                  onClick={() => setSelectedFilter("organizers")}
                  variant={selectedFilter === "organizers" ? "default" : "outline"}
                >
                  Organizers Seeking
                </Button>
                <Button
                  onClick={() => setSelectedFilter("performers")}
                  variant={selectedFilter === "performers" ? "default" : "outline"}
                >
                  Performers Seeking
                </Button>
              </div>
            </div>
          </div>
        </AdminTabsContent>
        <AdminTabsContent value="posts">{/* <AddDatesForm /> */}</AdminTabsContent>
        <AdminTabsContent value="replies">{/* <FromTemplateForm /> */}</AdminTabsContent>
      </AdminTabs>
    </>
  );
};
