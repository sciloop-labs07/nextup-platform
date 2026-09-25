import { getOpportunity, saveOpportunity } from "@/lib/store";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!(await getOpportunity(id))) return Response.json({ error: "Opportunity not found" }, { status: 404 });
  const body = await request.json().catch(() => ({}));
  const userId = typeof body.userId === "string" && body.userId ? body.userId : "demo-student";
  await saveOpportunity(userId, id);
  return Response.json({ saved: true, opportunityId: id });
}
