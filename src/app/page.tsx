"use client";

import { useEffect, useState } from "react";
import type { Advocate } from "../types/advocate";
import { AdvocatesResponsiveView } from "../components/AdvocatesResponsiveView";

export default function Home() {

  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    console.log("filtering advocates...");
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
  };

  const onClick = () => {
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span>{searchTerm}</span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <AdvocatesResponsiveView data={filteredAdvocates} />
    </main>
  );
}
