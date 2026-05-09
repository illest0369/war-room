# Supabase Setup Guide

WAR ROOM uses Supabase as its primary database. This guide walks through the setup process.

## Prerequisites

- Supabase account (https://supabase.com)
- A Supabase project created

## Environment Variables

Add the following to your `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

You can find these values in your Supabase project settings:
1. Go to Settings > API
2. Copy the Project URL and anon/public key
3. Copy the service_role key (keep this secret, never expose in client code)

## Database Schema Setup

### Option 1: Using SQL Editor (Recommended)

1. Go to your Supabase project
2. Click "SQL Editor" in the sidebar
3. Click "New Query"
4. Copy the entire contents of `lib/supabase/schema.sql`
5. Paste into the SQL editor
6. Click "Run"

### Option 2: Using Supabase CLI

```bash
supabase db pull  # Pull existing schema
# Edit files as needed
supabase db push  # Push schema to production
```

## Tables

### Projects
- `id` (UUID, primary key)
- `title` (VARCHAR, required)
- `description` (TEXT, optional)
- `status` (ENUM: active, on-hold, completed, archived)
- `priority` (ENUM: high, medium, low)
- `owner_id` (UUID, required)
- `created_at` / `updated_at` (TIMESTAMP)

### Tasks
- `id` (UUID, primary key)
- `title` (VARCHAR, required)
- `description` (TEXT)
- `status` (ENUM: todo, in-progress, review, completed)
- `priority` (ENUM: high, medium, low)
- `project_id` (UUID, foreign key to projects)
- `assignee_id` (UUID, optional)
- `due_date` (DATE, optional)
- `created_at` / `updated_at` (TIMESTAMP)

### Agents
- `id` (UUID, primary key)
- `name` (VARCHAR, required)
- `description` (TEXT)
- `type` (VARCHAR)
- `status` (ENUM: active, inactive)
- `config` (JSONB, flexible config storage)
- `created_at` / `updated_at` (TIMESTAMP)

### Journal Entries
- `id` (UUID, primary key)
- `title` (VARCHAR, required)
- `content` (TEXT, required)
- `tags` (TEXT array)
- `created_at` / `updated_at` (TIMESTAMP)

### Content Items
- `id` (UUID, primary key)
- `title` (VARCHAR, required)
- `content` (TEXT)
- `status` (ENUM: draft, published, archived)
- `type` (VARCHAR)
- `created_at` / `updated_at` (TIMESTAMP)

### Knowledge Items
- `id` (UUID, primary key)
- `title` (VARCHAR, required)
- `content` (TEXT, required)
- `category` (VARCHAR, required)
- `tags` (TEXT array)
- `created_at` / `updated_at` (TIMESTAMP)

## Row Level Security (RLS)

For production, enable Row Level Security:

1. Go to Authentication > Policies
2. Enable RLS for each table
3. Create policies for your use case:

```sql
-- Allow users to read their own projects
CREATE POLICY "Users can view their own projects"
  ON projects FOR SELECT
  USING (owner_id = auth.uid());

-- Allow users to create projects
CREATE POLICY "Users can create projects"
  ON projects FOR INSERT
  WITH CHECK (owner_id = auth.uid());
```

## Using the Supabase Client

### In Client Components

```typescript
import { supabase, getProjects } from '@/lib/supabase'

// Fetch projects
const projects = await getProjects()

// Create a project
const newProject = await createProject({
  title: 'New Project',
  status: 'active',
  priority: 'high',
  owner_id: userId
})

// Update a project
await updateProject(projectId, { status: 'completed' })

// Delete a project
await deleteProject(projectId)
```

### In API Routes

```typescript
import { getServerSupabaseClient } from '@/lib/supabase'

export async function GET(request: Request) {
  const supabase = getServerSupabaseClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')

  if (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }

  return Response.json(data)
}
```

## Tips

- Use the Supabase Studio UI to inspect data and test queries
- Enable real-time subscriptions for live updates
- Use PostgREST API for complex queries
- Enable backup strategy in project settings
- Monitor storage usage and API requests
