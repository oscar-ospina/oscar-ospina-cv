"use client";

import { useState } from "react";
import { decodeContact } from "@/content/encode";

type Props = {
  kind: "email" | "phone";
  encoded: string;
  labelClosed: string;
  ariaLabel: string;
  className?: string;
  children?: never;
};

export function RevealContact({ kind, encoded, labelClosed, ariaLabel, className }: Props) {
  const [revealed, setRevealed] = useState<string | null>(null);

  if (revealed) {
    const href = kind === "email" ? `mailto:${revealed}` : `tel:${revealed.replace(/\s/g, "")}`;
    return (
      <>
        <a href={href} className={className}>
          {revealed}
        </a>
        <span aria-live="polite" className="sr-only">
          {kind === "email" ? "Email revealed" : "Phone revealed"}
        </span>
      </>
    );
  }

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={() => setRevealed(decodeContact(encoded))}
      className={className}
    >
      <span aria-hidden="true" style={{ marginRight: 6 }}>
        👁
      </span>
      {labelClosed}
    </button>
  );
}
