const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export default async function handler(request, response) {
  if (request.method === "OPTIONS") {
    response.setHeader("Allow", "POST, OPTIONS");
    return response.status(204).end();
  }

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST, OPTIONS");
    return response.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const body = typeof request.body === "object" && request.body ? request.body : {};
  const phone = String(body.phone || "").trim();
  const email = String(body.email || "").trim();

  if (!phone && !email) {
    return response.status(400).json({
      ok: false,
      error: "A phone or email is required.",
    });
  }

  if (email && !isValidEmail(email)) {
    return response.status(400).json({
      ok: false,
      error: "Email is invalid.",
    });
  }

  const lead = {
    leadStage: "complete",
    fullName: String(body.fullName || "").trim(),
    phone,
    email,
    lotInterest: String(body.lotInterest || ""),
    budget: String(body.budget || ""),
    timeline: String(body.timeline || ""),
    interestType: String(body.interestType || ""),
    notes: String(body.notes || "").trim(),
    receivedAt: new Date().toISOString(),
  };

  console.info("Applewoods lead received", lead);

  return response.status(200).json({
    ok: true,
    provider: {
      status: "skipped",
      reason: "No email provider is configured yet.",
    },
  });
}
