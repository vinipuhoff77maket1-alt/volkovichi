import { createFileRoute } from "@tanstack/react-router";
import VillageApp from "@/components/VillageApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Воўкавічы — официальный сайт деревни" },
      {
        name: "description",
        content:
          "Премиальный современный сайт деревни Воўкавічы: новости, события, доска объявлений, расписания, справочник и контакты.",
      },
      { property: "og:title", content: "Воўкавічы — наша деревня, наша семья" },
      {
        property: "og:description",
        content:
          "Деревня Воўкавічы: события, новости, объявления жителей, расписания и справочник в одном месте.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: "/assets/image2.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/assets/image2.png" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: VillageApp,
});
