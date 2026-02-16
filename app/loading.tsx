import { LoaderCircle } from "lucide-react"

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-background/80 flex items-center justify-center">
      <LoaderCircle className="h-12 w-12 animate-spin text-foreground/50" />
    </div>
  )
}