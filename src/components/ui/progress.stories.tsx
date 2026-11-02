import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "./button"
import { Progress } from "./progress"

const meta = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "แถบความคืบหน้าสำหรับงานที่รู้ว่าเสร็จกี่เปอร์เซ็นต์ เช่น นำเข้าเลขพัสดุ ส่งออกไฟล์ หรือจองรอบส่งหลายรายการ",
          "",
          "- ต้องใส่ `aria-label` เสมอ และแสดงตัวเลขเป็นข้อความข้างแถบ ห้ามพึ่งสีอย่างเดียว",
          "- `tone` เปลี่ยนสีแถบเท่านั้น: `success` เสร็จสมบูรณ์, `warning` ใกล้เต็มหรือช้า, `danger` ล้มเหลว ข้อความยังใช้สีมาตรฐาน",
          "- ถ้าไม่รู้ว่าเสร็จเมื่อไร ใช้ `Spinner` แทน",
        ].join("\n"),
      },
    },
  },
  args: { value: 60, "aria-label": "ความคืบหน้า" },
  argTypes: {
    tone: {
      control: "select",
      options: ["default", "success", "warning", "danger"],
    },
    value: { control: { type: "range", min: 0, max: 100 } },
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => <Progress {...args} className="max-w-md" />,
}

export const Tones: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-5">
      {[
        { tone: "default", label: "กำลังนำเข้าเลขพัสดุ", value: 45 },
        { tone: "success", label: "ส่งออกไฟล์เสร็จแล้ว", value: 100 },
        { tone: "warning", label: "พื้นที่จัดเก็บใกล้เต็ม", value: 88 },
        { tone: "danger", label: "นำเข้าล้มเหลว (ผิดพลาด 12 แถว)", value: 30 },
      ].map((row) => (
        <div key={row.tone} className="flex flex-col gap-1.5">
          <div className="flex justify-between text-sm">
            <span>{row.label}</span>
            <span className="text-muted-foreground tabular-nums">
              {row.value}%
            </span>
          </div>
          <Progress
            tone={row.tone as "default"}
            value={row.value}
            aria-label={row.label}
          />
        </div>
      ))}
    </div>
  ),
}

function RunningDemo() {
  const [value, setValue] = React.useState(0)
  const [running, setRunning] = React.useState(false)
  React.useEffect(() => {
    if (!running) return
    const timer = setInterval(() => {
      setValue((v) => {
        if (v >= 100) {
          setRunning(false)
          return 100
        }
        return v + 5
      })
    }, 250)
    return () => clearInterval(timer)
  }, [running])
  return (
    <div className="flex max-w-md flex-col gap-3">
      <div className="flex justify-between text-sm">
        <span>นำเข้าเลขพัสดุ 128 รายการ</span>
        <span className="text-muted-foreground tabular-nums">{value}%</span>
      </div>
      <Progress
        value={value}
        tone={value === 100 ? "success" : "default"}
        aria-label="นำเข้าเลขพัสดุ"
      />
      <Button
        className="self-start"
        variant="outline"
        disabled={running}
        onClick={() => {
          setValue(0)
          setRunning(true)
        }}
      >
        {value === 100 ? "เริ่มใหม่" : "เริ่มนำเข้า"}
      </Button>
    </div>
  )
}

export const Running: Story = {
  name: "Running (live)",
  render: () => <RunningDemo />,
}
