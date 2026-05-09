import { NotionPage, Project, Task, Agent, JournalEntry, ContentItem, KnowledgeItem } from './types'

// Helper to extract text from Notion rich text array
export function extractText(richText?: Array<{ plain_text?: string }>): string {
  if (!richText) return ''
  return richText.map((block) => block.plain_text || '').join('')
}

// Helper to extract property value from Notion page
export function getProperty(page: NotionPage, propertyName: string): any {
  const properties = page.properties as Record<string, any>
  const property = properties[propertyName]

  if (!property) return null

  switch (property.type) {
    case 'title':
      return extractText(property.title)
    case 'rich_text':
      return extractText(property.rich_text)
    case 'checkbox':
      return property.checkbox
    case 'select':
      return property.select?.name
    case 'multi_select':
      return property.multi_select?.map((item: any) => item.name) || []
    case 'date':
      return property.date?.start ? new Date(property.date.start) : null
    case 'number':
      return property.number
    case 'email':
      return property.email
    case 'url':
      return property.url
    case 'relation':
      return property.relation?.map((item: any) => item.id) || []
    default:
      return null
  }
}

// Map Notion page to Project
export function pageToProject(page: NotionPage): Project {
  return {
    id: page.id,
    title: getProperty(page, 'Title') || 'Untitled',
    status: getProperty(page, 'Status') || 'planning',
    description: getProperty(page, 'Description'),
    owner: getProperty(page, 'Owner'),
    kpis: getProperty(page, 'KPIs') || [],
    linkedTasks: getProperty(page, 'Tasks') || [],
    linkedDocuments: getProperty(page, 'Documents') || [],
    linkedAgents: getProperty(page, 'Agents') || [],
    createdAt: new Date(page.created_time),
    updatedAt: new Date(page.last_edited_time),
  }
}

// Map Notion page to Task
export function pageToTask(page: NotionPage): Task {
  return {
    id: page.id,
    title: getProperty(page, 'Title') || 'Untitled',
    description: getProperty(page, 'Description'),
    status: getProperty(page, 'Status') || 'todo',
    priority: getProperty(page, 'Priority') || 'medium',
    owner: getProperty(page, 'Owner'),
    dueDate: getProperty(page, 'Due Date'),
    projectId: getProperty(page, 'Project')?.[0],
    createdAt: new Date(page.created_time),
    updatedAt: new Date(page.last_edited_time),
  }
}

// Map Notion page to Agent
export function pageToAgent(page: NotionPage): Agent {
  return {
    id: page.id,
    name: getProperty(page, 'Name') || 'Unnamed Agent',
    role: getProperty(page, 'Role') || '',
    description: getProperty(page, 'Description'),
    status: getProperty(page, 'Status') || 'inactive',
    currentTasks: getProperty(page, 'Current Tasks') || [],
    outputs: getProperty(page, 'Outputs') || [],
    approvalsNeeded: getProperty(page, 'Approvals Needed') || false,
    createdAt: new Date(page.created_time),
    updatedAt: new Date(page.last_edited_time),
  }
}

// Map Notion page to JournalEntry
export function pageToJournalEntry(page: NotionPage): JournalEntry {
  return {
    id: page.id,
    date: getProperty(page, 'Date') || new Date(),
    title: getProperty(page, 'Title'),
    content: getProperty(page, 'Content') || '',
    isPrivate: getProperty(page, 'Private') || true,
    tags: getProperty(page, 'Tags') || [],
    createdAt: new Date(page.created_time),
    updatedAt: new Date(page.last_edited_time),
  }
}

// Map Notion page to ContentItem
export function pageToContentItem(page: NotionPage): ContentItem {
  return {
    id: page.id,
    title: getProperty(page, 'Title') || 'Untitled',
    type: getProperty(page, 'Type') || 'other',
    status: getProperty(page, 'Status') || 'ideation',
    content: getProperty(page, 'Content'),
    scheduledDate: getProperty(page, 'Scheduled Date'),
    createdAt: new Date(page.created_time),
    updatedAt: new Date(page.last_edited_time),
  }
}

// Map Notion page to KnowledgeItem
export function pageToKnowledgeItem(page: NotionPage): KnowledgeItem {
  return {
    id: page.id,
    title: getProperty(page, 'Title') || 'Untitled',
    category: getProperty(page, 'Category') || 'other',
    content: getProperty(page, 'Content') || '',
    tags: getProperty(page, 'Tags') || [],
    searchable: getProperty(page, 'Searchable') !== false,
    createdAt: new Date(page.created_time),
    updatedAt: new Date(page.last_edited_time),
  }
}
