# ServiceVision Mobile App - Architecture Plan

## Overview

A React Native mobile application that enables clients to request, scope, quote, commit, and receive project management updates through a nostalgic, era-themed interface that mirrors the ServiceVision website design philosophy.

**Scope:** Everything except delivery and payment processing (handled externally)

## Design Philosophy

Each screen in the app corresponds to a different computing era, creating a memorable journey through technology history while reinforcing ServiceVision's core message: "AI amplifies expertise. It doesn't replace it."

The nostalgic themes serve as both a unique brand differentiator and a subtle demonstration of our team's deep understanding of technology evolution over 20+ years.

## Screen Architecture

### 1. Request Screen (Terminal Era - 1980s)

**Theme:** Green phosphor terminal, command-line aesthetic

**Purpose:** Initial project request intake

**Features:**
- CLI-style text input for describing project needs
- `> _` blinking cursor prompt
- Typewriter effect for system responses
- Command suggestions (tab completion style)
- ASCII art confirmation messages

**User Flow:**
```
> servicevision --new-project
> Enter project type: [saas/enterprise/startup]
> Describe your project: _
> Project submitted. Reference: SV-2026-0142
```

---

### 2. Scope Screen (Windows 95 Era)

**Theme:** Classic Win95 wizard dialog

**Purpose:** Detailed requirements gathering

**Features:**
- Multi-step wizard with progress bar
- Checkboxes for feature selection
- Radio buttons for priorities
- "Help" button with tooltips
- Classic beveled buttons (Back, Next, Cancel)
- Sidebar showing completed steps

**Wizard Steps:**
1. Project Overview
2. Technical Requirements
3. Compliance Needs (SOC 2, HIPAA, etc.)
4. Timeline Preferences
5. Team Access Requirements
6. Review & Submit

---

### 3. Quote Screen (Dot-Com Era - 2000s)

**Theme:** MySpace/Early Facebook profile aesthetic

**Purpose:** Proposal presentation and acceptance

**Features:**
- "Profile" view of the proposal
- Cost breakdown in table format
- Timeline visualization
- Team member "friends" assigned to project
- "Accept" / "Request Changes" / "Decline" buttons
- Guestbook-style comments for questions

**Layout:**
- Left sidebar: Project "avatar" and quick stats
- Main area: Detailed proposal
- Right sidebar: Your account manager contact

---

### 4. Commit Screen (macOS Era)

**Theme:** Clean Apple Finder/System Preferences style

**Purpose:** Contract signing and project kickoff

**Features:**
- Document preview in clean card layout
- Digital signature capture
- Checkbox confirmations for terms
- "Dock" navigation to related documents
- Sidebar for document sections
- Progress indicator for signing steps

**Integration:**
- DocuSign or similar e-signature
- External payment link (not in-app)
- Calendar invite generation for kickoff call

---

### 5. Updates Screen (AI Modern Era)

**Theme:** Contemporary chat/AI assistant interface

**Purpose:** Ongoing project communication and status

**Features:**
- Chat-based interface with your team
- AI-summarized status updates
- Milestone cards with progress indicators
- File/deliverable previews
- Push notification integration
- Voice memo support

**Sections:**
- Active chat thread
- Milestone timeline
- Deliverables gallery
- Meeting schedule

---

## Technical Stack

### Framework
- **React Native** (Expo managed workflow)
- **TypeScript** for type safety

### State Management
- **Zustand** for lightweight global state
- **React Query** for server state

### Backend Integration
- REST API endpoints on servicevision.net
- WebSocket for real-time chat
- Push notifications via Expo

### Authentication
- Email/password with magic link option
- Biometric unlock for returning users

### Offline Support
- SQLite for local caching
- Optimistic updates with sync queue

---

## API Endpoints (Planned)

```
POST   /api/app/projects              # Create new project request
GET    /api/app/projects/:id          # Get project details
PUT    /api/app/projects/:id/scope    # Update scope details
GET    /api/app/projects/:id/quote    # Get proposal/quote
POST   /api/app/projects/:id/accept   # Accept proposal
GET    /api/app/projects/:id/updates  # Get status updates
POST   /api/app/projects/:id/message  # Send message
GET    /api/app/user/projects         # List user's projects
```

---

## Easter Eggs & Delighters

Each era screen includes hidden interactions that reward exploration:

| Era | Easter Egg | Trigger |
|-----|------------|---------|
| Terminal | Asteroids game | Type `play asteroids` |
| Win95 | Clippy appearance | Click help 3x |
| Dot-Com | "Under Construction" GIF | Shake device |
| macOS | Dock magnification | Long press icons |
| AI Era | "I'm sorry Dave" | Ask about HAL |

---

## Branding Consistency

- **Colors:** Match website palette (emerald #10b981, amber #f59e0b)
- **Typography:** System fonts matching each era
- **Animations:** Era-appropriate transitions
- **Sound:** Optional retro sound effects (toggle in settings)

---

## Development Phases

### Phase 1: Foundation
- [ ] Expo project setup
- [ ] Navigation structure
- [ ] Authentication flow
- [ ] API client setup

### Phase 2: Core Screens
- [ ] Request screen (Terminal)
- [ ] Scope screen (Win95)
- [ ] Quote screen (Dot-Com)
- [ ] Commit screen (macOS)
- [ ] Updates screen (AI)

### Phase 3: Integration
- [ ] Backend API development
- [ ] Real-time messaging
- [ ] Push notifications
- [ ] File handling

### Phase 4: Polish
- [ ] Easter eggs implementation
- [ ] Animations and transitions
- [ ] Accessibility audit
- [ ] Performance optimization

### Phase 5: Launch
- [ ] TestFlight beta
- [ ] App Store submission
- [ ] Marketing materials

---

## Repository

- **GitHub:** dbbuilder-org/servicevision-app
- **Location:** ~/dev2/servicevision-app (to be created)

---

## Related Resources

- [Website](https://servicevision.net)
- [Design System](./DESIGN_SYSTEM.md)
- [API Specification](./API_SPECIFICATION.md)

---

*Last Updated: January 2026*
*Author: ServiceVision Engineering Team*
