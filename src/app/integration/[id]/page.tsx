"use client";

import { use } from "react";
import { integrations } from "@/data/integrations";
import IntegrationLogo from "@/components/IntegrationLogo";
import { StatusBadge, DemandBadge } from "@/components/StatusBadge";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Sparkles,
  Zap,
  Layers,
  Globe,
  Link2,
  TriangleAlert,
  Plug,
  Tag,
} from "lucide-react";

export default function IntegrationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const integration = integrations.find((i) => i.id === Number(id));

  if (!integration) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="title-lg text-foreground mb-2">Integration not found</p>
          <Link href="/" className="body-md text-foreground opacity-70 hover:underline">
            Back to directory
          </Link>
        </div>
      </div>
    );
  }

  const relatedIntegrations = integrations.filter(
    (i) => i.categorySlug === integration.categorySlug && i.id !== integration.id
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b border-border"
        style={{ backgroundColor: "#092332" }}
      >
        <div className="wrapper py-4 flex items-center gap-4">
          <Image
            src="/katana-logo.svg"
            alt="Katana"
            width={32}
            height={32}
            className="rounded-sm"
          />
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 body-md text-white hover:underline"
          >
            <ArrowLeft size={16} />
            Back to directory
          </Link>
        </div>
      </header>

      <div className="wrapper py-8">
        <div className="max-w-4xl flex flex-col gap-8">

          {/* Hero */}
          <div className="flex items-start gap-5">
            <IntegrationLogo
              website={integration.website}
              name={integration.name}
              size={72}
            />
            <div className="flex-1 min-w-0">
              <h1 className="headline-sm text-foreground">{integration.name}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <StatusBadge status={integration.status} />
                <DemandBadge demand={integration.demand} />
                <span className="label-xs inline-block rounded-[6px] bg-border px-2.5 py-1 text-foreground">
                  {integration.category}
                </span>
              </div>
              {integration.description && (
                <p className="body-md mt-3 max-w-2xl" style={{ color: "rgba(0,0,0,0.7)" }}>
                  {integration.description}
                </p>
              )}
              <div className="flex flex-wrap gap-4 mt-4">
                <a
                  href={`https://${integration.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 body-sm text-foreground opacity-70 hover:opacity-100 hover:underline"
                >
                  <Globe size={14} />
                  {integration.website}
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>

          {/* Best for + Main use cases */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[16px] border border-border bg-card p-6">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-foreground opacity-50" />
                <h2 className="title-sm text-card-foreground">Best for</h2>
              </div>
              <p className="body-md text-card-foreground">
                {integration.whatItDoes}
              </p>
            </div>
            <div className="rounded-[16px] border border-border bg-card p-6">
              <div className="flex items-center gap-2 mb-2">
                <Zap size={16} className="text-foreground opacity-50" />
                <h2 className="title-sm text-card-foreground">
                  Main use cases
                </h2>
              </div>
              <p className="body-md text-card-foreground">
                {integration.howCustomersUseIt}
              </p>
            </div>
          </div>

          {/* How to Connect */}
          {integration.howToConnect && (
            <div className="rounded-[16px] border border-border bg-card overflow-hidden">
              <div className="flex items-center gap-2 px-6 py-4 border-b border-border">
                <Plug size={18} className="text-foreground opacity-50" />
                <h2 className="title-md text-card-foreground">How to Connect</h2>
              </div>
              <div className="px-6 py-5">
                <p className="body-md text-card-foreground">
                  {integration.howToConnect}
                </p>
              </div>
            </div>
          )}

          {/* Connector Cost */}
          {integration.connectorCost && (
            <div className="rounded-[16px] border border-[rgba(205,189,255,0.5)] bg-[rgba(205,189,255,0.2)] overflow-hidden">
              <div className="flex items-center gap-2 px-6 py-4 border-b border-[rgba(205,189,255,0.5)]">
                <Link2 size={18} className="text-foreground opacity-60" />
                <h2 className="title-md text-foreground">Connector Cost</h2>
              </div>
              <div className="px-6 py-5">
                <p className="body-md text-foreground" style={{ color: "rgba(0,0,0,0.8)" }}>
                  {integration.connectorCost}
                </p>
              </div>
            </div>
          )}

          {/* Key Pain Point */}
          {integration.keyPainPoint && (
            <div className="rounded-[16px] border border-[#ffe3b8] bg-[rgba(255,227,184,0.3)] overflow-hidden">
              <div className="flex items-center gap-2 px-6 py-4 border-b border-[#ffe3b8]">
                <TriangleAlert size={18} className="text-foreground opacity-60" />
                <h2 className="title-md text-foreground">Key Pain Point</h2>
              </div>
              <div className="px-6 py-5">
                <p className="body-md" style={{ color: "rgba(0,0,0,0.8)" }}>
                  {integration.keyPainPoint}
                </p>
              </div>
            </div>
          )}

          {/* Tags */}
          {integration.tags && integration.tags.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Tag size={16} className="text-foreground opacity-50" />
                <h2 className="title-sm text-foreground">Tags</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {integration.tags.map((tag) => (
                  <span
                    key={tag}
                    className="label-sm rounded-[6px] bg-border px-3 py-1 text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related integrations */}
          {relatedIntegrations.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Layers size={18} className="text-foreground opacity-50" />
                <h2 className="title-lg text-foreground">
                  More in {integration.category}
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {relatedIntegrations.slice(0, 6).map((i) => (
                  <Link
                    key={i.id}
                    href={`/integration/${i.id}`}
                    className="flex items-center gap-4 rounded-[16px] border border-border bg-card p-4 transition-all duration-150 hover:brightness-[0.9]"
                  >
                    <IntegrationLogo
                      website={i.website}
                      name={i.name}
                      size={32}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="title-sm text-card-foreground truncate">
                        {i.name}
                      </p>
                      <p className="body-sm truncate" style={{ color: "rgba(0,0,0,0.7)" }}>
                        {i.whatItDoes}
                      </p>
                    </div>
                    <StatusBadge status={i.status} />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
