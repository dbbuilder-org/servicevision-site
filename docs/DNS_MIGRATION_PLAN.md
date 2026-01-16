# ServiceVision DNS Migration Plan

## Overview
Migrate DNS from Hostinger to Name.com while preserving all existing records and updating for Vercel deployment.

## Current DNS Records (from Hostinger)

### MX Record (Email)
| Type | Name | Priority | Content | TTL |
|------|------|----------|---------|-----|
| MX | @ | 10 | servicevision-net.mail.protection.outlook.com | 14400 |

### TXT Records (SPF, DKIM, Domain Verification)
| Type | Name | Content | TTL |
|------|------|---------|-----|
| TXT | @ | `v=spf1 include:spf.protection.outlook.com -all` | 14400 |
| TXT | @ | `MS=ms52136728` | 14400 |
| TXT | servicevision.net | `MS=ms52136728` | 14400 |
| TXT | _dmarc | `v=DMARC1; p=none;` | 14400 |
| TXT | _twilio | `twilio-domain-verification=cc38a8c40d7e4d1e35a3800ea843ba1a` | 14400 |

### CNAME Records (Microsoft 365, SendGrid, Vercel Apps)
| Type | Name | Content | TTL |
|------|------|---------|-----|
| CNAME | www | **UPDATE TO: cname.vercel-dns.com** | 300 |
| CNAME | autodiscover | autodiscover.outlook.com | 300 |
| CNAME | selector1._domainkey | selector1-servicevision-net._domainkey.servicevisionai.onmicrosoft.com | 300 |
| CNAME | selector2._domainkey | selector2-servicevision-net._domainkey.servicevisionai.onmicrosoft.com | 300 |
| CNAME | lyncdiscover | webdir.online.lync.com | 300 |
| CNAME | sip | sipdir.online.lync.com | 300 |
| CNAME | enterpriseenrollment | enterpriseenrollment-s.manage.microsoft.com | 300 |
| CNAME | enterpriseregistration | enterpriseregistration.windows.net | 300 |
| CNAME | s1._domainkey | s1.domainkey.u56820830.wl081.sendgrid.net | 14400 |
| CNAME | s2._domainkey | s2.domainkey.u56820830.wl081.sendgrid.net | 14400 |
| CNAME | em3093 | u56820830.wl081.sendgrid.net | 14400 |
| CNAME | mfa | mfa-relay-frontend-4irmqacod-teds-projects-d50f6fce.vercel.app | 14400 |
| CNAME | mfa-relay | mfa-relay-frontend-4irmqacod-teds-projects-d50f6fce.vercel.app | 14400 |
| CNAME | mfa-api | mfa-relay-api-production.up.railway.app | 14400 |

### A/ALIAS Record (Root Domain)
| Type | Name | Content | TTL |
|------|------|---------|-----|
| A | @ | **UPDATE TO: 76.76.21.21** (Vercel) | 300 |

### CAA Records (Certificate Authority Authorization)
| Type | Name | Content | TTL |
|------|------|---------|-----|
| CAA | @ | 0 issue "letsencrypt.org" | 14400 |
| CAA | @ | 0 issue "comodoca.com" | 14400 |
| CAA | @ | 0 issue "digicert.com" | 14400 |
| CAA | @ | 0 issue "globalsign.com" | 14400 |
| CAA | @ | 0 issuewild "comodoca.com" | 14400 |
| CAA | @ | 0 issuewild "digicert.com" | 14400 |
| CAA | @ | 0 issuewild "globalsign.com" | 14400 |
| CAA | @ | 0 issuewild "letsencrypt.org" | 14400 |

---

## Migration Steps

### Phase 1: Pre-Migration (Before DNS Switch)
1. **Deploy site to Vercel** and note the project URL
2. **Add custom domain in Vercel dashboard**:
   - Go to Project Settings → Domains
   - Add `servicevision.net` and `www.servicevision.net`
   - Vercel will show required DNS records

