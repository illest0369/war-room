# WAR ROOM - Setup & Deployment Guide

## Overview

WAR ROOM is a production-grade founder operating system dashboard built with Next.js 15, TypeScript, and Notion API integration.

## Project Structure

```
war-room/
├── app/
│   ├── dashboard/              # Main dashboard layout & pages
│   ├── api/                    # API routes for Notion integration
│   └── globals.css             # Global styling & design tokens
├── components/
│   ├── layout/                 # Header & Sidebar components
│   ├── dashboard/              # Dashboard card components
│   └── ui/                     # shadcn/ui components
├── lib/
│   ├── notion/                 # Notion SDK integration & CRUD operations
│   └── utils.ts                # Utility functions
├── store/                      # Zustand state management (coming soon)
├── types/                      # TypeScript type definitions
├── hooks/                      # Custom React hooks
└── styles/                     # Additional stylesheets
```

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn
- A Notion workspace with API access

## Local Development Setup

### 1. Clone and Install

```bash
cd war-room
npm install
```

### 2. Create Notion Integration

1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Create a new internal integration
3. Copy the API key
4. Grant the integration access to your workspace databases

### 3. Create Notion Databases

Create the following databases in your Notion workspace:

- **Projects** - Project tracking
- **Tasks** - Task management
- **Agents** - AI agent coordination
- **Journal** - Founder journaling
- **Content** - Content pipeline management
- **Knowledge** - Knowledge base & SOPs
- **Strategy** - Strategic documents
- **Meetings** - Meeting notes
- **Metrics** - KPI tracking
- **Opportunities** - Opportunity tracking

For each database, add these core properties:
- `Title` (Text)
- `Description` (Rich Text)
- `Status` (Select)
- `Created` (Date)
- `Updated` (Date)

### 4. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Update `.env.local` with your Notion credentials:

```
NOTION_API_KEY=your_api_key_here

NOTION_PROJECTS_DB=your_database_id
NOTION_TASKS_DB=your_database_id
NOTION_AGENTS_DB=your_database_id
NOTION_JOURNAL_DB=your_database_id
NOTION_CONTENT_DB=your_database_id
NOTION_KNOWLEDGE_DB=your_database_id
NOTION_STRATEGY_DB=your_database_id
NOTION_MEETINGS_DB=your_database_id
NOTION_METRICS_DB=your_database_id
NOTION_OPPORTUNITIES_DB=your_database_id
```

To get database IDs:
1. Open the database in Notion
2. Copy the database ID from the URL
3. Format: `https://notion.so/{database_id}?v=...`

### 5. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Building for Production

```bash
npm run build
npm start
```

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **TailwindCSS v4** - Styling with custom design tokens
- **shadcn/ui** - Component library
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Zustand** - State management (ready to integrate)
- **Recharts** - Data visualization

### Backend
- **Next.js API Routes** - Serverless backend
- **Notion API SDK** - Database operations
- **TypeScript** - Type-safe backend code

### Deployment
- **Vercel** - Recommended deployment platform

## Notion Integration Architecture

### Client Layer
`lib/notion/client.ts` - Initializes the Notion client and database references

### Type Layer
`lib/notion/types.ts` - TypeScript interfaces for all data models

### Helper Layer
`lib/notion/helpers.ts` - Functions to map Notion pages to typed objects

### Query Layer
`lib/notion/queries.ts` - Database queries and search operations

### API Routes
`app/api/` - Next.js API endpoints for CRUD operations

## Available API Endpoints

### Projects
- `GET /api/projects` - List all projects
- `GET /api/projects?id={id}` - Get a specific project

### Tasks (Coming Soon)
- `GET /api/tasks` - List tasks with filters
- `POST /api/tasks` - Create new task
- `PATCH /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task

### Journal (Coming Soon)
- `GET /api/journal` - List journal entries
- `POST /api/journal` - Create entry
- `GET /api/journal/search?q={query}` - Search entries

## Deployment to Vercel

### Prerequisites
- Vercel account
- GitHub repository (for automatic deployments)

### Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: WAR ROOM setup"
   git branch -M main
   git remote add origin https://github.com/username/war-room.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New... Project"
   - Select your GitHub repository
   - Add environment variables
   - Deploy

3. **Set Environment Variables**
   In Vercel project settings, add all variables from `.env.example`

### Production Environment

Vercel will automatically:
- Build and optimize your Next.js app
- Deploy to CDN
- Enable edge caching
- Provide SSL/TLS

## Design System

### Colors

- **Primary**: Deep dark for navigation (`oklch(0.12 0 0)`)
- **Accents**: 
  - Purple: `oklch(0.65 0.2 280)`
  - Coral: `oklch(0.65 0.2 30)`
  - Pink: `oklch(0.68 0.2 340)`
  - Gold: `oklch(0.7 0.15 70)`

### Typography

- **Font**: System sans-serif (inherited from Geist)
- **Headings**: Bold with tight tracking
- **Body**: Medium weight for hierarchy

### Components

All components use `card-elevated` class for consistent styling:
- Rounded 2xl corners
- Soft shadow
- Smooth hover transitions
- Light theme

## Performance Optimization

- Image optimization via Next.js Image component
- CSS minification and tree-shaking
- Code splitting per route
- Automatic static optimization
- Vercel Edge Caching

## Security

- Environment variables never exposed to client
- API routes validate Notion database access
- Type safety prevents injection attacks
- CORS-friendly API design

## Troubleshooting

### Notion Connection Issues

1. **"NOTION_API_KEY not set"**
   - Check `.env.local` file exists
   - Verify API key is correct
   - Restart dev server

2. **"Database not found"**
   - Verify database IDs in `.env.local`
   - Check integration has access to database
   - Copy database ID directly from Notion URL

3. **"Cannot connect to Notion"**
   - Check internet connection
   - Verify API key is still valid
   - Check Notion API status

### Build Issues

1. **TypeScript errors**
   ```bash
   npm run build
   ```
   Check error output and verify types

2. **Missing dependencies**
   ```bash
   npm install
   npm cache clean --force
   npm install
   ```

## Next Steps

1. **Configure all Notion databases** with proper schemas
2. **Create comprehensive CRUD API endpoints** for each data type
3. **Build out remaining dashboard sections** (War Room, Projects, Agents, etc.)
4. **Integrate Zustand** for client-side state management
5. **Add form pages** for creating/editing items
6. **Implement authentication** (recommend Clerk or Auth.js)
7. **Add comprehensive testing** (E2E with Playwright)
8. **Deploy to Vercel** with production domain

## Support & Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Notion API Docs](https://developers.notion.com/reference)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)

## License

Built with ❤️ for founders.
