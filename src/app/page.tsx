"use client";

import { useState, useMemo, useEffect } from "react";
import { integrations, CATEGORIES } from "@/data/integrations";
import IntegrationCard from "@/components/IntegrationCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import { Puzzle } from "lucide-react";
import Image from "next/image";

// Most requested integrations from VoC research — pinned to top when no filter active
const FEATURED_IDS = [9, 1, 24, 34, 25]; // Amazon, Shopify, QuickBooks Online, ShipStation, Xero

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("directoryScrollY");
    if (saved) {
      sessionStorage.removeItem("directoryScrollY");
      window.scrollTo({ top: parseInt(saved), behavior: "instant" });
    }
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of CATEGORIES) {
      counts[cat.slug] = integrations.filter(
        (i) => i.categorySlug === cat.slug
      ).length;
    }
    return counts;
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    const results = integrations.filter((i) => {
      if (category && i.categorySlug !== category) return false;
      if (!q) return true;
      return (
        i.name.toLowerCase().includes(q) ||
        i.whatItDoes.toLowerCase().includes(q) ||
        i.howCustomersUseIt.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q) ||
        i.website.toLowerCase().includes(q) ||
        i.tags?.some((t) => t.toLowerCase().includes(q))
      );
    });

    // When no search/filter active, pin featured integrations to the top
    if (!q && !category) {
      const featured = FEATURED_IDS.map((id) =>
        results.find((i) => i.id === id)
      ).filter(Boolean) as typeof results;
      const rest = results.filter((i) => !FEATURED_IDS.includes(i.id));
      return [...featured, ...rest];
    }

    return results;
  }, [search, category]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header
        className="border-b border-border"
        style={{ backgroundColor: "rgb(9, 35, 50)" }}
      >
        <div className="wrapper py-6">
          <div className="flex items-center gap-4">
            <Image
              src="/katana-logo.svg"
              alt="Katana"
              width={40}
              height={40}
              className="rounded-sm"
            />
            <div>
              <h1 className="headline-sm text-white">Integrations Directory</h1>
              <p className="body-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                {integrations.length} integrations across {CATEGORIES.length} categories — sourced from customer VoC research
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Search & Filters */}
      <section className="wrapper py-8 flex flex-col gap-4">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter
          selected={category}
          onChange={setCategory}
          counts={categoryCounts}
          total={integrations.length}
        />
      </section>

      {/* Results count */}
      <div className="wrapper pb-2">
        <p className="label-sm text-text-secondary">
          {filtered.length} integration{filtered.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Grid */}
      <main className="wrapper pb-12">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Puzzle size={48} className="text-icon mb-4" />
            <p className="title-md text-foreground mb-1">No integrations found</p>
            <p className="body-md text-text-secondary">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((integration) => (
              <IntegrationCard key={integration.id} integration={integration} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
