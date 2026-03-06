# Spazeo — Complete Application Flow

## Overview Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Next.js)                       │
│  Landing ─→ Auth ─→ Onboarding ─→ Dashboard ─→ Tour Editor     │
│                                                    ↓            │
│                                              Public Viewer      │
└──────────────────────────┬──────────────────────────────────────┘
                           │ useQuery / useMutation / useAction
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      CONVEX (Backend)                           │
│  Queries (reactive) │ Mutations (writes) │ Actions (external)   │
│         ↕                    ↕                    ↕             │
│    Database              Scheduler           OpenAI / Stripe    │
│    File Storage          Cron Jobs           Replicate / Resend │
└─────────────────────────────────────────────────────────────────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
           Clerk       Stripe      OpenAI/Replicate
         (Auth)      (Billing)      (AI Features)
```

---

## Flow 1: New User Journey (Landing → Dashboard)

```
┌──────────┐     ┌──────────┐     ┌───────────┐     ┌───────────┐     ┌───────────┐
│ Landing  │────→│ Sign Up  │────→│ Clerk     │────→│Onboarding │────→│ Dashboard │
│ Page     │     │ Page     │     │ Creates   │     │ 3 Steps   │     │ Home      │
│ (/)      │     │(/sign-up)│     │ User      │     │           │     │           │
└──────────┘     └──────────┘     └───────────┘     └───────────┘     └───────────┘
     │                                  │                 │
     │                                  ▼                 ▼
     │                          ┌───────────────┐  ┌──────────────┐
     │                          │Clerk Webhook  │  │Convex: users │
     │                          │→ http.ts      │  │.completeOn-  │
     │                          │→ upsertFrom-  │  │boarding()    │
     │                          │  Clerk()      │  └──────────────┘
     │                          └───────────────┘
     │
     ▼
┌──────────────────────────────────────────────────────┐
│              LANDING PAGE SECTIONS                    │
│                                                      │
│  Navbar ── [Features] [Pricing] [About] [Sign In]    │
│     ↓                                                │
│  Hero ── "Step Inside Any Space" + 2 CTAs            │
│     ↓                                                │
│  LogoBar ── Trust indicators                         │
│     ↓                                                │
│  Features ── 6 feature cards with icons              │
│     ↓                                                │
│  HowItWorks ── Upload → Customize → Share            │
│     ↓                                                │
│  StatsBar ── 10K+ tours, 2M+ views                   │
│     ↓                                                │
│  Testimonials ── 3 customer quotes                   │
│     ↓                                                │
│  Pricing ── Free / Pro / Enterprise                  │
│     ↓                                                │
│  CTA ── "Ready to Transform Your Listings?"          │
│     ↓                                                │
│  Footer ── Links, Social, Legal                      │
└──────────────────────────────────────────────────────┘
```

### Onboarding Detail

```
Step 1: Welcome & Profile          Step 2: Business Details         Step 3: Get Started
┌─────────────────────┐           ┌─────────────────────┐          ┌─────────────────────┐
│ ● ○ ○               │           │ ● ● ○               │          │ ● ● ●               │
│                      │           │                      │          │                      │
│ Display Name [____]  │    ──→    │ Company    [______]  │   ──→    │ ✨ You're all set!  │
│ Business Type [▼]    │           │ Website    [______]  │          │                      │
│ ○ Real Estate Agent  │           │ Team Size  [▼]       │          │ [Go to Dashboard]    │
│ ○ Property Manager   │           │ How found? [______]  │          │ [Create First Tour]  │
│ ○ Photographer       │           │                      │          │                      │
│        [Next →]      │           │   [← Back] [Next →]  │          │                      │
└─────────────────────┘           └─────────────────────┘          └─────────────────────┘
                                                                            │
                                         Convex: users.saveOnboardingStep() │
                                         Convex: users.completeOnboarding() │
                                                                            ▼
                                                                    redirect → /dashboard
