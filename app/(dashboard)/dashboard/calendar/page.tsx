"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { TaskDialog } from "@/components/task-dialog"
import { useTaskStore } from "@/lib/task-store"
import { TaskCard } from "@/components/task-card"
import { isSameDay } from "date-fns"

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const { tasks } = useTaskStore()

  const selectedDayTasks = tasks.filter((task) =>
    task.dueDate && selectedDate ? isSameDay(new Date(task.dueDate), selectedDate) : false,
  )

  // Function to get dates with tasks for highlighting in calendar
  const getDatesWithTasks = () => {
    return tasks.filter((task) => task.dueDate).map((task) => new Date(task.dueDate as string))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">View and manage your tasks by date</p>
        </div>
        <Button onClick={() => setIsTaskDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create New Task
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <Card>
          <CardHeader>
            <CardTitle>Tasks for {selectedDate?.toLocaleDateString()}</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDayTasks.length > 0 ? (
              <div className="grid gap-4">
                {selectedDayTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <p className="mt-3 text-center text-sm text-muted-foreground">No tasks for this date</p>
                <Button variant="outline" className="mt-4" onClick={() => setIsTaskDialogOpen(true)}>
                  Add Task
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              modifiers={{
                hasTasks: getDatesWithTasks(),
              }}
              modifiersStyles={{
                hasTasks: {
                  fontWeight: "bold",
                  backgroundColor: "hsl(var(--primary) / 0.1)",
                  color: "hsl(var(--primary))",
                },
              }}
            />
            <div className="mt-4 flex justify-center">
              <Button
                onClick={() => {
                  setIsTaskDialogOpen(true)
                }}
                variant="outline"
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Task for {selectedDate?.toLocaleDateString()}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <TaskDialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen} defaultDate={selectedDate} />
    </div>
  )
}
