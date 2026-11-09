import { createFileRoute } from "@tanstack/react-router";
import { LegalNotice } from "@/components/LegalNotice";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [
    { title: "NUR.AI — Privacy Policy" },
    { name: "description", content: "Draft NUR.AI website privacy notice covering demo requests, language storage and planned services." },
    { property: "og:title", content: "NUR.AI — Privacy Policy" },
    { property: "og:description", content: "Draft NUR.AI website privacy notice covering demo requests, language storage and planned services." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <LegalNotice kind="privacy" />,
});