```

---

## Flow 2: Dashboard (Main Hub)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ DASHBOARD LAYOUT                                                                │
│ ┌──────────┐  ┌──────────────────────────────────────────────────────────────┐  │
│ │ SIDEBAR  │  │  DASHBOARD HOME                                             │  │
│ │          │  │                                                              │  │
│ │ Dashboard│◀─│  "Good morning, Abhinay" ─── Convex: users.getCurrent       │  │
│ │ Tours    │  │                                                              │  │
│ │ Analytics│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐               │  │
│ │ Leads    │  │  │ Tours  │ │ Views  │ │ Leads  │ │ Hours  │               │  │
│ │ Settings │  │  │  12    │ │ 2,847  │ │   45   │ │  156   │               │  │
│ │ Billing  │  │  │ +2 ↑   │ │ +15% ↑ │ │ +8 ↑   │ │ +12% ↑ │               │  │
│ │          │  │  └────────┘ └────────┘ └────────┘ └────────┘               │  │
│ │          │  │  ← Convex: analytics.getDashboardOverview ──→               │  │
│ │          │  │                                                              │  │
│ │          │  │  Quick Actions:                                              │  │
│ │          │  │  [+ Create Tour] [Upload] [Analytics] [Leads]               │  │
│ │          │  │       │                                                      │  │
│ │          │  │       └──→ /tours?create=true                               │  │
│ │          │  │                                                              │  │
│ │          │  │  Recent Tours ── Convex: tours.getRecent                     │  │
│ │          │  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                       │  │
│ │          │  │  │Tour 1│ │Tour 2│ │Tour 3│ │Tour 4│                       │  │
│ │          │  │  │Draft │ │Pub'd │ │Pub'd │ │Draft │                       │  │
│ │          │  │  └──────┘ └──────┘ └──────┘ └──────┘                       │  │
│ │          │  │                                                              │  │
│ │          │  │  Activity Feed ── Convex: activity.getRecent (reactive)      │  │
│ │          │  │  • Created tour "Luxury Villa"         2 min ago            │  │
│ │          │  │  • Published tour "Beach House"        1 hr ago             │  │
│ │          │  │  • New lead: John Smith                3 hrs ago            │  │
│ │          │  │  [Load more]                                                 │  │
│ └──────────┘  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Flow 3: Tour Creation & Editing (Core Flow)

```
                    ┌──────────────────────────────────────────────────────┐
                    │             TOUR MANAGER (/tours)                    │
                    │                                                      │
                    │  [Grid ▣] [List ≡]  [Search___] [Status ▼] [Sort ▼] │
                    │                                                      │
                    │  ☐ Select All         [+ Create New Tour]            │
                    │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐              │
                    │  │☐     │ │☐     │ │☐     │ │☐     │              │
                    │  │ 🏠   │ │ 🏢   │ │ 🏖   │ │ 🏗   │              │
                    │  │Villa │ │Office│ │Beach │ │Condo │              │
                    │  │Draft │ │Pub'd │ │Pub'd │ │Arch'd│              │
                    │  │⋮ Menu│ │⋮ Menu│ │⋮ Menu│ │⋮ Menu│              │
                    │  └──┬───┘ └──────┘ └──────┘ └──────┘              │
                    │     │                                                │
                    │     ▼ Menu: Edit │ Preview │ Duplicate │             │
                    │                   Archive │ Delete │ Share           │
                    └─────────────┬────────────────────────────────────────┘
                                  │
          ┌───────────────────────┼─────────────────────────┐
          ▼                       ▼                         ▼
   [+ Create Tour]         [Click Tour Card]          [Edit Button]
          │                       │                         │
          ▼                       ▼                         ▼
