import * as content from "@/lib/content/about";
import { MarketingPageBase } from "../base";
import type { Metadata, ResolvingMetadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return <MarketingPageBase {...content} />;
}
