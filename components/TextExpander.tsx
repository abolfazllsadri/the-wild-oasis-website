"use client";

import { useState } from "react";

const WORD_LIMIT = 40;

export default function TextExpander({ children }: { children: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const words = children.trim().split(/\s+/);
  const shouldTruncate = words.length > WORD_LIMIT;

  const displayText =
    shouldTruncate && !isExpanded
      ? `${words.slice(0, WORD_LIMIT).join(" ")}...`
      : children;

  return (
    <span>
      {displayText}{" "}
      {shouldTruncate && (
        <button
          type="button"
          aria-expanded={isExpanded}
          className="border-b border-accent-500/60 text-accent-400 transition-colors hover:text-accent-300"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? "Show less" : "Show more"}
        </button>
      )}
    </span>
  );
}
