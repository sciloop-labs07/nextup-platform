import { getOpportunity, updateOpportunity } from "@/lib/store";

function authorized(request: Request) { return !process.env.ADMIN_REVIEW_KEY || request.headers.get("x-admin-key") === process.env.ADMIN_REVIEW_KEY; }

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!authorized(request)) return Response.json({ error: "Admin authorization required" }, { status: 401 });
  const { id } = await params;
  if (!(await getOpportunity(id))) return Response.json({ error: "Opportunity not found" }, { status: 404 });
  return Response.json({ opportunity: await updateOpportunity(id, { status: "archived", verificationStatus: "expired" }) });
}
