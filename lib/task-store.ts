"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Task = {
  id: string
  title: string
  description?: string
  dueDate?: string
  priority: "low" | "medium" | "high"
  status: "pending" | "ongoing" | "completed"
}

interface TaskState {
  tasks: Task[]
  addTask: (task: Task) => void
  updateTask: (task: Task) => void
  deleteTask: (id: string) => void
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      updateTask: (updatedTask) =>
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
    }),
    {
      name: "task-storage",
    },
  ),
)
