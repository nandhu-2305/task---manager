"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { TaskDialog } from "@/components/task-dialog"
import { useTaskStore } from "@/lib/task-store"
import { TaskCard } from "@/components/task-card"
import { isSameDay } from "date-fns"

export default function TodayPage() {
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const { tasks } = useTaskStore()

  const today = new Date()
  const todaysTasks = tasks.filter((task) => (task.dueDate ? isSameDay(new Date(task.dueDate), today) : false))

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Today&apos;s Tasks</h1>
          <p className="text-muted-foreground">Manage your tasks for today</p>
        </div>
        <Button onClick={() => setIsTaskDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create New Task
        </Button>
      </div>

      {todaysTasks.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {todaysTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No tasks for today</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className="rounded-full bg-primary/10 p-3">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <p className="mt-3 text-center text-sm text-muted-foreground">
              You don&apos;t have any tasks scheduled for today
            </p>
            <Button variant="outline" className="mt-4" onClick={() => setIsTaskDialogOpen(true)}>
              Create Task
            </Button>
          </CardContent>
        </Card>
      )}

      <TaskDialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen} defaultDate={today} />
    </div>
  )
}
