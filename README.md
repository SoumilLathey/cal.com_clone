# Schedulo — Cal.com Clone

A full-featured scheduling and booking web application that closely replicates Cal.com's design, UX, and functionality. Built with a modern tech stack including Next.js, MySQL, and Nodemailer.

---

## 🌐 Live Demo

- **App**: `https://calclone21-swart.vercel.app/dashboard`
- **Landing Page**: `https://calclone21-swart.vercel.app/`
- **Dashboard**: `https://calclone21-swart.vercel.app/dashboard`
- **Public Profile**: `https://calclone21-swart.vercel.app/alex`

---

## 🎯 Features

### Core (Must Have) — All Implemented ✅

| Feature | Details |
|---|---|
| **Event Types Management** | Create, edit, delete event types with title, description, duration, slug, color, and buffer times |
| **Availability Settings** | Day-of-week toggles, start/end time pickers, timezone selector |
| **Public Booking Page** | Calendar view, available time slots, booking form, conflict prevention |
| **Booking Confirmation** | Dedicated confirmation page with event details and calendar invitations |
| **Bookings Dashboard** | Tabs for upcoming/past/cancelled, cancel functionality, and stats |
| **Unique Public Links** | Every event type gets `/book/{slug}` |

### Bonus Features

- ✅ **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewports
- ✅ **Cal.com Aesthetics**: Pixel-perfect replication of Cal.com v6.3 design
- ✅ **Custom Questions**: Support for arbitrary form fields per event type
- ✅ **Email Notifications**: Real-time notifications for both bookers and admins (Gmail SMTP)
- ✅ **Availability Overrides**: Block off specific dates or set custom hours for single days
- ✅ **Rescheduling**: Built-in support for rescheduling existing bookings
- ✅ **Conflict Prevention**: Intelligent slot calculation considering existing bookings and buffer times

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, TypeScript) |
| **Frontend** | React 19, Vanilla CSS (custom design system) |
| **Backend** | Next.js API Routes (Route Handlers) |
| **Database** | MySQL (Connection pooling, auto-schema initialization) |
| **Email** | Nodemailer (Gmail App Password integration) |
| **Deployment** | Vercel (Frontend), Railway (MySQL Database) |

---

## 🗃️ Database Schema

The application uses a relational MySQL schema with the following structure:

### `users`
Stores user profile information and global settings.
- `id`: Primary Key (AUTO_INCREMENT)
- `name`: User's display name
- `username`: Unique handle used for public profile URLs
- `email`: Primary contact email
- `avatar`: URL to profile image
- `timezone`: Primary timezone for the user
- `created_at`: Timestamp

### `event_types`
Configurable meeting types available for booking.
- `id`: Primary Key (AUTO_INCREMENT)
- `user_id`: Reference to owner user
- `title`: Event name (e.g., "30 Minute Meeting")
- `slug`: Unique URL segment for booking links
- `description`: Detailed text shown to bookers
- `duration`: Meeting length in minutes
- `location`: Meeting destination (Zoom, Google Meet, In-person, etc.)
- `color`: Hex color used for UI branding
- `is_active`: Toggle to enable/disable public booking
- `buffer_time`: Cool-down period before/after meetings
- `custom_questions`: JSON field for additional form fields
- `created_at`: Timestamp

### `availability` & `availability_days`
Hierarchical availability system.
- `availability`: Container for a named schedule (e.g., "Working Hours")
- `availability_days`: Per-weekday settings (day, start_time, end_time, enabled)

### `date_overrides`
Custom availability for specific calendar dates.
- `id`: Primary Key
- `date`: Specific calendar date
- `is_blocked`: Toggle to mark date as completely unavailable
- `start_time` / `end_time`: Custom hours for that specific date

### `bookings`
Record of scheduled meetings.
- `id`: Primary Key
- `uid`: Unique public identifier used for secure confirmation links
- `event_type_id`: Linked event configuration
- `booker_name` / `booker_email`: Guest details
- `start_time` / `end_time`: Scheduled window
- `status`: Lifecycle state (`upcoming`, `cancelled`, `past`)
- `answers`: JSON record of custom question responses
- `rescheduled_from`: UID of previous booking if this was a reschedule
- `notes`: Additional meeting information

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9
- A running MySQL instance (Local or Hosted)

### 1. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Database Connection
MYSQL_URL=mysql://user:pass@host:port/database

# Email Configuration (Nodemailer)
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-16-digit-app-password
ADMIN_EMAIL=your-admin-email@gmail.com
```

### 2. Installations & Execution

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will automatically perform database migrations and seed default data on the first successful connection.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page (High-fidelity replica)
│   ├── book/[slug]/                # Public booking flow
│   ├── [username]/                 # User public profile
│   └── dashboard/                  # Management interface
├── api/                            # Backend API Routes
│   ├── availability/               # Schedule management
│   ├── bookings/                   # Booking CRUD & Cancellation
│   ├── event-types/                # Event configuration
│   └── slots/                      # Intelligent slot availability logic
├── lib/
│   ├── db2.ts                      # MySQL connection pool & schema init
│   └── email.ts                    # Nodemailer transport & templates
└── components/
    ├── Sidebar.tsx                 # Responsive navigation
    └── HomeMockup.tsx              # Animated landing page mockup
```

---

## ⚙️ Key Technical Implementations

1. **Conflict Resolution**: The `api/slots` route calculates real-time availability by cross-referencing global availability, weekday settings, date overrides, and existing bookings.
2. **Serverless Emailing**: All email triggers in API routes are `awaited` to ensure delivery in edge/lambda environments before response termination.
3. **Mobile Optimization**: Custom CSS system implemented without heavy frameworks to ensure sub-second load times and 100% responsiveness on all mobile viewports.
4. **Schema Evolution**: The `db2.ts` library implements automatic column-level migrations to ensure database parity during deployment cycles.
