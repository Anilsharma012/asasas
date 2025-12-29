import React, { useEffect, useState } from "react";
import { ASHISH_LOGO_URL } from "../lib/constants";

/**
 * Logo badge for the red header.
 * - Sits to the right of the hamburger (no overlap / no clipping)
 * - On small screens: only round "AP" badge
 * - On md+ screens: badge + wordmark
 * - Falls back to text if logo image missing
 */

export default function HomeTopBar() {
  const [src, setSrc] = useState<string | null>(null);
  const candidates = [
    ASHISH_LOGO_URL,
    "/brand/marco-logo.svg",
    "/brand/marco-logo.png",
    "/icons/icon-192.png",
  ];

  useEffect(() => {
    let i = 0;
    const img = new Image();
    const tryNext = () => {
      if (i >= candidates.length) {
        setSrc(null);
        return;
      }
      const test = candidates[i++];
      img.onload = () => setSrc(test);
      img.onerror = tryNext;
      img.src = test;
    };
    tryNext();
  }, []);

  return (
    <>
      <a
        href="/"
        aria-label="Marco Fashion Home"
        className="fixed top-2 left-16 md:left-20 z-[9999] inline-flex items-center gap-2 no-underline"
        style={{ pointerEvents: "auto" }}
      >
        {src ? (
          <img
            src={src}
            alt="Marco Fashion"
            className="hidden md:inline-block h-8 md:h-9 w-auto select-none drop-shadow-md"
            draggable={false}
          />
        ) : (
          <span className="hidden md:inline-flex h-8 w-8 md:h-9 md:w-9 rounded-full bg-white/90 text-gray-800 font-extrabold flex items-center justify-center shadow-sm">
            MF
          </span>
        )}

        <span className="sr-only">marco-fashion.com</span>
      </a>
    </>
  );
}
