import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: "https://oscarospina.com/",
      lastModified: now,
      alternates: {
        languages: {
          en: "https://oscarospina.com/",
          es: "https://oscarospina.com/es",
        },
      },
    },
    {
      url: "https://oscarospina.com/es",
      lastModified: now,
      alternates: {
        languages: {
          en: "https://oscarospina.com/",
          es: "https://oscarospina.com/es",
        },
      },
    },
  ];
}
