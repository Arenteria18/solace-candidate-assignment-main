"use client";

import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onReset: () => void;
}

export function SearchBar({ value, onChange, onReset }: SearchBarProps) {
  return (
    <section aria-labelledby="search-label" className="surface p-4 mb-6">
      <h2 id="search-label" className="sr-only">
        Search advocates
      </h2>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <label htmlFor="advocate-search" className="text-sm caption m-0 p-0">
          Search
        </label>
        <div className="flex w-full max-w-xl gap-2 relative">
          <input
            id="advocate-search"
            type="search"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Name, city, degree, specialty, years"
            className="flex-1 rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3 py-2 pr-9 text-sm outline-none focus:ring-2 focus:ring-[rgb(var(--focus))]"
          />
          {value && (
            <button
              type="button"
              onClick={onReset}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-6 h-6 text-center text-sm text-[rgb(var(--muted))] hover:bg-[rgb(245,245,245)] focus:ring-2 focus:ring-[rgb(var(--focus))]"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>
      <p className="mt-2 text-sm text-[rgb(var(--muted))]" aria-live="polite">
        Searching for: <span className="font-medium text-[rgb(var(--text))]">{value}</span>
      </p>
    </section>
  );
}
