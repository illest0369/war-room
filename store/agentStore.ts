import { create } from 'zustand'
import type { Agent } from '@/lib/notion'

interface AgentState {
  agents: Agent[]
  selectedAgent: Agent | null
  isLoading: boolean
  error: string | null

  setAgents: (agents: Agent[]) => void
  selectAgent: (agent: Agent | null) => void
  addAgent: (agent: Agent) => void
  updateAgent: (id: string, updates: Partial<Agent>) => void
  removeAgent: (id: string) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
}

export const useAgentStore = create<AgentState>((set) => ({
  agents: [],
  selectedAgent: null,
  isLoading: false,
  error: null,

  setAgents: (agents) => set({ agents }),

  selectAgent: (agent) => set({ selectedAgent: agent }),

  addAgent: (agent) => set((state) => ({
    agents: [...state.agents, agent]
  })),

  updateAgent: (id, updates) => set((state) => ({
    agents: state.agents.map((a) =>
      a.id === id ? { ...a, ...updates } : a
    ),
    selectedAgent: state.selectedAgent?.id === id
      ? { ...state.selectedAgent, ...updates }
      : state.selectedAgent
  })),

  removeAgent: (id) => set((state) => ({
    agents: state.agents.filter((a) => a.id !== id),
    selectedAgent: state.selectedAgent?.id === id ? null : state.selectedAgent
  })),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error })
}))
