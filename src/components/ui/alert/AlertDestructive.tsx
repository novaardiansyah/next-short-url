import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

interface AlertDestructiveProps {
  title?: string
  description: string
}
export function AlertDestructive({ title, description }: AlertDestructiveProps) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4 mt-[-3px]" />
      {title && <AlertTitle>{title}</AlertTitle>}

      <AlertDescription>
        {description}
      </AlertDescription>
    </Alert>
  )
}