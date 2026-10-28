"use client";

import { useState } from "react";

export default function TextExpander({ children }: { children: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const words = children.trim().split(/\s+/);
  const shouldTruncate = words.length > 40;

  const displayText =
    shouldTruncate && !isExpanded
      ? `${words.slice(0, 40).join(" ")}...`
      : children;

  return (
    <span>
      {displayText}{" "}
      {shouldTruncate && (
        <button
          type="button"
          className="border-b border-primary-700 pb-1 leading-3 text-primary-700"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? "Show less" : "Show more"}
        </button>
      )}
    </span>
  );
}
