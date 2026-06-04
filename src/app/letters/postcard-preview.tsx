"use client";

export function PostcardPreview({ senderName }: { senderName: string }) {
  return (
    <div className="relative w-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/postcard-design-v2.svg"
        alt="Postcard design"
        className="w-full h-auto"
      />
      {senderName && (
        <span
          className="absolute pointer-events-none whitespace-nowrap"
          style={{
            left: "24%",
            top: "44%",
            fontFamily: "var(--font-script-plain)",
            fontSize: "clamp(0.7rem, 1.2vw, 1rem)",
            color: "#1a1209",
            lineHeight: 1,
            letterSpacing: "0.02em",
          }}
        >
          {senderName}
        </span>
      )}
    </div>
  );
}
