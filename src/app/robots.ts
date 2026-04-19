import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://oscarospina.com/sitemap.xml",
    host: "https://oscarospina.com",
  };
}
