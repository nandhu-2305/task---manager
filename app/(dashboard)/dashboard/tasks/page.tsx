"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import { TaskDialog } from "@/components/task-dialog"
import { useTaskStore } from "@/lib/task-store"
import { TaskCard } from "@/components/task-card"

export default function TasksPage() {
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const { tasks } = useTaskStore()

  const completedTasks = tasks.filter((task) => task.status === "completed")
  const ongoingTasks = tasks.filter((task) => task.status === "ongoing")
  const pendingTasks = tasks.filter((task) => task.status === "pending")

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">All Tasks</h1>
          <p className="text-muted-foreground">View and manage all your tasks</p>
        </div>
        <Button onClick={() => setIsTaskDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create New Task
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="ongoing">
            Ongoing
            {ongoingTasks.length > 0 && (
              <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                {ongoingTasks.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending
            {pendingTasks.length > 0 && (
              <span className="ml-2 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                {pendingTasks.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed
            {completedTasks.length > 0 && (
              <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                {completedTasks.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {tasks.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tasks.map((task) => (
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
        </TabsContent>

        <TabsContent value="ongoing">
          {ongoingTasks.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ongoingTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <CardTitle>No ongoing tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">You don&apos;t have any tasks in progress</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="pending">
          {pendingTasks.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pendingTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                <CardTitle>No pending tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">You don&apos;t have any pending tasks</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed">
          {completedTasks.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {completedTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <CardTitle>No completed tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">You haven&apos;t completed any tasks yet</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <TaskDialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen} />
    </div>
  )
}
