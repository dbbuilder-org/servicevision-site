# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

No test suite configured.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** — configured inline in `app/globals.css` (no `tailwind.config.*` file)
- **Anthropic SDK** — Claude 3.5 Haiku for AI chat (`/api/ai-chat`)
- **Resend** — transactional email for contact form (`/api/contact`)
- **React Email** — email templates in `/emails/`
- **MDX** — blog posts in `/content/blog/`
- **Vercel Analytics + GA4** — dual analytics

## Architecture

### Routing

All pages use Next.js App Router under `app/`. Most pages are server components; interactive pages (home, AI) are `"use client"`. API routes live in `app/api/`.

| Route | Notes |
|-------|-------|
| `/` | Home — terminal-style landing, client component |
| `/ai` | AI capabilities showcase with embedded chat |
| `/api/ai-chat` | Streams Claude responses; uses conversation history |
| `/api/contact` | Validates reCAPTCHA v2, sends via Resend |
| `/blog/[slug]` | MDX blog posts, frontmatter via gray-matter |

### Design System

`lib/design-system.ts` exports a centralized token object (colors, typography, component styles). Use these exported constants rather than hardcoding Tailwind classes for branded elements.

**Theme:** Terminal/dark aesthetic — dark background (`#0a0a0a`), green phosphor accents (`#10b981`), amber highlights (`#f59e0b`), purple AI accents (`#a855f7`). Custom animations (blink, glitch, flicker) are defined in `globals.css`.

### Era System

The site has an interactive "era" feature. Key components:
- `EraToggle.tsx` — controls which era is active
- `EraInfoModal.tsx` — modal with era details
- `EraBanner.tsx` — banner display
- `EraFooter.tsx` — era-specific footer section

Era state appears to be local to these components; check `EraToggle` for the source of truth.

### AI Chat (`/api/ai-chat`)

- Model: `claude-3-5-haiku-20241022`, max 500 tokens
- System prompt positions Claude as a Solutions Architect for ServiceVision
- Accepts `messages` array for conversation history

### Contact Form (`/api/contact`)

- reCAPTCHA v2 checkbox verification (score threshold ≥ 0.5)
- Email sent via Resend to `CONTACT_EMAIL` env var
- Confirmation email sent to submitter using React Email template

## Environment Variables

```
ANTHROPIC_API_KEY          Claude API
RESEND_API_KEY             Transactional email
CONTACT_EMAIL              Recipient for contact form submissions
NEXT_PUBLIC_RECAPTCHA_SITE_KEY
RECAPTCHA_SECRET_KEY
NEXT_PUBLIC_GA_MEASUREMENT_ID
PEXELS_API_KEY             Image sourcing (Pexels API)
```

## Deployment

- Vercel project: `servicevision-site`
- Domain: `https://servicevisionai.com` (Cloudflare DNS → Vercel CNAME)
- GitHub repo: `dbbuilder-org/servicevision-site`
