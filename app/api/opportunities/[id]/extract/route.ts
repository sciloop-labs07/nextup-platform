import { extractOpportunity } from "@/lib/ai";
import { getOpportunity, updateOpportunity } from "@/lib/store";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const opportunity = await getOpportunity(id);
  if (!opportunity) return Response.json({ error: "Opportunity not found" }, { status: 404 });
  const draft = await extractOpportunity(opportunity.rawSource ?? opportunity.description, opportunity.sourceUrl, opportunity.sourceType);
  const updated = await updateOpportunity(id, draft);
  return Response.json({ opportunity: updated });
}
