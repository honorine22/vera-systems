import { ImageResponse } from "next/og";

export const alt = "Vera Systems — Precision Food Safety, Powered by Data";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        color: "white",
        background: "radial-gradient(circle at 82% 20%, #4A7BAF 0, transparent 36%), linear-gradient(135deg, #061225 0%, #0B2036 62%, #173657 100%)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 30, fontWeight: 700 }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", background: "#4A7BAF" }}>V</div>
        VERA SYSTEMS
      </div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 920 }}>
        <div style={{ color: "#9BC5EA", fontSize: 22, letterSpacing: 4, fontWeight: 700 }}>PRECISION FOOD SAFETY, POWERED BY DATA</div>
        <div style={{ marginTop: 24, fontSize: 66, lineHeight: 1.05, fontWeight: 700 }}>From paperwork to real-time control.</div>
        <div style={{ marginTop: 24, color: "rgba(255,255,255,.76)", fontSize: 26 }}>HACCP · ISO 22000 · Live monitoring · Audit readiness</div>
      </div>
    </div>,
    size,
  );
}
