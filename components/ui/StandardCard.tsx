import Image from "next/image";
import { COLORS } from "@/lib/theme";

interface StandardCardProps {
  image: string;
  title: string;
  onClick?: () => void;
  className?: string;
}

export default function StandardCard({
  image,
  title,
  onClick,
  className = "",
}: StandardCardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer ${className}`}
      style={{
        width: "280px",
        padding: "14px",
        borderRadius: "20px",
        background: "#000000",
        boxShadow: "0 6px 18px rgba(0,0,0,0.6)",
        border: `3px solid ${COLORS.primary}`,
        overflow: "hidden",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.8)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.6)";
      }}
    >
      {/* Inner glow outline */}
      <div
        style={{
          position: "absolute",
          inset: "2px",
          borderRadius: "calc(20px - 2px)",
          pointerEvents: "none",
          boxShadow: `inset 0 0 0 2px rgba(188,255,131,0.18)`,
        }}
      />

      {/* Corner glow */}
      <div
        style={{
          position: "absolute",
          right: "6px",
          top: "6px",
          width: "12px",
          height: "12px",
          borderRadius: "6px",
          background: "rgba(188,255,131,0.08)",
        }}
      />

      {/* Image wrapper */}
      <div
        style={{
          background: "#000000",
          borderRadius: "14px",
          padding: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "160px",
          position: "relative",
        }}
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="280px"
          style={{
            objectFit: "contain",
            filter: "none",
            background: "transparent",
          }}
        />
      </div>

      {/* Badge bottom-left */}
      <div
        style={{
          position: "absolute",
          left: "10px",
          bottom: "10px",
          background: `rgba(188,255,131,0.95)`,
          color: "#0b0b0b",
          padding: "8px 14px",
          borderRadius: "999px",
          fontWeight: 700,
          fontSize: "15px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          fontFamily: '"Nunito Sans", system-ui, sans-serif',
        }}
      >
        {title}
      </div>
    </div>
  );
}
