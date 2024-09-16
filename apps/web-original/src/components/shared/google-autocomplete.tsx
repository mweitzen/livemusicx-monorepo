"use client";

import { loader } from "@/lib/google/maps";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

export function GoogleAutocomplete() {
  useEffect(() => {
    loader.importLibrary("places").then(async (Places) => {});
  }, []);
  return <Input />;
}
