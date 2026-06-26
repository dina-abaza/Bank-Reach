# BankReach — منصة التواصل البنكي

**BankReach** is an Arabic-first banking communication dashboard that enables bank staff to manage customers, create message templates, and run targeted WhatsApp campaigns — all with real-time progress tracking via WebSocket.

---

## Features

- **Dashboard** — Unified overview of customers, templates, campaigns, message delivery rates, and campaign performance
- **Customer Management** — Browse, search, and filter customers by group (compliant / late / defaulted / transferred); bulk import via Excel
- **Message Templates** — Create and delete reusable WhatsApp message templates with dynamic variables (e.g. `{{fullName}}`, `{{overdueDays}}`)
- **Campaigns** — Create, edit, trigger, and delete targeted campaigns per customer group; full lifecycle management (draft → scheduled → running → completed)
- **Real-time Updates** — Live campaign progress bar and status updates powered by WebSocket (Socket.IO)
- **Arabic UI** — Fully Arabic interface with RTL layout, Arabic-Eastern numerals (`ar-EG` locale), and responsive design across all screen sizes

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.9 (App Router, Turbopack) |
| UI Library | React 19.2.4 |
| Styling | Tailwind CSS 4 (RTL) |
| HTTP Client | Axios 1.x (with auth interceptors) |
| Real-time | Socket.IO Client 4.8.3 |
| Backend API | REST + WebSocket — Auto Teller Backend |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/your-username/Bank-Reach.git
cd Bank-Reach
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url/api/v1
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## Project Structure

```
Bank-Reach/
├── app/
│   ├── (auth)/
│   │   └── login/               # Login page
│   └── (dashboard)/
│       ├── layout.js            # Dashboard shell (sidebar + mobile nav)
│       ├── dashboard/           # Main dashboard with stats & reports
│       ├── customers/           # Customer list + Excel import
│       ├── templates/           # Message template management
│       └── campaigns/           # Campaign lifecycle management
├── components/
│   ├── layout/                  # Sidebar, Header
│   ├── ui/                      # Button, Card, Modal, Table, Pagination...
│   ├── campaigns/               # CampaignCard, CampaignForm, StatusBadge
│   ├── customers/               # CustomerTable, ImportExcelModal
│   ├── dashboard/               # StatsRow, MessageStatsCard, PerformanceTable
│   └── templates/               # TemplateCard, TemplateForm
├── hooks/
│   ├── use-auth.js              # Login / logout
│   ├── use-campaigns.js         # Campaigns CRUD + socket update handler
│   ├── use-customers.js         # Customers fetch + pagination
│   ├── use-templates.js         # Templates CRUD
│   └── use-campaign-socket.js   # WebSocket hook for live updates
├── services/
│   ├── campaigns.service.js
│   ├── customers.service.js
│   └── templates.service.js
└── lib/
    ├── api.js                   # Axios instance + parsePaginatedResponse
    └── socket.js                # Socket.IO singleton
```

---

## API Integration

All API calls go through `lib/api.js` which:

- Automatically injects `Authorization: Bearer <token>` on every request
- Redirects to `/login` on any `401` response
- Normalises paginated responses via `parsePaginatedResponse()` into a consistent `{ data, pagination }` shape

---

## Real-time Campaign Tracking

When a campaign is triggered, the frontend connects via WebSocket and listens to three events:

| Event | Purpose |
|---|---|
| `campaign-update` | Status change for a specific campaign |
| `campaign-global-update` | Broadcast status change across all campaigns |
| `campaign-stats` | Live progress (processed / sent / failed counts) |

Progress is reflected immediately in the campaign card without a full page refresh.

---

## License

Private project — all rights reserved.
