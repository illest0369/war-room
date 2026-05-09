import { create } from 'zustand'
import type { Project } from '@/lib/notion'

interface ProjectState {
  projects: Project[]
  selectedProject: Project | null
  isLoading: boolean
  error: string | null

  setProjects: (projects: Project[]) => void
  selectProject: (project: Project | null) => void
  addProject: (project: Project) => void
  updateProject: (id: string, updates: Partial<Project>) => void
  removeProject: (id: string) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  selectedProject: null,
  isLoading: false,
  error: null,

  setProjects: (projects) => set({ projects }),

  selectProject: (project) => set({ selectedProject: project }),

  addProject: (project) => set((state) => ({
    projects: [...state.projects, project]
  })),

  updateProject: (id, updates) => set((state) => ({
    projects: state.projects.map((p) =>
      p.id === id ? { ...p, ...updates } : p
    ),
    selectedProject: state.selectedProject?.id === id
      ? { ...state.selectedProject, ...updates }
      : state.selectedProject
  })),

  removeProject: (id) => set((state) => ({
    projects: state.projects.filter((p) => p.id !== id),
    selectedProject: state.selectedProject?.id === id ? null : state.selectedProject
  })),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error })
}))
