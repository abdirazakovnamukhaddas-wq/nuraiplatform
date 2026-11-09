import { createFileRoute } from "@tanstack/react-router";
import { LegalNotice } from "@/components/LegalNotice";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [
    { title: "NUR.AI — Terms" },
    { name: "description", content: "Draft NUR.AI website terms explaining the simulated prototype and planned kindergarten services." },
    { property: "og:title", content: "NUR.AI — Terms" },
    { property: "og:description", content: "Draft NUR.AI website terms explaining the simulated prototype and planned kindergarten services." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <LegalNotice kind="terms" />,
});