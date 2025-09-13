"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Advocate } from "../types/advocate";
import { AdvocatesResponsiveView } from "../components/AdvocatesResponsiveView";
import { SearchBar } from "../components/SearchBar";
import { useDebounce } from "../hooks/useDebounce";

export default function Home() {

  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const debounced = useDebounce(searchTerm, 200);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch("/api/advocates", { signal: ctrl.signal })
      .then((response) => response.json())
      .then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          // Optionally surface to a toast/logging service
          console.error("Failed to load advocates", err);
        }
      });
    return () => ctrl.abort();
  }, []);

  const onChange = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const onClick = useCallback(() => {
    setSearchTerm("");
  }, []);

  const filteredAdvocates = useMemo(() => {
    const term = debounced;
    const lower = term.toLowerCase().trim();
    if (!lower) return advocates;
    return advocates.filter((advocate) => {
      const fullName = `${advocate.firstName} ${advocate.lastName}`.toLowerCase();
      const fullNameReversed = `${advocate.lastName} ${advocate.firstName}`.toLowerCase();
      return (
        fullName.includes(lower) ||
        fullNameReversed.includes(lower) ||
        advocate.firstName.toLowerCase().includes(lower) ||
        advocate.lastName.toLowerCase().includes(lower) ||
        advocate.city.toLowerCase().includes(lower) ||
        advocate.degree.toLowerCase().includes(lower) ||
        advocate.specialties.some((s) => s.toLowerCase().includes(lower)) ||
        String(advocate.yearsOfExperience).includes(term)
      );
    });
  }, [debounced, advocates]);

  return (
    <main className="mx-6 my-6">
      <h1 className="text-2xl font-semibold mb-4">Solace Advocates</h1>
      <SearchBar value={searchTerm} onChange={onChange} onReset={onClick} />
      <AdvocatesResponsiveView data={filteredAdvocates} />
    </main>
  );
}
