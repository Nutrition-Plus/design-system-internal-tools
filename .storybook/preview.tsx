import type { Decorator, Preview } from "@storybook/react-vite"

import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { themes } from "storybook/theming"
import {
  DocsContainer,
  type DocsContainerProps,
} from "@storybook/addon-docs/blocks"
import { useDarkMode } from "storybook-dark-mode"
import "@/index.css"

// The dark toggle only changes Storybook's own chrome and docs pages.
// Components stay on the light MOOVE palette (v1 has no dark mode).
function ThemedDocsContainer(props: DocsContainerProps) {
  const dark = useDarkMode()
  return <DocsContainer {...props} theme={dark ? themes.dark : themes.light} />
}

const withProviders: Decorator = (Story, context) => {
  const density = (context.globals.density as string) ?? "comfortable"
  document.documentElement.dataset.density = density
  document.documentElement.lang = "th"
  // Components are light-only in v1. On Docs pages the canvas follows Storybook's theme, so keep
  // the examples on a light surface; otherwise dark text lands on a dark canvas and cannot be read.
  const inDocs = context.viewMode === "docs"
  return (
    <TooltipProvider>
      <div
        className={
          inDocs ? "rounded-md bg-background p-4 text-foreground" : undefined
        }
      >
        <Story />
      </div>
      <Toaster />
    </TooltipProvider>
  )
}

const preview: Preview = {
  decorators: [withProviders],
  globalTypes: {
    density: {
      description:
        "Density: comfortable (44px, iPad/touch) or compact (32px, desktop)",
      toolbar: {
        title: "Density",
        icon: "component",
        items: [
          { value: "comfortable", title: "Comfortable · 44px (iPad)" },
          { value: "compact", title: "Compact · 32px (Desktop)" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    density: "comfortable",
  },
  parameters: {
    layout: "padded",
    darkMode: { stylePreview: false, current: "light" },
    docs: { container: ThemedDocsContainer },
    backgrounds: { disabled: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      options: {
        ipadPortrait: {
          name: "iPad portrait 768×1024",
          styles: { width: "768px", height: "1024px" },
          type: "tablet",
        },
        ipad: {
          name: "iPad 1024×768",
          styles: { width: "1024px", height: "768px" },
          type: "tablet",
        },
        ipadAir: {
          name: "iPad Air 1180×820",
          styles: { width: "1180px", height: "820px" },
          type: "tablet",
        },
        desktop: {
          name: "Desktop 1440×900",
          styles: { width: "1440px", height: "900px" },
          type: "desktop",
        },
        mobile: {
          name: "Mobile 390×844",
          styles: { width: "390px", height: "844px" },
          type: "mobile",
        },
      },
    },
    options: {
      storySort: {
        order: [
          "Introduction",
          "Principles",
          "Foundations",
          [
            "Colors",
            "Typography",
            "Font Comparison",
            "Spacing & Size",
            "Radius, Border & Shadow",
          ],
          "Components",
          "Patterns",
          "Examples",
          "Guides",
        ],
      },
    },
    a11y: {
      // Any axe violation fails the Vitest/Storybook test run.
      test: "error",
    },
  },
}

export default preview
