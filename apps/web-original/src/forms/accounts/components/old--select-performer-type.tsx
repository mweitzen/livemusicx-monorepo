import * as React from "react";

import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Label } from "@repo/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";

export function SelectPerformerType() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create new performer</CardTitle>
        <CardDescription>
          Create a new musician or group account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="select-performer">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="performerType">Performer Type</Label>
              <Select name="performerType">
                <SelectTrigger id="performerType">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="musician">Musician</SelectItem>
                  <SelectItem value="group">Group</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button type="submit" form="select-performer">
          Add Details
        </Button>
      </CardFooter>
    </Card>
  );
}

export function SelectPerformerName() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create new performer</CardTitle>
        <CardDescription>
          Create a new musician or group account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="select-performer">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="performerType">Performer Type</Label>
              <Select name="performerType">
                <SelectTrigger id="performerType">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="musician">Musician</SelectItem>
                  <SelectItem value="group">Group</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button type="submit" form="select-performer">
          Add Details
        </Button>
      </CardFooter>
    </Card>
  );
}
