# Apple Woods lead delivery and spam protection

The contact form posts to the Vercel Function at `/api/lead`. A valid submission
can notify Slack and send one team email to multiple inboxes through Resend. A
failure in either channel does not block the other.

Visitor auto-replies are disabled by default. Do not enable them until the
English and Spanish messages are approved.

## Recommended order

1. Configure and test Cloudflare Turnstile.
2. Deploy the protected form to a Vercel Preview.
3. Configure Resend with an internal test recipient.
4. Verify Slack and email from one legitimate Preview submission.
5. Add the two client inboxes in Production.
6. Deploy Production.
7. Observe Vercel Firewall traffic before enforcing a rate limit.

## 1. Create the Cloudflare Turnstile widget

Turnstile is free and does not require moving the Apple Woods DNS or website to
Cloudflare.

1. Go to <https://dash.cloudflare.com/sign-up>, create an account, and verify
   the account email.
2. Open **Turnstile** in the Cloudflare dashboard.
3. Select **Add widget**.
4. Use the widget name `Apple Woods contact form`.
5. Add the production hostnames that currently serve the form:
   - `applewoods.us`
   - `www.applewoods.us`
   - Add the stable `vercel.app` production hostname if visitors can still use it.
6. Choose **Managed** mode. The website uses `interaction-only` appearance, so
   most real visitors will not see a challenge.
7. Create the widget and copy both values:
   - **Site key:** safe to expose to the browser.
   - **Secret key:** server-only; never paste it into source code or a `VITE_`
     variable.

Production must use the real keys. Preview/local automated testing can use
Cloudflare's official always-pass keys:

```text
VITE_TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
```

Never assign those test keys to Vercel Production.

## 2. Create and verify the Resend account

1. Go to <https://resend.com/signup> and create the Apple Woods Resend account.
2. Verify the account email and enable MFA if the account settings offer it.
3. Open **Domains** and select **Add domain**.
4. Use a sending subdomain such as `send.applewoods.us`. A subdomain isolates
   transactional-email reputation from ordinary Apple Woods email.
5. In the DNS provider for `applewoods.us`, add every record Resend displays.
   These normally include DKIM and SPF records. Copy the names and values
   exactly; do not invent or reuse records from another project.
6. Return to Resend and wait until the domain status is **Verified**.
7. Open **API Keys**, create a key named `Apple Woods website production`, and
   restrict it to sending access/the verified domain when those options are
   available.
8. Copy the key once and place it directly into Vercel. Never send it through
   Slack, email, or a committed file.

Suggested sender:

```text
Apple Woods Leads <leads@send.applewoods.us>
```

The sender does not need a mailbox unless the team wants to receive mail at
that address. Replies to each notification use the lead's address when one was
provided.

## 3. Add the Vercel environment variables

Open the linked Apple Woods project in Vercel, then go to **Settings →
Environment Variables**.

### Production

```text
RESEND_API_KEY=re_...
FROM_EMAIL=Apple Woods Leads <leads@send.applewoods.us>
CLIENT_EMAILS=first@example.com,second@example.com
SEND_LEAD_AUTOREPLY=false
VITE_TURNSTILE_SITE_KEY=<real Cloudflare site key>
TURNSTILE_SECRET_KEY=<real Cloudflare secret key>
```

Mark `RESEND_API_KEY` and `TURNSTILE_SECRET_KEY` as Sensitive. The two recipient
addresses belong in one comma-separated `CLIENT_EMAILS` value.

For Preview, use the official Turnstile test keys above and send email only to
an internal tester. Do not put the two client inboxes into Preview until the
flow has passed testing.

Environment changes only apply to new deployments. Redeploy after saving them.

## 4. Verification checklist

On a Vercel Preview deployment:

1. Submit one English lead using a real internal email address.
2. Confirm one Slack notification arrives.
3. Confirm one Resend notification arrives at the internal test inbox.
4. Confirm no visitor auto-reply arrives.
5. Confirm the email's **Reply** action targets the lead's email address.
6. Fill the hidden `companyWebsite` field through browser developer tools and
   submit; no Slack or email notification should arrive.
7. Submit with a missing/invalid Turnstile token; the endpoint must reject it
   and send no notification.
8. Repeat once in Spanish and on a mobile viewport.

After Production deployment, send one clearly labeled test lead and have both
client recipients confirm delivery. Check spam folders and mark the message as
not spam if necessary.

## 5. Vercel Firewall rollout

Protect `POST /api/lead` with a rate-limit rule. Start with **Log**, not Block:

- Path equals `/api/lead`
- Method equals `POST`
- Initial observation threshold: 30 requests per 10 minutes per IP
- Initial action: Log

Observe real traffic, test the rule against Preview, and only then change the
production action to return `429`. A reasonable final starting limit is 10
submissions per 10 minutes per IP, adjusted if legitimate shared networks are
affected.

Firewall publication is a production setting and requires explicit review in
the Vercel dashboard before activation.

## Current safeguards

- Server-side Turnstile verification with a five-second timeout.
- Production fails closed if `TURNSTILE_SECRET_KEY` is missing.
- Hidden honeypot submissions return success but trigger no notifications.
- JSON-only requests and a 16 KB body limit.
- Field length and allowed-value validation.
- Multiple team recipients through `CLIENT_EMAILS`.
- Visitor auto-replies remain off unless `SEND_LEAD_AUTOREPLY=true`.
- Accepted requests log metadata, not the lead's full message or contact data.

Turnstile tokens are single-use and expire after five minutes. The browser
widget alone is not protection; every token is verified by `/api/lead` before
Slack or Resend runs.
