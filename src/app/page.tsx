"use client";

import { useEffect, useState } from "react";
import type { Advocate } from "../types/advocate";
import { AdvocatesResponsiveView } from "../components/AdvocatesResponsiveView";
import { SearchBar } from "../components/SearchBar";
import { useDebounce } from "../hooks/useDebounce";

export default function Home() {

  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const debounced = useDebounce(searchTerm, 200);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (term: string) => {
    setSearchTerm(term);
  };

  const onClick = () => {
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  useEffect(() => {
    const term = debounced;
    const lower = term.toLowerCase();
    const filtered = advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(lower) ||
        advocate.lastName.toLowerCase().includes(lower) ||
        advocate.city.toLowerCase().includes(lower) ||
        advocate.degree.toLowerCase().includes(lower) ||
        advocate.specialties.some((s) => s.toLowerCase().includes(lower)) ||
        String(advocate.yearsOfExperience).includes(term)
      );
    });
    setFilteredAdvocates(filtered);
  }, [debounced, advocates]);

  return (
    <main className="mx-6 my-6">
      <h1 className="text-2xl font-semibold mb-4">Solace Advocates</h1>
      <SearchBar value={searchTerm} onChange={onChange} onReset={onClick} />
      <AdvocatesResponsiveView data={filteredAdvocates} />
    </main>
  );
}
