import { Resend } from "resend";

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

// Plain-text summary of the lead for the team notification email.
function leadSummary(lead) {
  return [
    `Name: ${lead.fullName || "—"}`,
    `Phone: ${lead.phone || "—"}`,
    `Email: ${lead.email || "—"}`,
    "",
    `Lot interest: ${lead.lotInterest || "—"}`,
    `Budget: ${lead.budget || "—"}`,
    `Timeline: ${lead.timeline || "—"}`,
    `Interest: ${lead.interestType || "—"}`,
    "",
    "Notes:",
    lead.notes || "—",
    "",
    `Received: ${lead.receivedAt}`,
  ].join("\n");
}

// Auto-reply sent to the lead (English only for now — a Spanish version needs
// the client's wording before it ships; see docs/applewoods-lead-form-setup.md).
function autoReply(lead) {
  return [
    `Hi${lead.fullName ? ` ${lead.fullName}` : ""},`,
    "",
    "Thanks for reaching out about Apple Woods. We got your message and someone from our team will follow up with you shortly.",
    "",
    "If it's easier, feel free to call or message us directly. We're happy to walk you through homesites, pricing, or anything else about the community.",
    "",
    "Talk soon,",
    "The Apple Woods Team",
  ].join("\n");
}

// Notify the team and (optionally) auto-reply to the lead via Resend. Mirrors
// the Flex Space setup: a tiny serverless function + Resend's free tier, no
// third-party form service. Until RESEND_API_KEY / FROM_EMAIL / CLIENT_EMAIL
// are set, this is a no-op ("skipped") so the form still succeeds for the
// visitor and the lead is captured in the function logs.
async function sendResendEmails(lead) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FROM_EMAIL;
  const clientEmail = process.env.CLIENT_EMAIL;

  if (!apiKey || !from || !clientEmail) {
    return {
      status: "skipped",
      reason: "Missing RESEND_API_KEY, FROM_EMAIL, or CLIENT_EMAIL",
    };
  }

  const resend = new Resend(apiKey);

  const tasks = [
    resend.emails.send({
      from,
      to: clientEmail,
      ...(lead.email ? { replyTo: lead.email } : {}),
      subject: `New Apple Woods lead${lead.fullName ? `: ${lead.fullName}` : ""}`,
      text: leadSummary(lead),
    }),
  ];

  // Only auto-reply when the lead left an email address.
  if (lead.email) {
    tasks.push(
      resend.emails.send({
        from,
        to: lead.email,
        subject: "Thanks for reaching out to Apple Woods",
        text: autoReply(lead),
      })
    );
  }

  await Promise.all(tasks);
  return { status: "sent" };
}

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

  try {
    const provider = await sendResendEmails(lead);
    return response.status(200).json({ ok: true, provider });
  } catch (error) {
    console.error("Applewoods lead email failed", error);
    return response.status(502).json({ ok: false, error: "Lead notification failed" });
  }
}
