import { getOpportunity, updateOpportunity } from "@/lib/store";

function authorized(request: Request) { return !process.env.ADMIN_REVIEW_KEY || request.headers.get("x-admin-key") === process.env.ADMIN_REVIEW_KEY; }

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!authorized(request)) return Response.json({ error: "Admin authorization required" }, { status: 401 });
  const { id } = await params;
  const opportunity = await getOpportunity(id);
  if (!opportunity) return Response.json({ error: "Opportunity not found" }, { status: 404 });
  const updated = await updateOpportunity(id, { status: "published", verificationStatus: opportunity.verificationStatus === "awaiting_review" ? "community_submitted" : opportunity.verificationStatus, lastVerifiedAt: new Date().toISOString() });
  return Response.json({ opportunity: updated });
}
