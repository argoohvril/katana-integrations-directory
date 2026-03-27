"use client";

import { CATEGORIES } from "@/data/integrations";

interface CategoryFilterProps {
  selected: string | null;
  onChange: (slug: string | null) => void;
  counts: Record<string, number>;
  total: number;
}

export default function CategoryFilter({
  selected,
  onChange,
  counts,
  total,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(null)}
        className={`label-sm rounded-sm px-3 py-1.5 shadow-xs transition-colors duration-150 ${
          selected === null
            ? "bg-primary text-primary-foreground"
            : "bg-card text-card-foreground border border-border hover:bg-hover"
        }`}
      >
        All ({total})
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onChange(selected === cat.slug ? null : cat.slug)}
          className={`label-sm rounded-sm px-3 py-1.5 shadow-xs transition-colors duration-150 ${
            selected === cat.slug
              ? "bg-primary text-primary-foreground"
              : "bg-card text-card-foreground border border-border hover:bg-hover"
          }`}
        >
          {cat.label}
          {counts[cat.slug] !== undefined && (
            <span className="ml-1.5 opacity-60">({counts[cat.slug]})</span>
          )}
        </button>
      ))}
    </div>
  );
}
