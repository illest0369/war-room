import { create } from 'zustand'
import type { ContentItem } from '@/lib/notion'

interface ContentState {
  contentItems: ContentItem[]
  selectedContent: ContentItem | null
  isLoading: boolean
  error: string | null

  setContentItems: (items: ContentItem[]) => void
  selectContent: (item: ContentItem | null) => void
  addContentItem: (item: ContentItem) => void
  updateContentItem: (id: string, updates: Partial<ContentItem>) => void
  removeContentItem: (id: string) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
}

export const useContentStore = create<ContentState>((set) => ({
  contentItems: [],
  selectedContent: null,
  isLoading: false,
  error: null,

  setContentItems: (items) => set({ contentItems: items }),

  selectContent: (item) => set({ selectedContent: item }),

  addContentItem: (item) => set((state) => ({
    contentItems: [...state.contentItems, item]
  })),

  updateContentItem: (id, updates) => set((state) => ({
    contentItems: state.contentItems.map((c) =>
      c.id === id ? { ...c, ...updates } : c
    ),
    selectedContent: state.selectedContent?.id === id
      ? { ...state.selectedContent, ...updates }
      : state.selectedContent
  })),

  removeContentItem: (id) => set((state) => ({
    contentItems: state.contentItems.filter((c) => c.id !== id),
    selectedContent: state.selectedContent?.id === id ? null : state.selectedContent
  })),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error })
}))
