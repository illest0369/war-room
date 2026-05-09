import { create } from 'zustand'
import type { Task } from '@/lib/notion'

interface TaskState {
  tasks: Task[]
  selectedTask: Task | null
  isLoading: boolean
  error: string | null

  setTasks: (tasks: Task[]) => void
  selectTask: (task: Task | null) => void
  addTask: (task: Task) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  removeTask: (id: string) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  selectedTask: null,
  isLoading: false,
  error: null,

  setTasks: (tasks) => set({ tasks }),

  selectTask: (task) => set({ selectedTask: task }),

  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, task]
  })),

  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map((t) =>
      t.id === id ? { ...t, ...updates } : t
    ),
    selectedTask: state.selectedTask?.id === id
      ? { ...state.selectedTask, ...updates }
      : state.selectedTask
  })),

  removeTask: (id) => set((state) => ({
    tasks: state.tasks.filter((t) => t.id !== id),
    selectedTask: state.selectedTask?.id === id ? null : state.selectedTask
  })),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error })
}))