┌─────────────────┐   ┌──────────────────┐   ┌─────────────────────────┐
│ Create Dialog    │   │ Tour Detail Page  │   │ Tour Editor (Full Page) │
│                  │   │ /tours/[id]       │   │ /tours/[id]/edit        │
│ Title: [______]  │   │                  │   │                         │
│ Desc:  [______]  │   │ Cover Image      │   │ (see detailed flow      │
│                  │   │ Stats: Views,    │   │  below)                 │
│ [Cancel] [Create]│   │   Scenes, Status │   │                         │
│                  │   │ Scene List       │   │                         │
│ Convex:          │   │ [Edit] [Share]   │   │                         │
│ tours.create()   │   │ [Delete]         │   │                         │
│   ↓              │   │                  │   │                         │
│ redirect →       │   │ Convex:          │   │                         │
│ /tours/[id]/edit │   │ tours.getById    │   │                         │
└─────────────────┘   │ scenes.listByTour│   │                         │
                       │ leads.listByTour │   │                         │
                       └──────────────────┘   └─────────────────────────┘
```

### Tour Editor — Detailed Layout

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ ← Back    Tour Title (click to edit)    [Published ✓]    [Preview] [Publish]│
├────────────┬─────────────────────────────────────────┬───────────────────────┤
│ SCENES     │              VIEWPORT                   │   PROPERTIES         │
│ Panel      │                                         │   Panel              │
│            │                                         │                      │
│ Scenes  3  │     ┌───────────────────────────┐       │   Scene Details      │
│            │     │                           │       │                      │
│ ┌────────┐ │     │    360° Panorama View     │       │   Name: [ENTRY____]  │
│ │⋮ ▪ ENT │ │     │                           │       │                      │
│ │  ENTRY │◀──────│    (PanoramaViewer or     │       │   Room Type (AI):    │
│ │  Sc. 1 │ │     │     flat image preview)   │       │   [Living Room]      │
│ └────────┘ │     │                           │       │                      │
│ ┌────────┐ │     │    [Hotspot markers]      │       │   Quality: 87/100    │
│ │⋮ ▪ KIT │ │     │                           │       │                      │
│ │  KITCH │ │     │                           │       │   Objects:           │
│ │  Sc. 2 │ │     └───────────────────────────┘       │   [sofa] [table]     │
│ └────────┘ │                                         │   [lamp] [window]    │
│ ┌────────┐ │     ┌───────────┐                       │                      │
│ │⋮ ▪ BED │ │     │  ENTRY    │ ← Scene label        │   Panorama Type:     │
│ │  BEDRO │ │     └───────────┘                       │   Equirectangular    │
│ │  Sc. 3 │ │                                         │                      │
│ └────────┘ │                                         │ ┌────────────────┐   │
│            │     OR (if no scenes):                   │ │  Publish Tour  │   │
│ ⬆ Drag to │                                         │ └────────────────┘   │
│ reorder    │     ┌───────────────────────────┐       │                      │
│            │     │  📤 Upload 360° Panoramas │       │                      │
│ + Add Scenes     │                           │       │                      │
│   ↓              │  Drag & drop or click     │       │                      │
│ <input           │  [Select Files]           │       │                      │
│  type="file"     │                           │       │                      │
│  multiple>       └───────────────────────────┘       │                      │
└────────────┴─────────────────────────────────────────┴───────────────────────┘
```

### Upload Flow (3-Step Pattern)

```
User drops files
       │
       ▼
┌─────────────────┐     ┌──────────────────┐     ┌───────────────────┐
│ 1. Generate URL │────→│ 2. Upload File   │────→│ 3. Create Scene   │
│                 │     │                  │     │                   │
│ Convex:         │     │ fetch(uploadUrl, │     │ Convex:           │
│ tours.generate- │     │   { method:POST, │     │ scenes.create({   │
│ UploadUrl()     │     │     body: file })│     │   tourId,         │
│                 │     │                  │     │   title,          │
│ Returns:        │     │ Returns:         │     │   imageStorageId, │
│ uploadUrl       │     │ { storageId }    │     │   order           │
└─────────────────┘     └──────────────────┘     │ })                │
                                                  └───────┬───────────┘
                                                          │
                                              (optional)  ▼
                                                  ┌───────────────────┐
                                                  │ AI Analysis       │
                                                  │ scheduler →       │
                                                  │ aiActions.analyze │
                                                  │ Scene()           │
                                                  │                   │
                                                  │ → OpenAI Vision   │
                                                  │ → room type,      │
                                                  │   quality score,  │
                                                  │   objects         │
                                                  └───────────────────┘
```

