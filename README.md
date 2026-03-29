# Schedulo - Cal.com Clone

<<<<<<< HEAD
A high-fidelity, full-stack scheduling platform inspired by Cal.com. Built as part of the SDE Intern Fullstack Assignment.

## 🚀 Live Demo
- **URL:** [https://cal-com-clone-gamma.vercel.app/](https://cal-com-clone-gamma.vercel.app/)
- **GitHub:** [https://github.com/SoumilLathey/cal.com_clone](https://github.com/SoumilLathey/cal.com_clone)
=======
A full-featured scheduling and booking web application that closely replicates Cal.com's design, UX, and functionality. Built as a home assignment for evaluation.
>>>>>>> cae02d46841d53e752b4268a4ab0b2af0db9114e

---

## ✨ Features

<<<<<<< HEAD
### Core Features (Must Have)
- **Event Types Management:**
  - Create, edit, and delete event types with custom titles, descriptions, durations, and unique slugs.
  - Pixel-perfect dashboard for managing meeting configurations.
  - Unique public booking links for each event type (e.g., `/book/30min`).
- **Availability Settings:**
  - Global availability schedules with support for multiple configurations.
  - Set specific working hours for each day of the week.
  - Timezone-aware scheduling to handle international bookings.
- **Public Booking Page:**
  - Dynamic calendar view for date selection.
  - Real-time time slot generation based on user availability and existing bookings.
  - Modern booking form with validation.
  - Conflict prevention (Double-booking prevention).
  - Instant booking confirmation pages.
- **Bookings Dashboard:**
  - View all upcoming and past bookings in a clean, organized list.
  - One-click cancellation for scheduled meetings.

### 🌟 Bonus Features (Good to Have)
- **📱 Fully Responsive Design:** Hand-crafted CSS for a seamless experience across Mobile, Tablet, and Desktop.
- **🕒 Date Overrides:** Block specific dates or set custom hours for any given day to override your regular schedule.
- **📧 Email Notifications:** Automated professional email notifications triggered via Nodemailer for:
  - Booking Confirmations (sent to both Admin and Booker).
  - Booking Cancellations.
- **⏳ Buffer Times:** Add preparation time (before/after) between meetings to prevent back-to-back fatigue.
- **📋 Custom Booking Questions:** Support for dynamic form fields in event types (e.g., asking for specific details during booking).
- **🔄 Rescheduling Flow:** Integrated flow allowing users to reschedule existing bookings via unique links.
- **🌗 Rich Aesthetics:** Implemented modern UI patterns including:
  - Glassmorphism effects.
  - Smooth micro-animations for interactions.
  - Brand marquee with edge-fade effects.
  - "Interactive Mockup" components on the landing page.
=======
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
- ✅ Email notifications (Gmail via Nodemailer)
- ✅ Custom login / User identification
>>>>>>> cae02d46841d53e752b4268a4ab0b2af0db9114e

---

## 🛠️ Tech Stack

<<<<<<< HEAD
- **Frontend:** [Next.js 15](https://nextjs.org/) (App Router), [React 19](https://react.dev/), [Lucide React](https://lucide.dev/) (Icons).
- **Styling:** Vanilla CSS with modern Flexbox/Grid layouts & native CSS variables for maximum performance and design control.
- **Backend:** Next.js API Routes (Serverless).
- **Database:** [MySQL](https://www.mysql.com/) hosted on [Railway](https://railway.app/) for production.
- **Emailing:** [Nodemailer](https://nodemailer.com/) with Gmail SMTP integration.
- **Deployment:** [Vercel](https://vercel.com/) (Frontend/API) + [Railway](https://railway.app/) (Database).
=======
| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, TypeScript) |
| **Frontend** | React 19, Vanilla CSS (custom design system) |
| **Backend** | Next.js API Routes (Route Handlers) |
| **Database** | SQLite via `better-sqlite3` (embedded, zero-config) |
| **Email** | Nodemailer (Gmail App Password integration) |
| **Fonts** | Inter (Google Fonts) |
| **Icons** | Inline SVGs (no external library) |
>>>>>>> cae02d46841d53e752b4268a4ab0b2af0db9114e

---

## 📊 Database Schema

<<<<<<< HEAD
The application uses a relational MySQL schema designed for high-performance scheduling queries.

### 1. `users`
Stores shared account information (assumes default user as per assignment).
- `id`: INT (Primary Key)
- `name`: VARCHAR(255)
- `username`: VARCHAR(255) (Unique)
- `email`: VARCHAR(255) (Unique)
- `timezone`: VARCHAR(255)

### 2. `event_types`
Configuration for different meeting types.
- `id`: INT (Primary Key)
- `title`: VARCHAR(255)
- `slug`: VARCHAR(255) (Unique)
- `description`: TEXT
- `duration`: INT (Minutes)
- `location`: VARCHAR(255)
- `color`: VARCHAR(7)
- `buffer_time`: INT (Minutes)
- `custom_questions`: TEXT (JSON storage for dynamic fields)

### 3. `availability`
Containers for working hour sets.
- `id`: INT (Primary Key)
- `name`: VARCHAR(255)
- `timezone`: VARCHAR(255)
- `is_default`: TINYINT (Boolean)

### 4. `availability_days`
Specific hours for each day of the week.
- `id`: INT (Primary Key)
- `availability_id`: INT (FK to `availability`)
- `day_of_week`: INT (0-6)
- `is_enabled`: TINYINT (Boolean)
- `start_time`: VARCHAR(5) (e.g., "09:00")
- `end_time`: VARCHAR(5) (e.g., "17:00")

### 5. `date_overrides`
Overrides for specific calendar dates.
- `id`: INT (Primary Key)
- `date`: DATE
- `is_blocked`: TINYINT
- `start_time`: VARCHAR(5)
- `end_time`: VARCHAR(5)

### 6. `bookings`
Record of all scheduled appointments.
- `id`: INT (Primary Key)
- `event_type_id`: INT (FK to `event_types`)
- `booker_name`: VARCHAR(255)
- `booker_email`: VARCHAR(255)
- `start_time`: DATETIME
- `end_time`: DATETIME
- `status`: VARCHAR(50) (upcoming/cancelled)
- `notes`: TEXT
- `uid`: VARCHAR(255) (Unique identifier for links)
- `answers`: TEXT (JSON for custom form responses)
=======
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
>>>>>>> cae02d46841d53e752b4268a4ab0b2af0db9114e

---

## ⚙️ Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SoumilLathey/cal.com_clone.git
   cd schedulo
   ```

<<<<<<< HEAD
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env.local` file with the following keys:
   ```env
   # Database (MySQL)
   MYSQL_URL=your_mysql_connection_string
   
   # Email (Nodemailer)
   GMAIL_USER=your_gmail@gmail.com
   GMAIL_PASS=your_app_password
   ADMIN_EMAIL=your_notification_receiver@gmail.com
   
   # App URL
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Initialize Database:**
   The application automatically runs `initDb()` from `src/lib/db2.ts` on its first run to create tables and seed sample data.

5. **Run Development Server:**
   ```bash
   npm run dev
   ```

---

## 💡 Assumptions Made
- **Authentication:** As per the requirement, "No Login Required" for the admin side. The app assumes a default primary user (Demo User) for the dashboard.
- **Email Delivery:** Assumes a valid Gmail App Password is provided for the Nodemailer transport to function.
- **Deployment environment:** Optimized for Vercel Serverless functions, including proper `await` handling for async operations like database calls and email dispatch.
=======
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

1. **Flexible User Identification**: The system allows signing in as a default "Admin" or with a custom email to receive booking notifications.
2. **Server-side SQLite**: `better-sqlite3` runs synchronously in Node.js API routes. This works great in development and single-instance deployments.
3. **Timezone display only**: Timezone is stored and displayed but not used to convert UTC slot times yet (slots are local server time).
4. **Email notifications**: Automatic booking confirmation and admin notification emails are sent using Gmail via Nodemailer.
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
>>>>>>> cae02d46841d53e752b4268a4ab0b2af0db9114e
