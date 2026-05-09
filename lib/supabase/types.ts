export interface Project {
  id: string
  title: string
  description?: string
  status: 'active' | 'on-hold' | 'completed' | 'archived'
  priority: 'high' | 'medium' | 'low'
  owner_id: string
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  title: string
  description?: string
  status: 'todo' | 'in-progress' | 'review' | 'completed'
  priority: 'high' | 'medium' | 'low'
  project_id?: string
  assignee_id?: string
  due_date?: string
  created_at: string
  updated_at: string
}

export interface Agent {
  id: string
  name: string
  description?: string
  type: string
  status: 'active' | 'inactive'
  config?: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface JournalEntry {
  id: string
  title: string
  content: string
  tags?: string[]
  created_at: string
  updated_at: string
}

export interface ContentItem {
  id: string
  title: string
  content?: string
  status: 'draft' | 'published' | 'archived'
  type: string
  created_at: string
  updated_at: string
}

export interface KnowledgeItem {
  id: string
  title: string
  content: string
  category: string
  tags?: string[]
  created_at: string
  updated_at: string
}
