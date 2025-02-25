import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

interface CustomAlertProps {
  variant?: 'destructive' | 'default'
  title?: string
  description: string
}
export function CustomAlert({ variant, title, description }: CustomAlertProps) {
  return (
    <Alert variant={variant}>
      <AlertCircle className="h-4 w-4 mt-[-3px]" />
      {title && <AlertTitle>{title}</AlertTitle>}

      <AlertDescription>
        {description}
      </AlertDescription>
    </Alert>
  )
}