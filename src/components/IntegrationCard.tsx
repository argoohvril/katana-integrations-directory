"use client";

import Link from "next/link";
import { Integration } from "@/data/integrations";
import IntegrationLogo from "./IntegrationLogo";
import { StatusBadge, DemandBadge } from "./StatusBadge";
import { ArrowUpRight, Sparkles, Zap, Link2 } from "lucide-react";

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
      className="group flex flex-col gap-4 rounded-md border border-border bg-card p-6 shadow-sm transition-all duration-150 hover:shadow-md hover:bg-hover"
    >
      {/* Header: logo + name + badges */}
      <div className="flex items-start gap-4">
        <IntegrationLogo
          website={integration.website}
          name={integration.name}
          size={48}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="title-md text-card-foreground truncate">
              {integration.name}
            </h3>
            <ArrowUpRight
              size={16}
              className="shrink-0 text-icon opacity-0 transition-opacity duration-150 group-hover:opacity-100"
            />
          </div>
          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
            <StatusBadge status={integration.status} />
            <DemandBadge demand={integration.demand} />
          </div>
        </div>
      </div>

      {/* What it does + How customers use it */}
      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-2">
          <Sparkles size={13} className="shrink-0 mt-0.5 text-primary" />
          <p className="body-sm text-card-foreground line-clamp-1">
            <span className="text-text-secondary">What it does: </span>
            {integration.whatItDoes}
          </p>
        </div>
        <div className="flex items-start gap-2">
          <Zap size={13} className="shrink-0 mt-0.5 text-primary" />
          <p className="body-sm text-card-foreground line-clamp-2">
            <span className="text-text-secondary">How customers use it: </span>
            {integration.howCustomersUseIt}
          </p>
        </div>
      </div>

      {/* Connector cost info box */}
      {integration.connectorCost && (
        <div className="rounded-sm bg-amber-50 border border-amber-200 px-3 py-2 flex items-start gap-2">
          <Link2 size={12} className="shrink-0 mt-0.5 text-amber-600" />
          <span className="body-sm text-amber-800 line-clamp-1">
            {integration.connectorCost}
          </span>
        </div>
      )}

      {/* Footer: category chip + tags */}
      <div className="mt-auto pt-1 flex items-center justify-between gap-2">
        <span className="label-xs inline-block rounded-sm bg-blue-100 px-2 py-0.5 text-primary truncate">
          {integration.category}
        </span>
        {integration.tags && integration.tags.length > 0 && (
          <div className="flex gap-1 shrink-0">
            {integration.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="label-xs rounded-sm bg-hover border border-border px-1.5 py-0.5 text-text-secondary"
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
