# SEO & Marketing Admin Guide

This guide explains how to use the **SEO & Marketing** admin panel in this project.

## 1) Open the panel

1. Login to Admin.
2. Go to **Settings** in the sidebar.
3. Click **SEO & Marketing**.

URL: `/admin/settings/seo-marketing`

---

## 2) What this panel controls

The panel saves marketing configuration to database (`SiteSetting` key: `marketing_config`), so you can change tracking settings without redeploying.

You can manage:

- Global marketing on/off
- Google:
  - GTAG ID (`AW-...`)
  - GA4 ID (`G-...`)
  - Lead conversion label
  - Purchase conversion label
- Meta Pixel ID (Facebook/Instagram)
- TikTok Pixel ID
- Zalo Pixel ID
- Zalo script URL (optional)

---

## 3) How to configure each platform

### A. Global switch

- Enable **"Enable marketing integrations globally"** first.
- If global is off, marketing scripts do not run even if platform toggles are on.

### B. Google Ads / GA4

1. Enable **Google** section.
2. Fill:
   - **GTAG ID**: from Google Ads (example: `AW-123456789`)
   - **GA4 ID**: optional (example: `G-XXXXXXXXXX`)
   - **Lead conversion label**: optional but recommended
   - **Purchase conversion label**: optional but recommended

How labels are used:

- If label exists:
  - `trackLead()` sends `conversion` with `send_to=AW-.../LABEL`
  - `trackPurchase()` sends `conversion` with `send_to=AW-.../LABEL`
- If label is empty:
  - fallback events are used (`generate_lead`, `purchase`)

### C. Meta Pixel (Facebook/Instagram Ads)

1. Enable **Meta**.
2. Enter **Pixel ID** from Meta Events Manager.

### D. TikTok Pixel

1. Enable **TikTok**.
2. Enter **Pixel ID** from TikTok Ads Manager.

### E. Zalo

1. Enable **Zalo**.
2. Enter **Pixel ID**.
3. Optional: paste **Zalo script URL** if provided by Zalo Ads dashboard.

---

## 4) Save and apply

1. Click **Save changes**.
2. After successful save, app triggers `vuleits-marketing-config-updated` and reloads runtime config.
3. Refresh browser once after major changes to ensure all scripts reinitialize cleanly.

---

## 5) Consent behavior (important)

Marketing scripts are still **consent-gated**:

- If visitor does not accept marketing consent, scripts do not load.
- Footer has **Manage cookies** to reopen consent popup.

So to test scripts:

1. Save settings in admin.
2. Open public site.
3. Accept marketing consent.
4. Verify events in platform dashboards (or browser network tools).

---

## 6) Testing checklist

Use this quick checklist after setup:

- [ ] Global marketing enabled
- [ ] Platform enabled (Google/Meta/TikTok/Zalo)
- [ ] IDs pasted correctly (no extra spaces)
- [ ] Visitor accepted marketing consent
- [ ] Contact form success triggers lead event
- [ ] Platform dashboard receives PageView/Lead events

---

## 7) Permissions

Current panel access uses same permission family as UI text:

- Read requires: `uiTexts.read`
- Save requires: `uiTexts.update`

If a user cannot open/save this panel, check role permissions in Admin.

---

## 8) Troubleshooting

### Scripts not loading

- Check global toggle and platform toggle.
- Check consent accepted.
- Confirm IDs are not empty.

### Google conversion not showing

- Verify GTAG ID is `AW-...`.
- Verify conversion label exactly matches Google Ads action label.
- Wait for processing delay in Google Ads reports.

### Meta/TikTok no events

- Re-check Pixel ID.
- Use Meta Pixel Helper / TikTok diagnostics.
- Confirm browser extensions are not blocking tracking.

### Zalo not firing

- Ensure both Pixel ID and (if required) script URL are valid from Zalo Ads account.

---

## 9) Where data is stored

- Backend admin API: `/api/admin/marketing-config`
- Public runtime API: `/api/marketing-config`
- DB key: `SiteSetting.key = "marketing_config"`

---

## 10) Developer notes

Main related files:

- `frontend/components/admin/SeoMarketingAdminPanel.tsx`
- `frontend/components/marketing/MarketingManager.tsx`
- `frontend/components/marketing/MarketingScripts.tsx`
- `frontend/lib/marketing/config.ts`
- `frontend/lib/marketing/tracker.ts`
- `backend/app/api/admin/marketing-config/route.ts`
- `backend/app/api/marketing-config/route.ts`
- `backend/src/lib/marketingConfig.ts`

