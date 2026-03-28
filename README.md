# Schedulo — Cal.com Clone

A full-featured scheduling and booking web application that closely replicates Cal.com's design, UX, and functionality. Built as a home assignment for evaluation.

---

## 🌐 Live Demo

- **App**: `http://localhost:3000`
- **Landing Page**: `http://localhost:3000/`
- **Dashboard**: `http://localhost:3000/dashboard`
- **Public Profile**: `http://localhost:3000/alex`
- **Sample Booking Page**: `http://localhost:3000/book/30min`

---

## 🎯 Features

### Core (Must Have) — All Implemented ✅

| Feature | Details |
|---|---|
| **Event Types Management** | Create, edit, delete event types with title, description, duration, slug, color |
| **Availability Settings** | Day-of-week toggles, start/end time pickers, timezone selector |
| **Public Booking Page** | Calendar view, available time slots, booking form, double-booking prevention |
| **Booking Confirmation** | Dedicated confirmation page with event details |
| **Bookings Dashboard** | Tabs for upcoming/past/cancelled, cancel functionality, stats |
| **Unique Public Links** | Every event type gets `/book/{slug}` |

### Bonus Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Landing page (Cal.com-style marketing page)
- ✅ Public user profile page (like `cal.com/username`)
- ✅ Settings & profile management page
- ✅ Active/inactive toggle per event type
- ✅ Color-coded event types
- ✅ Copy booking link to clipboard
- ✅ Stats dashboard with booking counts

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, TypeScript) |
| **Frontend** | React 19, Vanilla CSS (custom design system) |
| **Backend** | Next.js API Routes (Route Handlers) |
| **Database** | SQLite via `better-sqlite3` (embedded, zero-config) |
| **Fonts** | Inter (Google Fonts) |
| **Icons** | Inline SVGs (no external library) |

---

## 🗃️ Database Schema

```sql
-- Default user (pre-seeded, no login required)
users (id, name, username, email, avatar, timezone, created_at)

-- Event types with unique slugs for public URLs
event_types (id, user_id, title, slug, description, duration, location, color, is_active, created_at)

-- Availability schedule (default working hours)
availability (id, user_id, name, timezone, is_default, created_at)

-- Per-day settings within an availability schedule
availability_days (id, availability_id, day_of_week, is_enabled, start_time, end_time)

-- Individual bookings with conflict prevention
bookings (id, event_type_id, user_id, booker_name, booker_email, start_time, end_time, status, notes, uid, created_at)
```

### Key Design Decisions

- **`uid` on bookings**: A unique random identifier for each booking, used in confirmation URLs (avoids exposing auto-increment IDs)
- **`availability_days` table**: Stores per-day availability separately, allowing fine-grained control per weekday
- **`is_active` on event_types**: Soft-disable without deleting — bookers see a 404 for disabled events
- **SQLite with WAL mode**: Enables concurrent reads, safe for development and single-server production

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### 1. Clone & install

```bash
git clone <your-repo-url>
cd schedulo
npm install
```

### 2. Run in development

```bash
npm run dev
```

The app will be available at **http://localhost:3000**

The SQLite database is auto-created at `data/schedulo.db` on first run, and seeded with:
- 4 event types (15min, 30min, 1hour, product-demo)
- Default availability (Mon–Fri 9AM–5PM, America/New_York)
- 6 sample bookings (3 upcoming, 2 past, 1 cancelled)

### 3. Build for production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Full design system (Cal.com-style)
│   ├── alex/
│   │   └── page.tsx               # Public user profile (/alex)
│   ├── book/
│   │   └── [slug]/
│   │       ├── page.tsx           # Public booking page
│   │       └── confirm/
│   │           └── page.tsx       # Booking confirmation
│   ├── dashboard/
│   │   ├── layout.tsx             # Dashboard shell with sidebar
│   │   ├── page.tsx               # Event types management
│   │   ├── bookings/
│   │   │   └── page.tsx          # Bookings dashboard
│   │   ├── availability/
│   │   │   └── page.tsx          # Availability settings
│   │   └── settings/
│   │       └── page.tsx          # Profile & settings
│   └── api/
│       ├── event-types/
│       │   ├── route.ts           # GET all, POST create
│       │   └── [id]/route.ts     # GET, PUT, DELETE by id
│       ├── availability/
│       │   └── route.ts           # GET and PUT availability
│       ├── bookings/
│       │   ├── route.ts           # GET all, POST create
│       │   └── [id]/route.ts     # PATCH status (cancel)
│       ├── slots/
│       │   └── route.ts          # GET available time slots
│       ├── public/
│       │   └── [slug]/route.ts   # GET event type by slug
│       └── user/
│           └── route.ts          # GET current user
├── components/
│   ├── Sidebar.tsx               # Nav sidebar with copy-link
│   └── Toast.tsx                 # Toast notification system
└── lib/
    └── db.ts                     # SQLite init, schema, seed data
```

---

## 🎨 UI Design

The application closely replicates Cal.com's design language:

- **Color palette**: Clean whites, light gray backgrounds (`#f3f4f6`), near-black text (`#111827`)
- **Typography**: Inter font — same as Cal.com
- **Layout**: Fixed sidebar (240px) + scrollable main content
- **Components**: Cards with color-bar accents, smooth toggle switches, tab navigation, inline time pickers
- **Public booking page**: Two-panel layout (event info left, calendar right) — identical to Cal.com

---

## 🔌 API Reference

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/event-types` | List all event types |
| POST | `/api/event-types` | Create event type |
| GET | `/api/event-types/:id` | Get event type |
| PUT | `/api/event-types/:id` | Update event type |
| DELETE | `/api/event-types/:id` | Delete event type |
| GET | `/api/availability` | Get availability schedule |
| PUT | `/api/availability` | Update availability |
| GET | `/api/bookings` | List all bookings |
| POST | `/api/bookings` | Create booking (with conflict check) |
| PATCH | `/api/bookings/:id` | Update booking status |
| GET | `/api/slots?slug=X&date=YYYY-MM-DD` | Get available slots for a date |
| GET | `/api/public/:slug` | Get public event type info |
| GET | `/api/user` | Get current user profile |

---

## ⚙️ Assumptions

1. **Single default user**: The system assumes a single pre-logged-in user ("Alex Johnson"). No authentication is implemented — the dashboard shows admin views directly.
2. **Server-side SQLite**: `better-sqlite3` runs synchronously in Node.js API routes. This works great in development and single-instance deployments.
3. **Timezone display only**: Timezone is stored and displayed but not used to convert UTC slot times yet (slots are local server time).
4. **No email notifications**: Booking confirmation emails are out of scope; a confirmation page is shown instead.
5. **Date seeding**: Sample booking dates are seeded relative to the current date at first run.

---

## 📸 Screenshots

| Page | Description |
|---|---|
| `/` | Cal.com-style marketing landing page |
| `/dashboard` | Event types management with stats |
| `/dashboard/bookings` | Tabbed booking list (upcoming/past/cancelled) |
| `/dashboard/availability` | Weekly availability with day toggles |
| `/dashboard/settings` | Profile and preferences |
| `/alex` | Public user profile showing all event types |
| `/book/30min` | Public booking page with calendar |
| `/book/30min/confirm` | Post-booking confirmation screen |
