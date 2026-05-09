import { notion, databases } from './client'
import {
  Project,
  Task,
  Agent,
  JournalEntry,
  ContentItem,
  KnowledgeItem,
  PaginatedResponse,
  NotionPage,
} from './types'
import {
  pageToProject,
  pageToTask,
  pageToAgent,
  pageToJournalEntry,
  pageToContentItem,
  pageToKnowledgeItem,
} from './helpers'

// Generic query function using Notion API
async function queryDatabase<T>(
  databaseId: string,
  mapper: (page: NotionPage) => T,
  filter?: any,
  sorts?: any,
  pageSize: number = 100
): Promise<PaginatedResponse<T>> {
  const response = await fetch(
    `https://api.notion.com/v1/databases/${databaseId}/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter,
        sorts,
        page_size: pageSize,
      }),
    }
  )

  if (!response.ok) {
    throw new Error(`Notion API error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()

  return {
    items: data.results.map((page: NotionPage) => mapper(page)),
    total: data.results.length,
    nextCursor: data.next_cursor || undefined,
  }
}

// Retrieve page by ID using Notion API
async function getPage(pageId: string): Promise<NotionPage | null> {
  try {
    const response = await fetch(
      `https://api.notion.com/v1/pages/${pageId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
        },
      }
    )

    if (!response.ok) return null
    return (await response.json()) as NotionPage
  } catch {
    return null
  }
}

// Projects
export async function getProjects(): Promise<PaginatedResponse<Project>> {
  return queryDatabase(databases.projects!, pageToProject)
}

export async function getProject(id: string): Promise<Project | null> {
  const page = await getPage(id)
  return page ? pageToProject(page) : null
}

// Tasks
export async function getTasks(
  filter?: { status?: string; priority?: string; owner?: string }
): Promise<PaginatedResponse<Task>> {
  let notionFilter: any = undefined

  if (filter) {
    const conditions = []
    if (filter.status) {
      conditions.push({
        property: 'Status',
        select: { equals: filter.status },
      })
    }
    if (filter.priority) {
      conditions.push({
        property: 'Priority',
        select: { equals: filter.priority },
      })
    }
    notionFilter = conditions.length > 0 ? { and: conditions } : undefined
  }

  return queryDatabase(databases.tasks!, pageToTask, notionFilter, [
    { property: 'Due Date', direction: 'ascending' },
  ])
}

export async function getTask(id: string): Promise<Task | null> {
  const page = await getPage(id)
  return page ? pageToTask(page) : null
}

// Agents
export async function getAgents(): Promise<PaginatedResponse<Agent>> {
  return queryDatabase(databases.agents!, pageToAgent)
}

export async function getAgent(id: string): Promise<Agent | null> {
  const page = await getPage(id)
  return page ? pageToAgent(page) : null
}

// Journal Entries
export async function getJournalEntries(): Promise<PaginatedResponse<JournalEntry>> {
  return queryDatabase(databases.journal!, pageToJournalEntry, undefined, [
    { property: 'Date', direction: 'descending' },
  ])
}

export async function getJournalEntry(id: string): Promise<JournalEntry | null> {
  const page = await getPage(id)
  return page ? pageToJournalEntry(page) : null
}

export async function searchJournalEntries(query: string): Promise<PaginatedResponse<JournalEntry>> {
  return queryDatabase(
    databases.journal!,
    pageToJournalEntry,
    {
      or: [
        {
          property: 'Title',
          rich_text: {
            contains: query,
          },
        },
        {
          property: 'Content',
          rich_text: {
            contains: query,
          },
        },
      ],
    },
    [{ property: 'Date', direction: 'descending' }]
  )
}

// Content
export async function getContentQueue(
  status?: string
): Promise<PaginatedResponse<ContentItem>> {
  const filter = status
    ? {
        property: 'Status',
        select: { equals: status },
      }
    : undefined

  return queryDatabase(databases.content!, pageToContentItem, filter, [
    { property: 'Scheduled Date', direction: 'ascending' },
  ])
}

export async function getContentItem(id: string): Promise<ContentItem | null> {
  const page = await getPage(id)
  return page ? pageToContentItem(page) : null
}

// Knowledge Base
export async function getKnowledgeItems(
  category?: string
): Promise<PaginatedResponse<KnowledgeItem>> {
  const filter = category
    ? {
        property: 'Category',
        select: { equals: category },
      }
    : undefined

  return queryDatabase(databases.knowledge!, pageToKnowledgeItem, filter)
}

export async function getKnowledgeItem(id: string): Promise<KnowledgeItem | null> {
  const page = await getPage(id)
  return page ? pageToKnowledgeItem(page) : null
}

export async function searchKnowledge(query: string): Promise<PaginatedResponse<KnowledgeItem>> {
  return queryDatabase(
    databases.knowledge!,
    pageToKnowledgeItem,
    {
      or: [
        {
          property: 'Title',
          rich_text: {
            contains: query,
          },
        },
        {
          property: 'Content',
          rich_text: {
            contains: query,
          },
        },
        {
          property: 'Tags',
          multi_select: {
            contains: query,
          },
        },
      ],
    }
  )
}
