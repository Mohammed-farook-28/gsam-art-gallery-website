"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { CareerForm } from "./career-form";

type FieldKey = "name" | "email" | "why_us" | "dreams_goals" | "submitted";

const FIELD_CONFIGS: Record<FieldKey, { src: string; message: string }> = {
  name: {
    src: "/mascot/ChatGPT Image Jun 3, 2026, 02_23_45 PM.png",
    message: "What should I call you?",
  },
  email: {
    src: "/mascot/ChatGPT Image Jun 3, 2026, 02_40_55 PM.png",
    message: "What's your email? I'll keep it safe!",
  },
  why_us: {
    src: "/mascot/ChatGPT Image Jun 3, 2026, 02_32_26 PM.png",
    message: "Tell me your story in just 3 lines!",
  },
  dreams_goals: {
    src: "/mascot/ChatGPT Image Jun 3, 2026, 02_47_24 PM.png",
    message: "What are your wildest dreams & goals?",
  },
  submitted: {
    src: "/mascot/ChatGPT Image Jun 3, 2026, 02_38_58 PM.png",
    message: "Got it! Stay tuned",
  },
};

const DEFAULT = {
  src: "/mascot/ChatGPT Image Jun 3, 2026, 02_38_58 PM.png",
  message: "We're excited to meet you!",
};

const TURTLE_SIZE = 560;

function TurtleGuide({ activeField }: { activeField: FieldKey | null }) {
  const config = activeField ? FIELD_CONFIGS[activeField] : DEFAULT;
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeField ?? "default"}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="flex flex-col items-center w-full"
      >
        {/* Speech bubble */}
        <div className="relative bg-white border border-ink/20 rounded-2xl px-5 py-4 shadow-md w-full max-w-[340px] mb-1 text-center">
          <p className="font-script italic text-ink leading-snug text-lg md:text-xl">
            {config.message}
          </p>
          <span className="absolute left-1/2 -translate-x-1/2 -bottom-[15px] block w-0 h-0"
            style={{ borderLeft: "11px solid transparent", borderRight: "11px solid transparent", borderTop: "15px solid rgba(0,0,0,0.15)" }} />
          <span className="absolute left-1/2 -translate-x-1/2 -bottom-[13px] block w-0 h-0"
            style={{ borderLeft: "9px solid transparent", borderRight: "9px solid transparent", borderTop: "13px solid white" }} />
        </div>
        {/* Turtle */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src={config.src}
            alt="Turtle guide"
            width={TURTLE_SIZE}
            height={TURTLE_SIZE}
            className="object-contain drop-shadow-xl w-48 h-48 sm:w-64 sm:h-64 md:w-auto md:h-auto"
            priority
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function CareerInteractive() {
  const [activeField, setActiveField] = useState<FieldKey | null>(null);

  return (
    <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-start">
      {/* Turtle — top on mobile, right on desktop */}
      <div className="flex md:hidden justify-center w-full">
        <div className="w-full max-w-xs">
          <TurtleGuide activeField={activeField} />
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 min-w-0 w-full">
        <CareerForm
          onFieldFocus={(field) => setActiveField((field as FieldKey) ?? null)}
          onSubmitted={() => setActiveField("submitted")}
        />
      </div>

      {/* Turtle — sticky right on desktop only */}
      <div className="hidden md:flex flex-shrink-0 flex-col items-center" style={{ width: TURTLE_SIZE }}>
        <div className="sticky top-24">
          <TurtleGuide activeField={activeField} />
        </div>
      </div>
    </div>
  );
}
