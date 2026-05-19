"use client";
import { useEffect, useRef } from "react";

interface VideoBgProps {
  src: string;
  className?: string;
  overlay?: boolean;
  overlayOpacity?: number;
}

export function VideoBg({ src, className = "", overlay = false, overlayOpacity = 0.3 }: VideoBgProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, []);

  return (
    <>
      <video
        ref={videoRef}
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