### Publish Flow

```
User clicks [Publish]
       │
       ▼
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│ Check: scenes    │────→│ Convex:          │────→│ Tour is live at: │
│ exist?           │     │ tours.publish({  │     │ /tour/[slug]     │
│                  │     │   tourId         │     │                  │
│ If no scenes:    │     │ })               │     │ Status → "pub-   │
│ show error toast │     │                  │     │ lished"          │
│                  │     │ Sets:            │     │ publishedAt →    │
│                  │     │ status=published │     │ Date.now()       │
│                  │     │ publishedAt=now  │     │                  │
│                  │     │ generates slug   │     │ [Copy Link]      │
│                  │     │ if not set       │     │ [Share Dialog]   │
└──────────────────┘     └──────────────────┘     └──────────────────┘
```

---

## Flow 4: Public Tour Viewer (Visitor Experience)

```
Visitor opens: spazeo.io/tour/luxury-villa-123
       │
       ▼
┌──────────────────────────────────────────────────────────────────┐
│                    PUBLIC TOUR VIEWER                             │
│                                                                  │
│  Convex: tours.getBySlug({ slug })                              │
│  Convex: scenes.listByTour({ tourId })                          │
│  Convex: hotspots.listByTour({ tourId })                        │
│                                                                  │
│  ┌────────────────────────────────────────────────┐             │
│  │                                                │             │
│  │          360° PANORAMA VIEWER                  │             │
│  │          (Three.js / @react-three/fiber)       │             │
│  │                                                │             │
│  │     ┌──┐                                       │             │
│  │     │⊙│ ← Hotspot (click to navigate)         │             │
│  │     └──┘                                       │             │
│  │                          ┌──┐                  │             │
│  │                          │ℹ│ ← Info hotspot    │             │
│  │                          └──┘                  │             │
│  │                                                │             │
│  │  [◀ Prev] [Scene 1 of 5] [Next ▶]            │             │
│  │  [Fullscreen] [Share]                          │             │
│  │                                                │             │
│  └────────────────────────────────────────────────┘             │
│                                                                  │
│  Scene Navigator:                                                │
│  [Living Room] [Kitchen] [Bedroom] [Balcony] [Garden]           │
│                                                                  │
│  ┌──────────────────────────────┐                               │
│  │ 📋 Interested? Get in touch │ ← Lead Capture Form           │
│  │ Name:  [________________]   │                                │
│  │ Email: [________________]   │   Convex: leads.capture({      │
│  │ Phone: [________________]   │     tourId, name, email,       │
│  │ [Send Inquiry]              │     phone, message             │
│  └──────────────────────────────┘   })                          │
│                                      │                           │
│  Analytics tracked on every action:  │    ┌──────────────────┐  │
│  • Page view                         ├───→│ Convex:          │  │
│  • Scene change                      │    │ analytics.track  │  │
│  • Hotspot click                     │    │ ({tourId, event, │  │
│  • Time spent                        │    │  sessionId,      │  │
│  • Device type                       │    │  sceneId})       │  │
│                                      │    └──────────────────┘  │
│                                      │                           │
│                                      │    ┌──────────────────┐  │
│                                      └───→│ Lead Notification│  │
│                                           │ Email via Resend │  │
│                                           │ to tour owner    │  │
│                                           └──────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Flow 5: Analytics Dashboard

```
┌──────────────────────────────────────────────────────────────────┐
│              ANALYTICS PAGE (/analytics)                         │
│                                                                  │
│  Period: [7D] [30D] [90D]  ── filter param for all queries      │
│                                                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │ Views    │ │ Visitors │ │ Conv.Rate│ │ Avg Time │          │
│  │  2,847   │ │  1,203   │ │   3.7%   │ │  4:32    │          │
│  │ +15% ↑   │ │ +8% ↑    │ │ +0.5% ↑  │ │ +12% ↑   │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
│  ← Convex: analytics.getDashboardOverview({ period }) ──→      │
│                                                                  │
│  Views by Tour (CSS bar chart):                                 │
│  Luxury Villa  ████████████████████  847                        │
│  Beach House   ████████████████  632                            │
│  City Condo    ██████████  421                                  │
│                                                                  │
│  Tour Performance Table:                                         │
│  ← Convex: analytics.getTourPerformance({ period }) ──→        │
│  ┌──────────┬────────┬────────┬───────┬──────────┐             │
│  │ Tour     │ Status │ Views  │ Leads │ Avg Time │             │
│  │ Villa    │ 🟢 Pub │  847   │  12   │  5:21    │             │
│  │ Beach    │ 🟢 Pub │  632   │   8   │  4:15    │             │
│  │ Condo    │ 🟡 Dft │  421   │   3   │  3:48    │             │
│  └──────────┴────────┴────────┴───────┴──────────┘             │
│                                                    [Export CSV]  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Flow 6: Lead Management

