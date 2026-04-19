import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f5f1e8",
          color: "#c2410c",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 36,
          fontWeight: 700,
          letterSpacing: -2,
          fontFamily: "sans-serif",
        }}
      >
        OO
      </div>
    ),
    size,
  );
}
