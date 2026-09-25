export const categories = [
  "Hackathon",
  "Competition",
  "Workshop",
  "Scholarship",
  "Internship",
  "Conference",
  "Job",
  "Other",
] as const;

export type Category = (typeof categories)[number];
export type OpportunityStatus = "draft" | "published" | "archived" | "rejected";
export type VerificationStatus =
  | "awaiting_review"
  | "community_submitted"
  | "officially_verified"
  | "rejected"
  | "expired";

export type Opportunity = {
  id: string;
  title: string;
  description: string;
  summary: string;
  category: Category;
  organizer: string;
  officialUrl: string;
  sourceUrl: string;
  sourceType: "manual" | "whatsapp" | "official" | "community";
  format: "online" | "offline" | "hybrid";
  location: string;
  eventStartDate: string | null;
  eventEndDate: string | null;
  registrationDeadline: string | null;
  eligibility: string;
  fees: string;
  benefit: string;
  skills: string[];
  tags: string[];
  verificationStatus: VerificationStatus;
  aiConfidence: number;
  status: OpportunityStatus;
  rawSource?: string;
  lastVerifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OpportunityDraft = Omit<Opportunity, "id" | "createdAt" | "updatedAt"> & {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Submission = {
  id: string;
  rawText: string;
  sourceType: Opportunity["sourceType"];
  sourceUrl: string;
  createdAt: string;
  opportunityId: string;
};
