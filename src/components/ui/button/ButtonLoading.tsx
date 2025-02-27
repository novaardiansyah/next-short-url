import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ButtonLoadingProps {
  className?: string
}

export function ButtonLoading({ className }: ButtonLoadingProps) {
  return (
    <Button disabled className={className}>
      <Loader2 className="animate-spin" />
      Processing...
    </Button>
  )
}