```
┌──────────────────────────────────────────────────────────────────┐
│              LEADS PAGE (/leads)                                 │
│                                                                  │
│  ┌────────┐ ┌────────┐ ┌──────────┐ ┌───────────┐             │
│  │ Total  │ │New This│ │Qualified │ │ Contacted │             │
│  │  45    │ │ Week: 8│ │    12    │ │    18     │             │
│  └────────┘ └────────┘ └──────────┘ └───────────┘             │
│  ← Convex: leads.getStats() ──→                                │
│                                                                  │
│  [All] [New] [Contacted] [Qualified] [Archived]   [Search___]  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Name          │ Email           │ Tour    │ Date   │Status │ │
│  ├────────────────────────────────────────────────────────────┤ │
│  │ ▶ John Smith  │ john@email.com  │ Villa   │ 2h ago │ 🟡New │ │
│  │ ┌──────────────────────────────────────────────────────┐   │ │
│  │ │ Expanded: Phone, Message, Time on tour, Scenes      │   │ │
│  │ │ viewed, Device, Location                             │   │ │
│  │ │ [Mark Contacted] [Mark Qualified] [Archive]          │   │ │
│  │ └──────────────────────────────────────────────────────┘   │ │
│  │ ▷ Jane Doe    │ jane@email.com  │ Beach   │ 1d ago │🟢Qual│ │
│  │ ▷ Bob Wilson  │ bob@email.com   │ Villa   │ 3d ago │🔵Cont│ │
│  └────────────────────────────────────────────────────────────┘ │
│  ← Convex: leads.listAll({ status, search }) ──→               │
│  ← Convex: leads.updateStatus({ leadId, status }) ──→          │
│                                                    [Export CSV]  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Flow 7: Billing & Subscriptions

```
User clicks "Upgrade" or goes to /billing
       │
       ▼
