import { create } from 'zustand'
import type { KnowledgeItem } from '@/lib/notion'

interface KnowledgeState {
  knowledgeItems: KnowledgeItem[]
  selectedKnowledge: KnowledgeItem | null
  isLoading: boolean
  error: string | null

  setKnowledgeItems: (items: KnowledgeItem[]) => void
  selectKnowledge: (item: KnowledgeItem | null) => void
  addKnowledgeItem: (item: KnowledgeItem) => void
  updateKnowledgeItem: (id: string, updates: Partial<KnowledgeItem>) => void
  removeKnowledgeItem: (id: string) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
}

export const useKnowledgeStore = create<KnowledgeState>((set) => ({
  knowledgeItems: [],
  selectedKnowledge: null,
  isLoading: false,
  error: null,

  setKnowledgeItems: (items) => set({ knowledgeItems: items }),

  selectKnowledge: (item) => set({ selectedKnowledge: item }),

  addKnowledgeItem: (item) => set((state) => ({
    knowledgeItems: [...state.knowledgeItems, item]
  })),

  updateKnowledgeItem: (id, updates) => set((state) => ({
    knowledgeItems: state.knowledgeItems.map((k) =>
      k.id === id ? { ...k, ...updates } : k
    ),
    selectedKnowledge: state.selectedKnowledge?.id === id
      ? { ...state.selectedKnowledge, ...updates }
      : state.selectedKnowledge
  })),

  removeKnowledgeItem: (id) => set((state) => ({
    knowledgeItems: state.knowledgeItems.filter((k) => k.id !== id),
    selectedKnowledge: state.selectedKnowledge?.id === id ? null : state.selectedKnowledge
  })),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error })
}))
