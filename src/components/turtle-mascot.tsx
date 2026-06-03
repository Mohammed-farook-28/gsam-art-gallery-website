"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function TurtleMascot() {
  return (
    <div className="flex flex-col items-center select-none">
      {/* Speech bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative bg-white border border-ink/20 rounded-2xl px-7 py-5 shadow-md max-w-[260px] mb-1"
      >
        <p
          className="font-script-plain text-ink leading-snug text-center"
          style={{ fontSize: "clamp(1.15rem, 2vw, 1.5rem)" }}
        >
          we&apos;d love to hear from you.
        </p>
        {/* Tail border */}
        <span
          className="absolute left-1/2 -translate-x-1/2 -bottom-[15px] block w-0 h-0"
          style={{
            borderLeft: "11px solid transparent",
            borderRight: "11px solid transparent",
            borderTop: "15px solid rgba(0,0,0,0.18)",
          }}
        />
        {/* Tail fill */}
        <span
          className="absolute left-1/2 -translate-x-1/2 -bottom-[13px] block w-0 h-0"
          style={{
            borderLeft: "9px solid transparent",
            borderRight: "9px solid transparent",
            borderTop: "13px solid white",
          }}
        />
      </motion.div>

      {/* Turtle — floats up and down */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <Image
            src="/mascot/ChatGPT Image Jun 3, 2026, 01_54_50 PM.png"
            alt="Friendly turtle waving hello"
            width={520}
            height={520}
            className="object-contain drop-shadow-xl"
            priority
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