┌──────────────────────────────────────────────────────────────────┐
│              BILLING PAGE (/billing)                             │
│                                                                  │
│  Current Plan: Free                                              │
│  ← Convex: subscriptions.getCurrent() ──→                       │
│                                                                  │
│  Usage:                                                          │
│  Tours: ███░░░░░░░  3/3 (limit reached)                        │
│  AI Credits: █░░░░░░░░░  5/50                                   │
│  ← Convex: subscriptions.getUsage() ──→                         │
│                                                                  │
│  [Upgrade to Pro — $29/mo]                                       │
│       │                                                          │
│       ▼                                                          │
│  Convex Action: subscriptions.createCheckoutSession()            │
│       │                                                          │
│       ▼                                                          │
│  ┌─────────────────────┐                                        │
│  │  Stripe Checkout    │ ← External redirect                    │
│  │  (hosted by Stripe) │                                        │
│  │  Card: [__________] │                                        │
│  │  [Pay $29.00]       │                                        │
│  └─────────┬───────────┘                                        │
│            │                                                     │
│            ▼                                                     │
│  ┌─────────────────────┐     ┌──────────────────────┐           │
│  │ Stripe Webhook      │────→│ Convex HTTP Action   │           │
│  │ checkout.session.   │     │ http.ts              │           │
│  │ completed           │     │                      │           │
│  │                     │     │ → subscriptions.     │           │
│  │                     │     │   upsertFromStripe() │           │
│  │                     │     │ → users plan = 'pro' │           │
│  └─────────────────────┘     └──────────────────────┘           │
│                                       │                          │
│                                       ▼                          │
│                              Dashboard auto-updates              │
│                              (reactive queries)                  │
│                              Tour limits lifted!                 │
│                                                                  │
│  [Manage Billing] → Stripe Customer Portal                      │
│  [Cancel Plan] → Confirmation → subscriptions.cancel()          │
│  Invoice History → subscriptions.getInvoices()                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Flow 8: AI Features Pipeline

```
User uploads panorama → Scene created
       │
       ▼
┌──────────────────────────────────────────────────────────────────┐
│                    AI JOB QUEUE PATTERN                          │
│                                                                  │
│  Step 1: Create Job                                              │
│  ┌────────────────────────┐                                     │
│  │ Mutation: ai.createJob │                                     │
│  │ {                      │                                     │
│  │   tourId,              │                                     │
│  │   sceneId,             │                                     │
│  │   type: "analyze",     │                                     │
│  │   status: "pending"    │                                     │
│  │ }                      │                                     │
│  └───────────┬────────────┘                                     │
│              │                                                   │
│  Step 2: Schedule Action                                         │
│              ▼                                                   │
│  ┌────────────────────────┐                                     │
│  │ ctx.scheduler.runAfter │                                     │
│  │ (0, internal.aiActions │                                     │
│  │  .analyzeScene, {      │                                     │
│  │    jobId, sceneId      │                                     │
│  │  })                    │                                     │
│  └───────────┬────────────┘                                     │
│              │                                                   │
│  Step 3: Action Processes                                        │
│              ▼                                                   │
│  ┌────────────────────────────────────────────┐                 │
│  │ Action: aiActions.analyzeScene             │                 │
│  │                                            │                 │
│  │ 1. Download image from Convex storage      │                 │
│  │ 2. Send to OpenAI GPT-4o Vision API        │                 │
│  │    → "Analyze this 360° panorama..."       │                 │
│  │ 3. Parse response:                         │                 │
│  │    • roomType: "Living Room"               │                 │
│  │    • qualityScore: 87                      │                 │
│  │    • objects: ["sofa","table","lamp"]       │                 │
│  │    • suggestions: ["improve lighting"]     │                 │
│  │ 4. Save via runMutation:                   │                 │
│  │    scenes.updateAiAnalysis({               │                 │
│  │      sceneId, roomType, aiAnalysis         │                 │
│  │    })                                      │                 │
│  │ 5. Update job status → "completed"         │                 │
│  └────────────────────────────────────────────┘                 │
│              │                                                   │
│  Step 4: Frontend auto-updates (reactive)                        │
│              ▼                                                   │
│  Tour editor right panel shows AI results                        │
│  (No polling needed — Convex useQuery is reactive)               │
│                                                                  │
│  ┌─────────────────────────┐                                    │
│  │ AI FEATURES AVAILABLE:  │                                    │
│  │ • Scene Analysis ✅     │                                    │
│  │ • Virtual Staging  ⬜   │ → Replicate (Stable Diffusion)     │
│  │ • Description Gen  ⬜   │ → OpenAI GPT-4o                    │
│  │ • Floor Plan Gen   ⬜   │ → CubiCasa API                    │
│  │ • Smart Search     ⬜   │ → Convex Vector Search             │
│  └─────────────────────────┘                                    │
└──────────────────────────────────────────────────────────────────┘
```

