"use client";

import { useState, useRef, useEffect } from "react";
import { getLogoUrl, getFallbackLogoUrl } from "@/lib/logos";
import { Puzzle } from "lucide-react";

interface IntegrationLogoProps {
  website: string;
  name: string;
  size?: number;
}

export default function IntegrationLogo({
  website,
  name,
  size = 40,
}: IntegrationLogoProps) {
  const [src, setSrc] = useState(getLogoUrl(website));
  const [errCount, setErrCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  const handleError = () => {
    if (errCount === 0) {
      setLoaded(false);
      setSrc(getFallbackLogoUrl(website));
      setErrCount(1);
    } else {
      setErrCount(2);
    }
  };

  const initials = name
    .split(/[\s&]+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const showFallback = errCount >= 2;

  return (
    <div
      className="relative shrink-0 flex items-center justify-center rounded-sm bg-hover overflow-hidden"
      style={{ width: size, height: size }}
    >
      {!loaded && !showFallback && (
        <span
          className="label-sm text-primary select-none"
          style={{ fontSize: size * 0.3 }}
        >
          {initials}
        </span>
      )}
      {showFallback && (
        <Puzzle size={size * 0.45} className="text-icon" />
      )}
      {!showFallback && (
        <img
          ref={imgRef}
          src={src}
          alt={`${name} logo`}
          width={size}
          height={size}
          className={`absolute inset-0 w-full h-full rounded-sm object-contain bg-card transition-opacity duration-150 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onError={handleError}
          onLoad={() => setLoaded(true)}
        />
      )}
    </div>
  );
}
