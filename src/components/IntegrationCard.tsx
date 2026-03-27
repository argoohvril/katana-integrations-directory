"use client";

import Link from "next/link";
import { Integration } from "@/data/integrations";
import IntegrationLogo from "./IntegrationLogo";
import { StatusBadge, DemandBadge } from "./StatusBadge";
import { Sparkles, Zap, Link2 } from "lucide-react";

interface IntegrationCardProps {
  integration: Integration;
}

export default function IntegrationCard({ integration }: IntegrationCardProps) {
  return (
    <Link
      href={`/integration/${integration.id}`}
      onClick={() =>
        sessionStorage.setItem("directoryScrollY", String(window.scrollY))
      }
      className="group flex flex-col gap-4 rounded-[16px] border border-border bg-card p-6 transition-all duration-150 hover:brightness-[0.9]"
    >
      {/* Header: logo + name + badges */}
      <div className="flex items-start gap-4">
        <IntegrationLogo
          website={integration.website}
          name={integration.name}
          size={48}
        />
        <div className="flex-1 min-w-0">
          <h3 className="title-md text-card-foreground truncate">
            {integration.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
            <StatusBadge status={integration.status} />
            <DemandBadge demand={integration.demand} />
          </div>
        </div>
      </div>

      {/* Best for + Main use cases */}
      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-2">
          <Sparkles size={13} className="shrink-0 mt-0.5 text-foreground opacity-50" />
          <p className="body-sm text-card-foreground">
            <span className="opacity-70">Best for: </span>
            {integration.whatItDoes}
          </p>
        </div>
        <div className="flex items-start gap-2">
          <Zap size={13} className="shrink-0 mt-0.5 text-foreground opacity-50" />
          <p className="body-sm text-card-foreground">
            <span className="opacity-70">Main use cases: </span>
            {integration.howCustomersUseIt}
          </p>
        </div>
      </div>

      {/* Connector cost info box */}
      {integration.connectorCost && (
        <div className="rounded-[6px] bg-[rgba(205,189,255,0.3)] border border-[rgba(205,189,255,0.5)] px-3 py-2 flex items-start gap-2">
          <Link2 size={12} className="shrink-0 mt-0.5 text-foreground opacity-60" />
          <span className="body-sm text-foreground opacity-80 line-clamp-1">
            {integration.connectorCost}
          </span>
        </div>
      )}

      {/* Footer: category chip + tags */}
      <div className="mt-auto pt-1 flex items-center justify-between gap-2">
        <span className="label-xs inline-block rounded-[6px] bg-border px-3 py-1 text-foreground truncate">
          {integration.category}
        </span>
        {integration.tags && integration.tags.length > 0 && (
          <div className="flex gap-1 shrink-0">
            {integration.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="label-xs rounded-[6px] bg-border px-2 py-0.5 text-foreground opacity-70"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
