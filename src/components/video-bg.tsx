"use client";

interface VideoBgProps {
  src: string;
  className?: string;
  overlay?: boolean;
  overlayOpacity?: number;
}

export function VideoBg({ src, className = "", overlay = false, overlayOpacity = 0.3 }: VideoBgProps) {
  return (
    <>
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        preload="metadata"
        className={`${className}`}
        style={{ pointerEvents: "none" }}
      />
      {overlay && (
        <div
          className="absolute inset-0"
          style={{ background: `rgba(0,0,0,${overlayOpacity})` }}
        />
      )}
    </>
  );
}
