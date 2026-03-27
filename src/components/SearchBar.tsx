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
        className="absolute left-3 top-1/2 -translate-y-1/2 text-icon"
      />
      <input
        type="text"
        placeholder="Search by name, category, or use case..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-sm border border-input bg-card py-2.5 pl-10 pr-10 body-md text-card-foreground placeholder:text-text-secondary outline-none transition-colors duration-150 focus:border-primary focus:ring-2 focus:ring-ring"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-icon hover:text-foreground transition-colors duration-150"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
