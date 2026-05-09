import { Client } from '@notionhq/client'

export const notion = new Client({
  auth: process.env.NOTION_API_KEY || 'placeholder',
})

// Database IDs
export const databases = {
  projects: process.env.NOTION_PROJECTS_DB,
  tasks: process.env.NOTION_TASKS_DB,
  agents: process.env.NOTION_AGENTS_DB,
  journal: process.env.NOTION_JOURNAL_DB,
  content: process.env.NOTION_CONTENT_DB,
  knowledge: process.env.NOTION_KNOWLEDGE_DB,
  strategy: process.env.NOTION_STRATEGY_DB,
  meetings: process.env.NOTION_MEETINGS_DB,
  metrics: process.env.NOTION_METRICS_DB,
  opportunities: process.env.NOTION_OPPORTUNITIES_DB,
} as const
