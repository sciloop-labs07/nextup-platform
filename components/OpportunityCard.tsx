import Link from "next/link";
import type { Opportunity } from "@/lib/types";

function dateLabel(value: string | null) {
  if (!value) return "No deadline listed";
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value));
}

export function OpportunityCard({ item }: { item: Opportunity }) {
  return (
    <Link className="card op-card" href={`/opportunities/${item.id}`}>
      <div className="card-top">
        <span className="pill">{item.category}</span>
        {item.verificationStatus === "officially_verified" ? <span className="verified">✓ Verified</span> : <span className="verified" style={{ color: "var(--orange)" }}>Review label</span>}
      </div>
      <h3>{item.title}</h3>
      <p className="op-summary">{item.summary}</p>
      <div className="tags">{item.tags.slice(0, 3).map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
      <div className="meta">
        <div className="meta-row"><span>Deadline</span><strong>{dateLabel(item.registrationDeadline)}</strong></div>
        <div className="meta-row"><span>Format</span><strong>{item.format} · {item.location}</strong></div>
      </div>
    </Link>
  );
}