3. **Document Vercel's required records** (typically):
   - A record: `@` → `76.76.21.21`
   - CNAME: `www` → `cname.vercel-dns.com`

### Phase 2: Create Records in Name.com
Using Name.com API (credentials in CLAUDE.md):
- **API Base:** https://api.name.com/v4
- **Username:** tedtherriault
- **API Token:** 4514ee43f63725109972286440d4ba56d88459dc

#### API Commands to Create Records

```bash
# Set credentials
export NAME_USER="tedtherriault"
export NAME_TOKEN="4514ee43f63725109972286440d4ba56d88459dc"
export DOMAIN="servicevision.net"

# MX Record
curl -u "$NAME_USER:$NAME_TOKEN" \
  -X POST "https://api.name.com/v4/domains/$DOMAIN/records" \
  -H "Content-Type: application/json" \
  -d '{"host":"","type":"MX","answer":"servicevision-net.mail.protection.outlook.com","ttl":14400,"priority":10}'

# A Record (root domain to Vercel)
curl -u "$NAME_USER:$NAME_TOKEN" \
  -X POST "https://api.name.com/v4/domains/$DOMAIN/records" \
  -H "Content-Type: application/json" \
  -d '{"host":"","type":"A","answer":"76.76.21.21","ttl":300}'

# CNAME - www (Vercel)
curl -u "$NAME_USER:$NAME_TOKEN" \
  -X POST "https://api.name.com/v4/domains/$DOMAIN/records" \
  -H "Content-Type: application/json" \
  -d '{"host":"www","type":"CNAME","answer":"cname.vercel-dns.com","ttl":300}'

# CNAME - autodiscover (Microsoft 365)
curl -u "$NAME_USER:$NAME_TOKEN" \
  -X POST "https://api.name.com/v4/domains/$DOMAIN/records" \
  -H "Content-Type: application/json" \
  -d '{"host":"autodiscover","type":"CNAME","answer":"autodiscover.outlook.com","ttl":300}'

# CNAME - selector1._domainkey (Microsoft 365 DKIM)
curl -u "$NAME_USER:$NAME_TOKEN" \
  -X POST "https://api.name.com/v4/domains/$DOMAIN/records" \
  -H "Content-Type: application/json" \
  -d '{"host":"selector1._domainkey","type":"CNAME","answer":"selector1-servicevision-net._domainkey.servicevisionai.onmicrosoft.com","ttl":300}'

# CNAME - selector2._domainkey (Microsoft 365 DKIM)
curl -u "$NAME_USER:$NAME_TOKEN" \
  -X POST "https://api.name.com/v4/domains/$DOMAIN/records" \
  -H "Content-Type: application/json" \
  -d '{"host":"selector2._domainkey","type":"CNAME","answer":"selector2-servicevision-net._domainkey.servicevisionai.onmicrosoft.com","ttl":300}'

# CNAME - lyncdiscover (Skype/Teams)
curl -u "$NAME_USER:$NAME_TOKEN" \
  -X POST "https://api.name.com/v4/domains/$DOMAIN/records" \
  -H "Content-Type: application/json" \
  -d '{"host":"lyncdiscover","type":"CNAME","answer":"webdir.online.lync.com","ttl":300}'

# CNAME - sip (Skype/Teams)
curl -u "$NAME_USER:$NAME_TOKEN" \
  -X POST "https://api.name.com/v4/domains/$DOMAIN/records" \
  -H "Content-Type: application/json" \
  -d '{"host":"sip","type":"CNAME","answer":"sipdir.online.lync.com","ttl":300}'

# CNAME - enterpriseenrollment (Intune)
curl -u "$NAME_USER:$NAME_TOKEN" \
  -X POST "https://api.name.com/v4/domains/$DOMAIN/records" \
  -H "Content-Type: application/json" \
  -d '{"host":"enterpriseenrollment","type":"CNAME","answer":"enterpriseenrollment-s.manage.microsoft.com","ttl":300}'

# CNAME - enterpriseregistration (Azure AD)
curl -u "$NAME_USER:$NAME_TOKEN" \
  -X POST "https://api.name.com/v4/domains/$DOMAIN/records" \
  -H "Content-Type: application/json" \
  -d '{"host":"enterpriseregistration","type":"CNAME","answer":"enterpriseregistration.windows.net","ttl":300}'

# CNAME - s1._domainkey (SendGrid DKIM)
curl -u "$NAME_USER:$NAME_TOKEN" \
  -X POST "https://api.name.com/v4/domains/$DOMAIN/records" \
  -H "Content-Type: application/json" \
  -d '{"host":"s1._domainkey","type":"CNAME","answer":"s1.domainkey.u56820830.wl081.sendgrid.net","ttl":14400}'

# CNAME - s2._domainkey (SendGrid DKIM)
curl -u "$NAME_USER:$NAME_TOKEN" \
  -X POST "https://api.name.com/v4/domains/$DOMAIN/records" \
  -H "Content-Type: application/json" \
  -d '{"host":"s2._domainkey","type":"CNAME","answer":"s2.domainkey.u56820830.wl081.sendgrid.net","ttl":14400}'

# CNAME - em3093 (SendGrid)
curl -u "$NAME_USER:$NAME_TOKEN" \
  -X POST "https://api.name.com/v4/domains/$DOMAIN/records" \
  -H "Content-Type: application/json" \
  -d '{"host":"em3093","type":"CNAME","answer":"u56820830.wl081.sendgrid.net","ttl":14400}'

# CNAME - mfa (Vercel app)
curl -u "$NAME_USER:$NAME_TOKEN" \
  -X POST "https://api.name.com/v4/domains/$DOMAIN/records" \
  -H "Content-Type: application/json" \
  -d '{"host":"mfa","type":"CNAME","answer":"mfa-relay-frontend-4irmqacod-teds-projects-d50f6fce.vercel.app","ttl":14400}'

# CNAME - mfa-relay (Vercel app)
curl -u "$NAME_USER:$NAME_TOKEN" \
  -X POST "https://api.name.com/v4/domains/$DOMAIN/records" \
  -H "Content-Type: application/json" \
  -d '{"host":"mfa-relay","type":"CNAME","answer":"mfa-relay-frontend-4irmqacod-teds-projects-d50f6fce.vercel.app","ttl":14400}'

# CNAME - mfa-api (Railway app)
curl -u "$NAME_USER:$NAME_TOKEN" \
  -X POST "https://api.name.com/v4/domains/$DOMAIN/records" \
  -H "Content-Type: application/json" \
  -d '{"host":"mfa-api","type":"CNAME","answer":"mfa-relay-api-production.up.railway.app","ttl":14400}'

# TXT - SPF
curl -u "$NAME_USER:$NAME_TOKEN" \
  -X POST "https://api.name.com/v4/domains/$DOMAIN/records" \
  -H "Content-Type: application/json" \
  -d '{"host":"","type":"TXT","answer":"v=spf1 include:spf.protection.outlook.com -all","ttl":14400}'

# TXT - Microsoft domain verification
curl -u "$NAME_USER:$NAME_TOKEN" \
  -X POST "https://api.name.com/v4/domains/$DOMAIN/records" \
  -H "Content-Type: application/json" \
  -d '{"host":"","type":"TXT","answer":"MS=ms52136728","ttl":14400}'

# TXT - DMARC
curl -u "$NAME_USER:$NAME_TOKEN" \
  -X POST "https://api.name.com/v4/domains/$DOMAIN/records" \
  -H "Content-Type: application/json" \
  -d '{"host":"_dmarc","type":"TXT","answer":"v=DMARC1; p=none;","ttl":14400}'

# TXT - Twilio verification
curl -u "$NAME_USER:$NAME_TOKEN" \
  -X POST "https://api.name.com/v4/domains/$DOMAIN/records" \
  -H "Content-Type: application/json" \
  -d '{"host":"_twilio","type":"TXT","answer":"twilio-domain-verification=cc38a8c40d7e4d1e35a3800ea843ba1a","ttl":14400}'

# CAA Records
curl -u "$NAME_USER:$NAME_TOKEN" \
  -X POST "https://api.name.com/v4/domains/$DOMAIN/records" \
  -H "Content-Type: application/json" \
  -d '{"host":"","type":"CAA","answer":"0 issue \"letsencrypt.org\"","ttl":14400}'

curl -u "$NAME_USER:$NAME_TOKEN" \
  -X POST "https://api.name.com/v4/domains/$DOMAIN/records" \
  -H "Content-Type: application/json" \
  -d '{"host":"","type":"CAA","answer":"0 issue \"comodoca.com\"","ttl":14400}'

curl -u "$NAME_USER:$NAME_TOKEN" \
  -X POST "https://api.name.com/v4/domains/$DOMAIN/records" \
  -H "Content-Type: application/json" \
  -d '{"host":"","type":"CAA","answer":"0 issue \"digicert.com\"","ttl":14400}'

curl -u "$NAME_USER:$NAME_TOKEN" \
  -X POST "https://api.name.com/v4/domains/$DOMAIN/records" \
  -H "Content-Type: application/json" \
  -d '{"host":"","type":"CAA","answer":"0 issue \"globalsign.com\"","ttl":14400}'

curl -u "$NAME_USER:$NAME_TOKEN" \
  -X POST "https://api.name.com/v4/domains/$DOMAIN/records" \
  -H "Content-Type: application/json" \
  -d '{"host":"","type":"CAA","answer":"0 issuewild \"letsencrypt.org\"","ttl":14400}'

curl -u "$NAME_USER:$NAME_TOKEN" \
  -X POST "https://api.name.com/v4/domains/$DOMAIN/records" \
  -H "Content-Type: application/json" \
  -d '{"host":"","type":"CAA","answer":"0 issuewild \"comodoca.com\"","ttl":14400}'

curl -u "$NAME_USER:$NAME_TOKEN" \
  -X POST "https://api.name.com/v4/domains/$DOMAIN/records" \
  -H "Content-Type: application/json" \
  -d '{"host":"","type":"CAA","answer":"0 issuewild \"digicert.com\"","ttl":14400}'

curl -u "$NAME_USER:$NAME_TOKEN" \
  -X POST "https://api.name.com/v4/domains/$DOMAIN/records" \
  -H "Content-Type: application/json" \
  -d '{"host":"","type":"CAA","answer":"0 issuewild \"globalsign.com\"","ttl":14400}'
```

### Phase 3: Verify Records in Name.com
```bash
# List all records to verify
curl -u "$NAME_USER:$NAME_TOKEN" \
  "https://api.name.com/v4/domains/$DOMAIN/records"
```

### Phase 4: Switch Nameservers
1. **In Name.com domain settings**, ensure nameservers are set to Name.com's defaults:
   - ns1.name.com
   - ns2.name.com
   - ns3.name.com
   - ns4.name.com

2. **Wait for propagation** (up to 48 hours, usually faster)

### Phase 5: Verify Everything Works
1. Check website: https://www.servicevision.net
2. Check email: Send test to/from Microsoft 365
3. Check MFA apps: https://mfa.servicevision.net
4. Verify SSL certificate is active

---

## Rollback Plan
If issues occur:
1. Repoint nameservers back to Hostinger in Name.com domain settings
2. Wait for propagation

## Notes
- Keep Hostinger active during migration for rollback capability
- Monitor email delivery closely after switch
- SSL certificate from Vercel will auto-provision after DNS points correctly
