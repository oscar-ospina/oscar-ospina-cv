import { ImageResponse } from "next/og";
import { hasLocale } from "@/content/types";
import { getContent } from "@/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Oscar Ospina — Senior Fullstack Developer";

export default async function OgImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    return new ImageResponse(<div>Not found</div>, size);
  }
  const { cv } = getContent(lang);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f5f1e8",
          display: "flex",
          flexDirection: "column",
          padding: 64,
          fontFamily: "sans-serif",
          color: "#0f0f0e",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#5c5a53",
            marginBottom: 24,
          }}
        >
          {cv.role}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 120,
            fontWeight: 600,
            letterSpacing: -4,
            lineHeight: 1,
          }}
        >
          {cv.name}.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            color: "#2a2a28",
            marginTop: 32,
            maxWidth: 900,
          }}
        >
          {cv.tagline}
        </div>
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            gap: 32,
            fontSize: 22,
            color: "#5c5a53",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <span>TS · NODE · REACT</span>
          <span>·</span>
          <span>GCP · AWS · AZURE</span>
          <span>·</span>
          <span>{cv.location}</span>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 64,
            right: 64,
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "#c2410c",
          }}
        />
      </div>
    ),
    size,
  );
}
