"use client";

import { useMemo, useState } from "react";
import { categories, type Opportunity } from "@/lib/types";
import { OpportunityCard } from "./OpportunityCard";

export function OpportunityFeed({ opportunities }: { opportunities: Opportunity[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [format, setFormat] = useState("All");
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return opportunities.filter((item) => {
      const haystack = [item.title, item.organizer, item.summary, item.description, ...item.skills, ...item.tags].join(" ").toLowerCase();
      return (!q || haystack.includes(q)) && (category === "All" || item.category === category) && (format === "All" || item.format === format);
    });
  }, [opportunities, query, category, format]);

  return (
    <>
      <div className="filters">
        <div className="search"><input aria-label="Search opportunities" placeholder="Search hackathons, skills, organizers…" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
        <select className="select" aria-label="Filter by category" value={category} onChange={(event) => setCategory(event.target.value)}>
          <option>All</option>{categories.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select className="select" aria-label="Filter by format" value={format} onChange={(event) => setFormat(event.target.value)}>
          <option>All</option><option>online</option><option>offline</option><option>hybrid</option>
        </select>
      </div>
      <div className="section-heading"><div><h2>Live opportunities</h2><p>{filtered.length} verified or reviewed opportunities for the pilot</p></div></div>
      <div className="grid">{filtered.length ? filtered.map((item) => <OpportunityCard key={item.id} item={item} />) : <div className="card empty">No opportunities match those filters yet.</div>}</div>
    </>
  );
}
