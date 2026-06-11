# Cloudflare Migration + Subdomain Tunnel — Handoff Notes

_Last updated: 2026-06-10. Written to resume in a fresh Claude session._

There are **two separate threads** in flight:
1. **Move `sjsuformulasae.com` DNS to Cloudflare** (the original 3-part request).
2. **Route a subdomain (`util`/`tools`.sjsuformulasae.com) to a friend's site** whose public IP rotates → needs a tunnel.

---

## Key facts (verified this session)

| Thing | Value |
|---|---|
| Domain | `sjsuformulasae.com` |
| Registrar | **Squarespace Domains II LLC** (IANA ID 895, `domains2.squarespace.com`), expires 2033-10-11 |
| Current name servers | `ns1.vercel-dns.com`, `ns2.vercel-dns.com` (verified via `whois`) |
| **Target Cloudflare name servers** | **`devin.ns.cloudflare.com`** + **`nola.ns.cloudflare.com`** |
| Cloudflare zone | Already added, on a **different CF account** (not user's main). User confirmed onboarding is on **Step 2 (replace nameservers)**, so Step 1 (DNS records review/import) is done. **DNSSEC shows OFF** on the Cloudflare side. |
| Hosting / origin | **Vercel** |
| Vercel project | `fsae-website-25` — projectId `prj_xfL2QFLovSe1Yg74WGo4Z5HMgFa5`, orgId `team_IFazqjzGIb3DnN4SgfvHgcHU`, team slug `mukund-kunapareddys-projects` |
| Vercel CLI auth | Logged in as `mkunapareddy-1329` (CLI works — can manage DNS + firewall without a browser) |
| Production URL | `https://sjsuformulasae.com` |

### Current Vercel DNS zone (`npx vercel dns ls sjsuformulasae.com`)
```
CAA   0 issue "pki.goog"
CAA   0 issue "sectigo.com"
CAA   0 issue "letsencrypt.org"
*     ALIAS  cname.vercel-dns-017.com.
@     ALIAS  410d4e41388d6bb4.vercel-dns-017.com
```
Note the **wildcard `*` ALIAS** → all subdomains currently resolve to Vercel. Any explicit subdomain record we add overrides the wildcard.

---

## Access / blockers

- **Cannot log into Squarespace or Cloudflare via browser** — entering passwords and completing CAPTCHAs are off-limits for the agent. The **user must log in**, OR provide a **scoped Cloudflare API token** (Permissions: `Zone:Read` + `DNS:Edit`, scoped to the zone) from the account that holds the zone. Create at `https://dash.cloudflare.com/profile/api-tokens`. Revoke after use.
- **Vercel CLI is authed** → DNS records and Vercel Firewall can be done programmatically, no browser.
- A Squarespace login tab is/was open: `account.squarespace.com/domains/managed` (redirects to login). User had **not** completed login as of end of session.

---

## Thread 1 — Migrate domain to Cloudflare (original request)

Original 3 asks:
1. Replace current name servers with Cloudflare's (`devin` + `nola`) — **user explicitly approved these values.**
2. Ensure **DNSSEC is off**.
3. **Only allow Cloudflare IP addresses at the origin** (Vercel).

### ⚠️ Downtime risk — do this in the right order
The instant Squarespace points to `devin`/`nola`, **Cloudflare becomes authoritative**. If the Cloudflare zone is missing the records that point the site at Vercel, the site goes down. So **before** swapping name servers:
- Confirm the Cloudflare zone has working records for the apex (`@`), `www`, and ideally a wildcard, pointing to Vercel.
- Because the domain is leaving Vercel's name servers, Vercel will expect the domain pointed via **A `76.76.21.21`** (apex) and **CNAME `cname.vercel-dns.com`** (www/subdomains). Make sure the Cloudflare zone reflects that (Cloudflare flattens apex CNAMEs, so an apex CNAME to the Vercel target also works).
- Verifying the CF zone requires the **token or a CF login** (see Access above).

### Steps to resume (Thread 1)
1. **(CF side, needs token/login)** Verify the Cloudflare zone records keep the site reachable on Vercel (apex + www + wildcard). Fix if missing.
2. **(Squarespace, needs user login)** Domains → `sjsuformulasae.com` → Name servers → **remove** `ns1/ns2.vercel-dns.com`, **add** `devin.ns.cloudflare.com` + `nola.ns.cloudflare.com` → Save. (Agent will screenshot + confirm before saving.)
3. **(Squarespace)** Confirm **DNSSEC is OFF** (domain Security/DNSSEC section). CF side already off.
4. **Wait for propagation**, verify: `dig NS sjsuformulasae.com +short` should return the `*.ns.cloudflare.com` pair; site still loads.
5. **(Vercel, goal #3)** Restrict origin to Cloudflare IPs — see note below.

### Goal #3 detail — "only allow Cloudflare IPs at origin" on Vercel
Vercel is not a server with an OS firewall, so this is done via **Vercel Firewall** custom rules (IP allow-list) — **requires Vercel Pro**. Allow Cloudflare's published ranges, deny everything else.
- Cloudflare IP ranges: `https://www.cloudflare.com/ips-v4`, `https://www.cloudflare.com/ips-v6` (or `cloudflare.com/ips`).
- Only meaningful if Cloudflare **proxies** (orange-cloud) the records, so traffic actually arrives from CF IPs.
- **Check whether the Vercel plan supports Firewall IP rules before promising this.** If not on Pro, flag to user.
- CF doc: `https://developers.cloudflare.com/fundamentals/concepts/cloudflare-ip-addresses/#configure-origin-server`

CF doc for the NS change (different-registrar path): `https://developers.cloudflare.com/dns/nameservers/update-nameservers/#your-domain-uses-a-different-registrar`

---

## Thread 2 — Subdomain to friend's site via tunnel

Subdomain name: user said **`util`** first, then **`tools`** — **confirm which** before creating records. Friend's **public IP rotates**, friend says **tunnel only** (no port-forwarding).

### Why a plain CNAME / "only this subdomain on Cloudflare" doesn't work
- A **Cloudflare Tunnel** public hostname must live in a **Cloudflare-managed zone** (it creates a proxied record → `<tunnel-id>.cfargotunnel.com`, which only routes inside Cloudflare).
- Adding just `tools.sjsuformulasae.com` as its **own** Cloudflare zone (subdomain setup) is **Enterprise-only**.
- A CNAME from Vercel DNS straight to `*.cfargotunnel.com`, or to a tunnel hostname in the **friend's separate** CF account, hits **Error 1014 (cross-user CNAME banned)** unless Cloudflare for SaaS is configured.

### Two viable paths (decision pending — ask user)
**Path A — finish the Thread‑1 migration, then Cloudflare Tunnel (cleanest).**
Once the whole domain is on Cloudflare:
- Create a tunnel in the CF account that holds the zone, add public hostname `tools.sjsuformulasae.com`.
- Give the friend the **tunnel token**; he runs `cloudflared tunnel run --token <TOKEN>` on his machine with ingress → his local app.
- Outbound-only, so the rotating IP is a non-issue. Free, auto-SSL. Rest of site keeps serving from Vercel.

**Path B — skip Cloudflare, use a tunnel with a stable hostname.**
- Friend runs **Tailscale Funnel** (free) or **ngrok with a reserved/custom domain** (paid) → gets a fixed hostname.
- Agent adds `CNAME tools.sjsuformulasae.com → <that-hostname>` in **Vercel DNS** via CLI right now. No Squarespace, no CF migration.
- Command shape: `npx vercel dns add sjsuformulasae.com tools CNAME <target>` (run from repo; CLI already authed).
- Friend's host must accept `tools.sjsuformulasae.com` as a custom domain + issue its SSL cert.

---

## Quick verification commands
```bash
whois sjsuformulasae.com | grep -iE "registrar:|name server:"   # registrar + current NS
dig NS sjsuformulasae.com +short                                 # who's authoritative now
npx vercel dns ls sjsuformulasae.com                             # Vercel zone records
npx vercel domains ls                                            # domain status in Vercel
```

## Open decisions to confirm with user
1. Subdomain name: **`util`** or **`tools`**?
2. Tunnel approach: **Path A** (finish CF migration) or **Path B** (Tailscale/ngrok + Vercel CNAME)?
3. For goal #3: confirm Vercel plan supports Firewall IP rules (needs Pro).
4. Provide a scoped **Cloudflare API token** (preferred) or do the CF/Squarespace logins in-browser.