---

## Flow 9: Authentication & Route Protection

```
┌──────────────────────────────────────────────────────────────────┐
│                    AUTH FLOW                                      │
│                                                                  │
│  Browser Request                                                 │
│       │                                                          │
│       ▼                                                          │
│  ┌─────────────────────────────┐                                │
│  │ middleware.ts               │                                │
│  │ (Clerk middleware)          │                                │
│  │                             │                                │
│  │ Protected routes:           │                                │
│  │ • /dashboard(.*)            │                                │
│  │ • /tours(.*)                │                                │
│  │ • /analytics(.*)            │                                │
│  │ • /leads(.*)                │                                │
│  │ • /settings(.*)             │                                │
│  │ • /billing(.*)              │                                │
│  │ • /onboarding(.*)           │                                │
│  └──────────┬──────────────────┘                                │
│             │                                                    │
│      ┌──────┴──────┐                                            │
│      ▼             ▼                                            │
│  Authenticated   Not Auth'd                                     │
│      │             │                                            │
│      ▼             ▼                                            │
│  Pass through   Redirect to                                     │
│  to page        /sign-in                                        │
│      │                                                           │
│      ▼                                                           │
│  ┌─────────────────────────────────────────────┐                │
│  │ app/layout.tsx                               │                │
│  │                                              │                │
│  │ <ClerkProvider>                              │                │
│  │   <ConvexProviderWithClerk                  │                │
│  │     useAuth={useAuth}                       │                │
│  │   >                                         │                │
│  │     <App />  ← JWT "convex" token passed    │                │
│  │   </ConvexProviderWithClerk>                │                │
│  │ </ClerkProvider>                            │                │
│  └─────────────────────────────────────────────┘                │
│                    │                                             │
│                    ▼                                             │
│  Every Convex function checks:                                   │
│  ┌─────────────────────────────────────┐                        │
│  │ const identity =                    │                        │
│  │   await ctx.auth.getUserIdentity()  │                        │
│  │ if (!identity)                      │                        │
│  │   throw new Error('Not auth')       │                        │
│  └─────────────────────────────────────┘                        │
└──────────────────────────────────────────────────────────────────┘
```

---

## Flow 10: Share Dialog

```
User clicks [Share] on published tour
       │
       ▼
┌──────────────────────────────────────────────┐
│           SHARE DIALOG                        │
│                                              │
│  [Link] [Embed] [QR Code]  ← Tabs           │
│                                              │
│  Link Tab:                                   │
│  ┌────────────────────────────────────────┐  │
│  │ https://spazeo.io/tour/luxury-villa    │  │
│  │                              [📋 Copy] │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  Embed Tab:                                  │
│  ┌────────────────────────────────────────┐  │
│  │ <iframe src="https://spazeo.io/tour/   │  │
│  │ luxury-villa" width="100%"             │  │
│  │ height="500"></iframe>       [📋 Copy] │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  QR Tab:                                     │
│  ┌──────────┐                                │
│  │ ▓▓▓▓▓▓▓ │  ← SVG QR Code                │
│  │ ▓     ▓ │                                │
│  │ ▓▓▓▓▓▓▓ │                                │
│  └──────────┘                                │
│                                              │
│  Share on:                                   │
│  [𝕏 Twitter] [in LinkedIn] [f Facebook]     │
│  [WhatsApp] [✉ Email]                       │
│                                              │
│  → window.open(shareUrl) for each platform   │
└──────────────────────────────────────────────┘
```

