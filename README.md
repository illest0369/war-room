# WAR ROOM - Founder Command Center

A production-grade founder operating system built with Next.js 15, TypeScript, TailwindCSS, and Notion API integration.

**WAR ROOM** is your private executive command center for high-performance founders—combining strategic planning, execution tracking, business operations, AI agent coordination, and rapid decision systems in one elegant dashboard.

## Features

✨ **Modern Dashboard**
- Real-time metrics and KPI tracking
- Beautiful data visualization with Recharts
- Smooth animations powered by Framer Motion
- Responsive design for desktop, tablet, and mobile

🧠 **Notion Integration**
- Full Notion API integration for data persistence
- Typed database queries and CRUD operations
- Support for Projects, Tasks, Agents, Journal, Content, Knowledge base, and more

🎨 **Premium Design**
- Clean, modern light theme with bright accent colors
- Soft shadows and rounded corners (2xl)
- Startup-grade UI inspired by Linear, Vercel, and Arc Browser
- Carefully tuned color palette (coral, pink, gold, purple)

⚡ **Enterprise Ready**
- TypeScript for type safety
- shadcn/ui components
- Zustand for state management (ready to integrate)
- React Hook Form + Zod for validation
- Next.js API routes and server actions
- Ready for Vercel deployment

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Notion workspace with API access

### Installation

```bash
# Clone the repository
cd war-room

# Install dependencies
npm install

# Configure Notion
# 1. Create Notion integration at https://www.notion.so/my-integrations
# 2. Copy the API key
# 3. Create or connect to Notion databases

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your Notion API key and database IDs

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
war-room/
├── app/
│   ├── dashboard/              # Main dashboard pages
│   ├── api/                    # API routes for Notion CRUD
│   └── layout.tsx              # Root layout
├── components/
│   ├── layout/                 # Header, Sidebar
│   ├── dashboard/              # Dashboard cards & components
│   └── ui/                     # shadcn/ui components
├── lib/
│   ├── notion/                 # Notion SDK & CRUD operations
│   │   ├── client.ts           # Notion API client
│   │   ├── types.ts            # TypeScript interfaces
│   │   ├── helpers.ts          # Property mapping
│   │   └── queries.ts          # Database queries
│   └── utils.ts                # Utilities
├── store/                      # Zustand stores (coming)
├── types/                      # Global types
└── .env.example                # Environment template
```

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4 + custom design tokens
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **State**: Zustand (configured, ready to use)
- **Data Viz**: Recharts
- **Backend**: Next.js API routes + Notion API
- **Deployment**: Vercel

## Development

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

### Linting

```bash
npm run lint
```

## Environment Variables

See [SETUP.md](./SETUP.md) for detailed Notion configuration instructions.

Required variables:
```
NOTION_API_KEY
NOTION_PROJECTS_DB
NOTION_TASKS_DB
NOTION_AGENTS_DB
NOTION_JOURNAL_DB
NOTION_CONTENT_DB
NOTION_KNOWLEDGE_DB
```

## Design System

**Colors**
- Primary: `oklch(0.12 0 0)` (dark)
- Accent Purple: `oklch(0.65 0.2 280)`
- Accent Coral: `oklch(0.65 0.2 30)`
- Accent Pink: `oklch(0.68 0.2 340)`
- Accent Gold: `oklch(0.7 0.15 70)`

**Typography**
- Headings: Bold with tight tracking
- Body: Medium for hierarchy
- Font family: System sans-serif (Geist)

**Components**
- Cards: `.card-elevated` (rounded 2xl, soft shadow)
- Spacing: TailwindCSS scale with custom variables
- Transitions: All changes at 200ms duration

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

```bash
git init
git add .
git commit -m "Initial WAR ROOM setup"
git remote add origin https://github.com/username/war-room
git push -u origin main
```

See [SETUP.md](./SETUP.md) for detailed deployment instructions.

## Next Steps

- [ ] Configure all Notion databases with proper schemas
- [ ] Build comprehensive CRUD operations for all data types
- [ ] Implement remaining dashboard sections (War Room, Projects, Agents, Content)
- [ ] Integrate Zustand for client state management
- [ ] Add form pages for creating and editing items
- [ ] Implement authentication (Clerk or Auth.js)
- [ ] Add E2E tests with Playwright
- [ ] Deploy to Vercel

## Documentation

- [Setup Guide](./SETUP.md) - Notion configuration and deployment
- [Next.js Docs](https://nextjs.org/docs)
- [Notion API Docs](https://developers.notion.com/reference)

## License

Built with ❤️ for founders.

---

*WAR ROOM: Your private executive command center for high-performance founders.*
