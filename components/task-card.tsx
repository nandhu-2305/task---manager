"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertCircle, Calendar, CheckCircle2, Clock, MoreVertical, Pencil, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { useTaskStore } from "@/lib/task-store"
import { TaskDialog } from "@/components/task-dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface TaskCardProps {
  task: {
    id: string
    title: string
    description?: string
    dueDate?: string
    priority: "low" | "medium" | "high"
    status: "pending" | "ongoing" | "completed"
  }
}

export function TaskCard({ task }: TaskCardProps) {
  const { updateTask, deleteTask } = useTaskStore()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const priorityColors = {
    low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    medium: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  }

  const statusIcons = {
    pending: <AlertCircle className="h-4 w-4 text-yellow-500" />,
    ongoing: <Clock className="h-4 w-4 text-blue-500" />,
    completed: <CheckCircle2 className="h-4 w-4 text-green-500" />,
  }

  const handleStatusChange = (newStatus: "pending" | "ongoing" | "completed") => {
    updateTask({
      ...task,
      status: newStatus,
    })
  }

  return (
    <>
      <Card className="overflow-hidden">
        <CardHeader className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              {statusIcons[task.status]}
              <CardTitle className="text-base">{task.title}</CardTitle>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          {task.description && <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {task.dueDate && (
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                {format(new Date(task.dueDate), "MMM d, yyyy")}
              </div>
            )}
            <Badge variant="outline" className={priorityColors[task.priority]}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-4">
          {task.status !== "completed" && (
            <Button variant="outline" size="sm" className="text-xs" onClick={() => handleStatusChange("completed")}>
              <CheckCircle2 className="mr-1 h-3 w-3" />
              Mark Complete
            </Button>
          )}
          {task.status === "pending" && (
            <Button variant="outline" size="sm" className="text-xs" onClick={() => handleStatusChange("ongoing")}>
              <Clock className="mr-1 h-3 w-3" />
              Start Task
            </Button>
          )}
          {task.status === "ongoing" && (
            <Button variant="outline" size="sm" className="text-xs" onClick={() => handleStatusChange("pending")}>
              <AlertCircle className="mr-1 h-3 w-3" />
              Pause Task
            </Button>
          )}
          {task.status === "completed" && (
            <Button variant="outline" size="sm" className="text-xs" onClick={() => handleStatusChange("ongoing")}>
              <Clock className="mr-1 h-3 w-3" />
              Reopen Task
            </Button>
          )}
          <Button variant="ghost" size="sm" className="text-xs" onClick={() => setIsEditDialogOpen(true)}>
            <Pencil className="mr-1 h-3 w-3" />
            Edit
          </Button>
        </CardFooter>
      </Card>

      <TaskDialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} task={task} />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the task &quot;{task.title}&quot;. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteTask(task.id)
                setIsDeleteDialogOpen(false)
              }}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