---

## Data Flow Summary

```
┌─────────────────────────────────────────────────────────────────┐
│                     CONVEX DATABASE TABLES                       │
│                                                                  │
│  users ──────────────┬──── tours ──────────┬──── scenes         │
│  • clerkId           │    • userId (FK)    │    • tourId (FK)   │
│  • email, name       │    • title, slug    │    • title         │
│  • plan, role        │    • status         │    • imageStorageId│
│  • onboardingComplete│    • settings       │    • order         │
│  • company           │    • viewCount      │    • panoramaType  │
│                      │    • publishedAt    │    • roomType (AI) │
│                      │                     │    • aiAnalysis    │
│                      │                     │                    │
│                      │                     └──── hotspots       │
│                      │                          • sceneId (FK)  │
│                      │                          • targetSceneId │
│                      │                          • type, position│
│                      │                          • tooltip       │
│                      │                                          │
│                      ├──── leads                                │
│                      │    • tourId (FK)                         │
│                      │    • name, email, phone                  │
│                      │    • status, notes                       │
│                      │                                          │
│                      ├──── analytics                            │
│                      │    • tourId (FK)                         │
│                      │    • event, sessionId                    │
│                      │    • sceneId, timestamp                  │
│                      │                                          │
│                      └──── aiJobs                               │
│                           • tourId (FK)                         │
│                           • type, status                        │
│                           • input, output                       │
│                                                                  │
│  subscriptions ──────── activityLog                              │
│  • userId (FK)          • userId (FK)                           │
│  • stripeId             • type, message                         │
│  • plan, status         • tourId (optional)                     │
│  • currentPeriodEnd     • timestamp                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## Linear Issue Priority Order (Recommended Execution)

```
Phase 1: Critical Bugs & Blockers
├── SPA-52  Public tour viewer (hardcoded → Convex)     ★★★★
├── SPA-54  TourCard broken images                       ★★★★
├── SPA-62  AI actions auth fix                          ★★★★
├── SPA-66  Dashboard broken images                      ★★★★
└── SPA-55  Suspense boundary fix                        ★★★

Phase 2: Core Feature Completion
├── SPA-53  Billing page → Stripe                        ★★★
├── SPA-58  360° PanoramaViewer in editor                ★★★
├── SPA-59  Hotspot management UI                        ★★★
├── SPA-79  Plan limit enforcement                       ★★★
├── SPA-80  Share button on tour detail                  ★★★
├── SPA-82  Error boundary + 404 page                    ★★★
├── SPA-87  Onboarding redirect                          ★★★
└── SPA-84  SEO metadata                                 ★★★

Phase 3: Polish & Quality
├── SPA-60  Scene drag-and-drop reorder                  ★★
├── SPA-61  Tour settings panel                          ★★
├── SPA-63  AI analysis trigger                          ★★
├── SPA-77  Activity logging in mutations                ★★
├── SPA-81  Tour detail leads section                    ★★
├── SPA-83  Loading states                               ★★
├── SPA-86  Responsive audit                             ★★
├── SPA-88  Navbar active links                          ★★
├── SPA-89  Sidebar active route                         ★★
├── SPA-90  Auth page theming                            ★★
├── SPA-91  Settings verification                        ★★
├── SPA-92  Footer links fix                             ★★
└── SPA-85  Accessibility audit                          ★★

Phase 4: Nice-to-Have & Deployment
├── SPA-64  Scene description field                      ★
├── SPA-65  Mobile editor                                ★
├── SPA-78  Cron jobs verify                             ★
├── SPA-93  Leads CSV export                             ★
├── SPA-94  Stripe webhook test                          ★★★
├── SPA-95  Clerk webhook test                           ★★★
└── SPA-96  Vercel deployment                            ★★★
```
