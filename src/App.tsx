import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { OmsOrderList } from "@/examples/oms-order-list"

// Local playground (`bun run dev`). The documented surface is Storybook (`bun run storybook`).
export function App() {
  return (
    <TooltipProvider>
      <OmsOrderList />
      <Toaster />
    </TooltipProvider>
  )
}

export default App
