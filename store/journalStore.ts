import { create } from 'zustand'
import type { JournalEntry } from '@/lib/notion'

interface JournalState {
  entries: JournalEntry[]
  selectedEntry: JournalEntry | null
  isLoading: boolean
  error: string | null

  setEntries: (entries: JournalEntry[]) => void
  selectEntry: (entry: JournalEntry | null) => void
  addEntry: (entry: JournalEntry) => void
  updateEntry: (id: string, updates: Partial<JournalEntry>) => void
  removeEntry: (id: string) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
}

export const useJournalStore = create<JournalState>((set) => ({
  entries: [],
  selectedEntry: null,
  isLoading: false,
  error: null,

  setEntries: (entries) => set({ entries }),

  selectEntry: (entry) => set({ selectedEntry: entry }),

  addEntry: (entry) => set((state) => ({
    entries: [...state.entries, entry]
  })),

  updateEntry: (id, updates) => set((state) => ({
    entries: state.entries.map((e) =>
      e.id === id ? { ...e, ...updates } : e
    ),
    selectedEntry: state.selectedEntry?.id === id
      ? { ...state.selectedEntry, ...updates }
      : state.selectedEntry
  })),

  removeEntry: (id) => set((state) => ({
    entries: state.entries.filter((e) => e.id !== id),
    selectedEntry: state.selectedEntry?.id === id ? null : state.selectedEntry
  })),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error })
}))
