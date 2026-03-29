# Schedulo - Cal.com Clone

A high-fidelity, full-stack scheduling platform inspired by Cal.com. Built as part of the SDE Intern Fullstack Assignment.

## 🚀 Live Demo
- **URL:** https://calclone21-swart.vercel.app/
- **GitHub:** [https://github.com/SoumilLathey/cal.com_clone](https://github.com/SoumilLathey/cal.com_clone)

---

## ✨ Features

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

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router), [React 19](https://react.dev/), [Lucide React](https://lucide.dev/).
- **Styling:** Vanilla CSS with modern Flexbox/Grid layouts & native CSS variables.
- **Backend:** Next.js API Routes (Serverless).
- **Database:** [MySQL](https://www.mysql.com/) hosted on [Railway](https://railway.app/) for production (schema auto-init enabled).
- **Emailing:** [Nodemailer](https://nodemailer.com/) with Gmail SMTP integration.
- **Deployment:** [Vercel](https://vercel.com/) (Frontend/API) + [Railway](https://railway.app/) (Database).

---

## 📊 Database Schema

The application uses a relational MySQL schema designed for high-performance scheduling queries.

### 1. `users`
Stores account information.
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

---

## ⚙️ Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SoumilLathey/cal.com_clone.git
   cd schedulo
   ```

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
   The application automatically runs schema initialization and seeding on startup (see `src/lib/db2.ts`).

5. **Run Development Server:**
   ```bash
   npm run dev
   ```

---

## 💡 Assumptions Made
- **Authentication:** As per the requirement, "No Login Required" for the admin side. The app assumes a default primary user (Demo User) for the dashboard.
- **Email Delivery:** Assumes a valid Gmail App Password is provided for the Nodemailer transport to function.
- **Deployment environment:** Optimized for Vercel Serverless functions, including proper `await` handling for async operations like database calls and email dispatch.
