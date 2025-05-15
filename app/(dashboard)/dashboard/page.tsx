"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock, AlertCircle, Plus } from "lucide-react"
import { TaskDialog } from "@/components/task-dialog"
import { useTaskStore } from "@/lib/task-store"
import { TaskCard } from "@/components/task-card"

export default function DashboardPage() {
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const { tasks } = useTaskStore()
  const [greeting, setGreeting] = useState("")
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const hour = currentTime.getHours()
    if (hour < 12) {
      setGreeting("Good Morning")
    } else if (hour < 18) {
      setGreeting("Good Afternoon")
    } else {
      setGreeting("Good Evening")
    }
  }, [currentTime])

  const completedTasks = tasks.filter((task) => task.status === "completed")
  const ongoingTasks = tasks.filter((task) => task.status === "ongoing")
  const pendingTasks = tasks.filter((task) => task.status === "pending")

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{greeting}, John</h1>
          <p className="text-muted-foreground">Here&apos;s an overview of your tasks</p>
        </div>
        <Button onClick={() => setIsTaskDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create New Task
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks.length}</div>
            <p className="text-xs text-muted-foreground">
              {completedTasks.length > 0 ? `Last completed: ${completedTasks[0].title}` : "No completed tasks yet"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ongoing Tasks</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ongoingTasks.length}</div>
            <p className="text-xs text-muted-foreground">
              {ongoingTasks.length > 0 ? `${ongoingTasks.length} tasks in progress` : "No ongoing tasks"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTasks.length}</div>
            <p className="text-xs text-muted-foreground">
              {pendingTasks.length > 0 ? `${pendingTasks.length} tasks waiting` : "No pending tasks"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Tasks</h2>
        {tasks.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tasks.slice(0, 6).map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <div className="rounded-full bg-primary/10 p-3">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-3 text-lg font-medium">No tasks yet</h3>
              <p className="text-center text-sm text-muted-foreground">Create your first task to get started</p>
              <Button variant="outline" className="mt-4" onClick={() => setIsTaskDialogOpen(true)}>
                Create Task
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <TaskDialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen} />
    </div>
  )
}
