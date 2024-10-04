"use client";

import { useState } from "react";
import { capitalize } from "@repo/utils";

import { BandProfileForm } from "./band";
import { MusicianProfileForm } from "./musician";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";

type PerformerType = "musician" | "band" | null;

export function CreatePerformerProfile() {
  const [type, setType] = useState<PerformerType>(null);

  return (
    <Card className='w-full max-w-2xl mx-auto'>
      <CardHeader>
        <CardTitle>
          Create Your {capitalize(type) ?? "Performer"} Profile
        </CardTitle>
        <CardDescription>
          Get discovered and connect with fans, venues, and organizers
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!type && (
          <div className='flex flex-col gap-4'>
            <Button
              variant='outline'
              onClick={() => setType("musician")}
            >
              Musician
            </Button>
            <Button
              variant='outline'
              onClick={() => setType("band")}
            >
              Band
            </Button>
          </div>
        )}
        {type === "musician" && <MusicianProfileForm setType={setType} />}
        {type === "band" && <BandProfileForm setType={setType} />}
      </CardContent>
    </Card>
  );
}
