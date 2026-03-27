"use client";

import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-xl">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground opacity-40"
      />
      <input
        type="text"
        placeholder="Search by name, category, or use case..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-[6px] border border-border bg-card min-h-[45px] pl-10 pr-10 body-md text-foreground placeholder:text-foreground placeholder:opacity-40 outline-none transition-colors duration-150 focus:border-[#cdbdff] focus:ring-2 focus:ring-[rgba(205,189,255,0.5)]"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground opacity-40 hover:opacity-80 transition-opacity duration-150"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
