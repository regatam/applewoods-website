# Apple Woods Lead Form — Setup

The contact form posts to `/api/lead` (a Vercel serverless function). That
function notifies the team and auto-replies to the lead via **Resend**. This is
the same free pattern the Flex Space site uses — a tiny serverless function plus
Resend's free tier (~3,000 emails/month), no paid form widget.

## State right now

- Code is wired and deploys fine.
- Until the three env vars below are set, the function runs in **"skipped"
  mode**: the form still submits successfully for the visitor, the lead is
  written to the Vercel function logs, but **no email is sent**.
- `resend` is installed; `api/lead.js` handles validation, the team email, and
  the optional auto-reply.

## Turn email on (3 steps)

1. **Resend account + domain.** Create a free account at resend.com, add a
   sending domain, and complete the DNS verification it asks for. Then create an
   API key.
   - The Flex Space key won't work here — it's verified for `realsweetfutures.com`.
     Apple Woods needs its own verified sending domain (or a subdomain).

2. **Set the env vars** (`RESEND_API_KEY`, `FROM_EMAIL`, `CLIENT_EMAIL` — see
   `.env.example`). `FROM_EMAIL` must be on the verified domain. `CLIENT_EMAIL`
   is where leads land.

3. **Add them to Vercel** (Production + Preview). Use `printf`, not `echo`, so no
   trailing newline sneaks into the value:
   ```bash
   printf "re_xxx" | vercel env add RESEND_API_KEY production
   printf "leads@applewoods.com" | vercel env add FROM_EMAIL production
   printf "sales@applewoods.com" | vercel env add CLIENT_EMAIL production
   ```
   Redeploy after adding. For local testing, put the same three in `.env.local`
   (gitignored) and run `vercel dev`.

## Open items (need your input)

- **Spanish auto-reply.** The auto-reply is English only. The site is bilingual,
  so an ES lead currently gets an English reply. To fix: capture the active
  `lang` in the form payload and branch the auto-reply copy. I left this out
  because the Spanish wording should be yours, not invented. Send me the Spanish
  version and I'll wire it by language.
- **Auto-reply copy approval.** The English auto-reply body lives in
  `api/lead.js` (`autoReply()`). It's a sensible default but it's client-facing —
  review/tweak before this goes live.
- **Spam protection.** None yet (same as Flex Space). If spam shows up, a hidden
  honeypot field or Cloudflare Turnstile (free) is the easy add.
