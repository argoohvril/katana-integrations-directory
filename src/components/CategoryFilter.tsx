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
        className={`label-sm rounded-full px-4 py-1.5 transition-colors duration-150 border ${
          selected === null
            ? "bg-[#cdbdff] border-[#cdbdff] text-black"
            : "bg-transparent text-foreground border-border hover:bg-hover"
        }`}
      >
        All ({total})
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onChange(selected === cat.slug ? null : cat.slug)}
          className={`label-sm rounded-full px-4 py-1.5 transition-colors duration-150 border ${
            selected === cat.slug
              ? "bg-[#cdbdff] border-[#cdbdff] text-black"
              : "bg-transparent text-foreground border-border hover:bg-hover"
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
