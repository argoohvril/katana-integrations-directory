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
          <Link href="/" className="body-md text-primary hover:underline">
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
        style={{ backgroundColor: "rgb(9, 35, 50)" }}
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
                <span className="label-xs inline-block rounded-sm bg-blue-100 px-2 py-0.5 text-primary">
                  {integration.category}
                </span>
              </div>
              {integration.description && (
                <p className="body-md text-text-secondary mt-3 max-w-2xl">
                  {integration.description}
                </p>
              )}
              <div className="flex flex-wrap gap-4 mt-4">
                <a
                  href={`https://${integration.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 body-sm text-primary hover:underline"
                >
                  <Globe size={14} />
                  {integration.website}
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>

          {/* What it does + How customers use it */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-md border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-primary" />
                <h2 className="title-sm text-card-foreground">What it does</h2>
              </div>
              <p className="body-md text-card-foreground">
                {integration.whatItDoes}
              </p>
            </div>
            <div className="rounded-md border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Zap size={16} className="text-primary" />
                <h2 className="title-sm text-card-foreground">
                  How customers use it
                </h2>
              </div>
              <p className="body-md text-card-foreground">
                {integration.howCustomersUseIt}
              </p>
            </div>
          </div>

          {/* How to Connect */}
          {integration.howToConnect && (
            <div className="rounded-md border border-border bg-card shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 px-6 py-4 border-b border-border">
                <Plug size={18} className="text-primary" />
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
            <div className="rounded-md border border-amber-200 bg-amber-50 shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 px-6 py-4 border-b border-amber-200">
                <Link2 size={18} className="text-amber-700" />
                <h2 className="title-md text-amber-900">Connector Cost</h2>
              </div>
              <div className="px-6 py-5">
                <p className="body-md text-amber-800">
                  {integration.connectorCost}
                </p>
              </div>
            </div>
          )}

          {/* Key Pain Point */}
          {integration.keyPainPoint && (
            <div className="rounded-md border border-amber-200 bg-amber-50 shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 px-6 py-4 border-b border-amber-200">
                <TriangleAlert size={18} className="text-amber-700" />
                <h2 className="title-md text-amber-900">Key Pain Point</h2>
              </div>
              <div className="px-6 py-5">
                <p className="body-md text-amber-800">
                  {integration.keyPainPoint}
                </p>
              </div>
            </div>
          )}

          {/* Tags */}
          {integration.tags && integration.tags.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Tag size={16} className="text-primary" />
                <h2 className="title-sm text-foreground">Tags</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {integration.tags.map((tag) => (
                  <span
                    key={tag}
                    className="label-sm rounded-sm bg-hover border border-border px-3 py-1 text-text-secondary"
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
                <Layers size={18} className="text-primary" />
                <h2 className="title-lg text-foreground">
                  More in {integration.category}
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {relatedIntegrations.slice(0, 6).map((i) => (
                  <Link
                    key={i.id}
                    href={`/integration/${i.id}`}
                    className="flex items-center gap-4 rounded-md border border-border bg-card p-4 shadow-sm transition-colors duration-150 hover:bg-hover"
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
                      <p className="body-sm text-text-secondary truncate">
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
