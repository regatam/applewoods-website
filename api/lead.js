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

// Real-time lead alert to Slack via an incoming webhook. No-op until
// SLACK_WEBHOOK_URL is set. SLACK_LEAD_MENTION (e.g. "<@U123>") is prepended so
// the right person gets pinged. Bridges notifications until Resend email is live.
async function notifySlack(lead) {
  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) return { status: "skipped", reason: "No SLACK_WEBHOOK_URL" };

  const mention = process.env.SLACK_LEAD_MENTION;
  const detail = (label, value) => `*${label}:* ${value || "—"}`;
  const lines = [
    `${mention ? mention + " " : ""}:house_with_garden: *New Apple Woods lead*`,
    detail("Name", lead.fullName),
    detail("Phone", lead.phone),
    detail("Email", lead.email),
    detail("Lot interest", lead.lotInterest),
    detail("Budget", lead.budget),
    detail("Timeline", lead.timeline),
    detail("Interest", lead.interestType),
    lead.notes ? detail("Notes", lead.notes) : null,
  ].filter(Boolean);

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: lines.join("\n") }),
  });
  if (!res.ok) throw new Error(`Slack webhook responded ${res.status}`);
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

  // Fire all notification channels; never fail the visitor because a
  // notification did (the lead is already captured in the log above).
  const [emailResult, slackResult] = await Promise.allSettled([
    sendResendEmails(lead),
    notifySlack(lead),
  ]);
  if (emailResult.status === "rejected") console.error("Applewoods lead email failed", emailResult.reason);
  if (slackResult.status === "rejected") console.error("Applewoods lead Slack notify failed", slackResult.reason);

  return response.status(200).json({
    ok: true,
    email: emailResult.status === "fulfilled" ? emailResult.value : { status: "error" },
    slack: slackResult.status === "fulfilled" ? slackResult.value : { status: "error" },
  });
}
