import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

// Project
export interface Project {
  id: string
  title: string
  status: 'active' | 'completed' | 'paused' | 'planning'
  description?: string
  owner?: string
  kpis?: string[]
  linkedTasks?: string[]
  linkedDocuments?: string[]
  linkedAgents?: string[]
  createdAt: Date
  updatedAt: Date
}

// Task
export interface Task {
  id: string
  title: string
  description?: string
  status: 'todo' | 'in_progress' | 'done'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  owner?: string
  dueDate?: Date
  projectId?: string
  createdAt: Date
  updatedAt: Date
}

// AI Agent
export interface Agent {
  id: string
  name: string
  role: string
  description?: string
  status: 'active' | 'inactive' | 'testing'
  currentTasks?: string[]
  outputs?: string[]
  approvalsNeeded?: boolean
  createdAt: Date
  updatedAt: Date
}

// Journal Entry
export interface JournalEntry {
  id: string
  date: Date
  title?: string
  content: string
  isPrivate: boolean
  tags?: string[]
  createdAt: Date
  updatedAt: Date
}

// Content Queue Item
export interface ContentItem {
  id: string
  title: string
  type: 'blog' | 'video' | 'tweet' | 'email' | 'other'
  status: 'ideation' | 'draft' | 'review' | 'approved' | 'published'
  content?: string
  scheduledDate?: Date
  createdAt: Date
  updatedAt: Date
}

// Knowledge Base Item
export interface KnowledgeItem {
  id: string
  title: string
  category: 'sop' | 'prompt' | 'framework' | 'strategic_doc' | 'other'
  content: string
  tags?: string[]
  searchable: boolean
  createdAt: Date
  updatedAt: Date
}

// Notion Page Props
export type NotionPage = PageObjectResponse

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  meta?: {
    total?: number
    page?: number
    limit?: number
  }
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  nextCursor?: string
}
