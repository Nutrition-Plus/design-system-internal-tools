import * as React from "react"
import { AlertCircleIcon, PlusIcon, SunriseIcon, SunsetIcon, Trash2Icon, ZapIcon } from "lucide-react"
import { toast } from "sonner"

import { PageHeader } from "@/components/patterns/page-header"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { CHANNELS } from "@/fixtures/orders"
import { Annotated, AnnotationLegend, AnnotationsProvider, type AnnotationNote } from "./annotations"
import { CHANNEL } from "./oms/labels"
import { OmsShell } from "./oms/shell"

const PRODUCTS = [
  { sku: "CP-LYC-350", name: "Clear Protein รสลิ้นจี่ 350 มล." },
  { sku: "CP-PCH-350", name: "Clear Protein รสพีช 350 มล." },
  { sku: "HPM-CHO-250", name: "HPM รสช็อกโกแลต 250 มล." },
  { sku: "LZM-KPR-001", name: "Lazy Meal ผัดกะเพราไก่" },
]
const PROVINCES = ["กรุงเทพมหานคร", "นนทบุรี", "ปทุมธานี", "สมุทรปราการ", "เชียงใหม่", "ขอนแก่น", "ชลบุรี", "ภูเก็ต"]

type Line = { key: number; sku: string; qty: string }
type Values = {
  channel: string
  refNo: string
  recipient: string
  phone: string
  address: string
  province: string
  postcode: string
  round: string
  note: string
  confirmed: boolean
  lines: Line[]
}
type Errors = Partial<Record<string, string>>

const LABELS: Record<string, string> = {
  channel: "ช่องทางขาย",
  refNo: "เลขที่อ้างอิงจากช่องทาง",
  recipient: "ชื่อผู้รับ",
  phone: "เบอร์โทรศัพท์",
  address: "ที่อยู่",
  province: "จังหวัด",
  postcode: "รหัสไปรษณีย์",
  lines: "รายการสินค้า",
  confirmed: "ยืนยันที่อยู่",
}

function validate(v: Values): Errors {
  const e: Errors = {}
  if (!v.channel) e.channel = "เลือกช่องทางขาย"
  if (!v.refNo.trim()) e.refNo = "กรอกเลขที่อ้างอิง"
  else if (!/^[A-Z0-9-]{6,20}$/.test(v.refNo.trim())) e.refNo = "ใช้ตัวอักษรภาษาอังกฤษพิมพ์ใหญ่ ตัวเลข หรือ - จำนวน 6–20 ตัว"
  if (!v.recipient.trim()) e.recipient = "กรอกชื่อผู้รับ"
  if (!/^0\d{9}$/.test(v.phone.replace(/\D/g, ""))) e.phone = "กรอกเบอร์โทรศัพท์ 10 หลัก ขึ้นต้นด้วย 0"
  if (v.address.trim().length < 10) e.address = "กรอกที่อยู่อย่างน้อย 10 ตัวอักษร"
  if (!v.province) e.province = "เลือกจังหวัด"
  if (!/^\d{5}$/.test(v.postcode)) e.postcode = "รหัสไปรษณีย์ต้องเป็นตัวเลข 5 หลัก"
  if (v.lines.some((l) => !l.sku || !(Number(l.qty) > 0))) e.lines = "ทุกรายการต้องเลือกสินค้าและมีจำนวนมากกว่า 0"
  if (!v.confirmed) e.confirmed = "ต้องยืนยันที่อยู่กับลูกค้าก่อนบันทึก"
  return e
}

const NOTES: AnnotationNote[] = [
  { n: 1, kind: "standard", title: "สรุปข้อผิดพลาด", detail: "แสดงด้านบนเมื่อกดบันทึก แต่ละข้อพาไปยังช่องที่ต้องแก้" },
  { n: 2, kind: "standard", title: "รูปแบบช่องกรอก", detail: "label อยู่บน, * คือจำเป็น, ข้อความช่วยและข้อผิดพลาดอยู่ใต้ช่อง, ตรวจตอนออกจากช่อง" },
  { n: 3, kind: "standard", title: "แถบปุ่มด้านล่าง", detail: "ติดขอบล่างบน iPad, ปุ่มหลักขวาสุด, แสดง spinner ระหว่างบันทึก และไม่ล้างค่าที่กรอกเมื่อบันทึกไม่สำเร็จ" },
  { n: 4, kind: "custom", title: "ช่องข้อมูลและการจัดกลุ่ม", detail: "แต่ละระบบกำหนดช่องและกลุ่ม (Card + FieldSet) ตามงานของตัวเอง" },
]

let lineKey = 1
const EMPTY: Values = {
  channel: "",
  refNo: "",
  recipient: "",
  phone: "",
  address: "",
  province: "",
  postcode: "",
  round: "morning",
  note: "",
  confirmed: false,
  lines: [{ key: 0, sku: "", qty: "12" }],
}

export type OmsOrderFormProps = {
  /** Simulated server result when saving. */
  result?: "success" | "failure"
  annotations?: boolean
  initialValues?: Partial<Values>
}

export function OmsOrderForm({ result = "success", annotations = false, initialValues }: OmsOrderFormProps) {
  const [values, setValues] = React.useState<Values>({ ...EMPTY, ...initialValues })
  const [touched, setTouched] = React.useState<Record<string, boolean>>({})
  const [submitted, setSubmitted] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const summaryRef = React.useRef<HTMLDivElement>(null)

  const errors = validate(values)
  const show = (name: string) => (submitted || touched[name]) && errors[name]
  const summary = submitted ? Object.keys(errors) : []

  const set = <K extends keyof Values>(key: K, value: Values[K]) => setValues((v) => ({ ...v, [key]: value }))
  const blur = (name: string) => () => setTouched((t) => ({ ...t, [name]: true }))

  // Wires a control to its label, description and error.
  const a11y = (name: string, hasDescription = false) => ({
    id: name,
    "aria-invalid": Boolean(show(name)) || undefined,
    "aria-describedby": [hasDescription && `${name}-desc`, show(name) && `${name}-error`].filter(Boolean).join(" ") || undefined,
  })

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setSubmitted(true)
    if (Object.keys(errors).length) {
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }
    setSaving(true)
    await new Promise((r) => setTimeout(r, 900))
    setSaving(false)
    if (result === "failure") {
      toast.error("บันทึกไม่สำเร็จ", { description: "เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ ข้อมูลที่กรอกยังอยู่ ลองบันทึกอีกครั้ง" })
      return
    }
    toast.success("บันทึกคำสั่งซื้อแล้ว", { description: `เลขที่อ้างอิง ${values.refNo}` })
  }

  return (
    <AnnotationsProvider show={annotations}>
      <OmsShell
        active="orders"
        breadcrumbs={[{ label: "OMS", href: "#home" }, { label: "คำสั่งซื้อ", href: "#orders" }, { label: "สร้างคำสั่งซื้อ" }]}
      >
        <AnnotationLegend notes={NOTES} />
        <PageHeader
          title="สร้างคำสั่งซื้อ"
          description="สำหรับคำสั่งซื้อที่ไม่ได้มาจากการซิงก์ · ช่องที่มีเครื่องหมาย * ต้องกรอก"
        />

        <form noValidate onSubmit={submit} className="flex max-w-3xl flex-col gap-6 pb-24" aria-busy={saving}>
          {summary.length > 0 && (
            <Annotated n={1} kind="standard">
              <Alert variant="destructive" ref={summaryRef} tabIndex={-1} aria-labelledby="error-summary-title">
                <AlertCircleIcon />
                <AlertTitle id="error-summary-title">ยังบันทึกไม่ได้ มี {summary.length} ช่องที่ต้องแก้</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-4">
                    {summary.map((name) => (
                      <li key={name}>
                        <a
                          href={`#${name === "lines" ? "line-0-sku" : name}`}
                          onClick={(e) => {
                            e.preventDefault()
                            document.getElementById(name === "lines" ? "line-0-sku" : name)?.focus()
                          }}
                        >
                          {LABELS[name]}: {errors[name]}
                        </a>
                      </li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            </Annotated>
          )}

          <Annotated n={4} kind="custom" className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ข้อมูลคำสั่งซื้อ</CardTitle>
                <CardDescription>ช่องทางและเลขที่อ้างอิงใช้ตรวจคำสั่งซื้อซ้ำ</CardDescription>
              </CardHeader>
              <CardContent>
                <Annotated n={2} kind="standard">
                  <FieldGroup className="grid gap-6 md:grid-cols-2">
                    <Field data-invalid={Boolean(show("channel")) || undefined}>
                      <FieldLabel htmlFor="channel">ช่องทางขาย *</FieldLabel>
                      <Select value={values.channel} onValueChange={(v) => { set("channel", v); blur("channel")() }}>
                        <SelectTrigger className="w-full" {...a11y("channel")} onBlur={blur("channel")}>
                          <SelectValue placeholder="เลือกช่องทาง" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {CHANNELS.map((c) => (
                              <SelectItem key={c} value={c}>
                                {CHANNEL[c]}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {show("channel") && <FieldError id="channel-error">{errors.channel}</FieldError>}
                    </Field>
                    <Field data-invalid={Boolean(show("refNo")) || undefined}>
                      <FieldLabel htmlFor="refNo">เลขที่อ้างอิงจากช่องทาง *</FieldLabel>
                      <Input
                        {...a11y("refNo", true)}
                        className="font-mono uppercase"
                        autoComplete="off"
                        spellCheck={false}
                        value={values.refNo}
                        onChange={(e) => set("refNo", e.target.value.toUpperCase())}
                        onBlur={blur("refNo")}
                        placeholder="เช่น SP2510300001"
                      />
                      <FieldDescription id="refNo-desc">แสดงด้วยฟอนต์ mono เพื่อแยก 0 กับ O</FieldDescription>
                      {show("refNo") && <FieldError id="refNo-error">{errors.refNo}</FieldError>}
                    </Field>
                  </FieldGroup>
                </Annotated>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ผู้รับและที่อยู่จัดส่ง</CardTitle>
              </CardHeader>
              <CardContent>
                <FieldGroup className="grid gap-6 md:grid-cols-2">
                  <Field data-invalid={Boolean(show("recipient")) || undefined}>
                    <FieldLabel htmlFor="recipient">ชื่อผู้รับ *</FieldLabel>
                    <Input {...a11y("recipient")} autoComplete="name" value={values.recipient} onChange={(e) => set("recipient", e.target.value)} onBlur={blur("recipient")} />
                    {show("recipient") && <FieldError id="recipient-error">{errors.recipient}</FieldError>}
                  </Field>
                  <Field data-invalid={Boolean(show("phone")) || undefined}>
                    <FieldLabel htmlFor="phone">เบอร์โทรศัพท์ *</FieldLabel>
                    <Input {...a11y("phone")} type="tel" inputMode="tel" autoComplete="tel" className="tabular-nums" value={values.phone} onChange={(e) => set("phone", e.target.value)} onBlur={blur("phone")} placeholder="เช่น 0812345678" />
                    {show("phone") && <FieldError id="phone-error">{errors.phone}</FieldError>}
                  </Field>
                  <Field data-invalid={Boolean(show("address")) || undefined} className="md:col-span-2">
                    <FieldLabel htmlFor="address">ที่อยู่ *</FieldLabel>
                    <Textarea {...a11y("address", true)} rows={3} autoComplete="street-address" value={values.address} onChange={(e) => set("address", e.target.value)} onBlur={blur("address")} />
                    <FieldDescription id="address-desc">บ้านเลขที่ หมู่ ถนน ตำบล อำเภอ</FieldDescription>
                    {show("address") && <FieldError id="address-error">{errors.address}</FieldError>}
                  </Field>
                  <Field data-invalid={Boolean(show("province")) || undefined}>
                    <FieldLabel htmlFor="province">จังหวัด *</FieldLabel>
                    <Select value={values.province} onValueChange={(v) => { set("province", v); blur("province")() }}>
                      <SelectTrigger className="w-full" {...a11y("province")} onBlur={blur("province")}>
                        <SelectValue placeholder="เลือกจังหวัด" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {PROVINCES.map((p) => (
                            <SelectItem key={p} value={p}>
                              {p}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {show("province") && <FieldError id="province-error">{errors.province}</FieldError>}
                  </Field>
                  <Field data-invalid={Boolean(show("postcode")) || undefined}>
                    <FieldLabel htmlFor="postcode">รหัสไปรษณีย์ *</FieldLabel>
                    <Input {...a11y("postcode")} inputMode="numeric" autoComplete="postal-code" maxLength={5} className="tabular-nums" value={values.postcode} onChange={(e) => set("postcode", e.target.value.replace(/\D/g, ""))} onBlur={blur("postcode")} />
                    {show("postcode") && <FieldError id="postcode-error">{errors.postcode}</FieldError>}
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>สินค้าและการจัดส่ง</CardTitle>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <FieldSet data-invalid={Boolean(show("lines")) || undefined}>
                    <FieldLegend variant="label">รายการสินค้า *</FieldLegend>
                    <div className="flex flex-col gap-2">
                      {values.lines.map((line, i) => (
                        <div key={line.key} className="grid grid-cols-[1fr_6rem_auto] items-start gap-2">
                          <Select
                            value={line.sku}
                            onValueChange={(sku) => set("lines", values.lines.map((l) => (l.key === line.key ? { ...l, sku } : l)))}
                          >
                            <SelectTrigger id={`line-${i}-sku`} className="w-full" aria-label={`สินค้ารายการที่ ${i + 1}`} aria-invalid={Boolean(show("lines") && !line.sku) || undefined}>
                              <SelectValue placeholder="เลือกสินค้า" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {PRODUCTS.map((p) => (
                                  <SelectItem key={p.sku} value={p.sku}>
                                    <span className="font-mono text-xs text-muted-foreground">{p.sku}</span>
                                    {p.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <Input
                            aria-label={`จำนวนรายการที่ ${i + 1}`}
                            inputMode="numeric"
                            className="text-right tabular-nums"
                            value={line.qty}
                            aria-invalid={Boolean(show("lines") && !(Number(line.qty) > 0)) || undefined}
                            onChange={(e) => set("lines", values.lines.map((l) => (l.key === line.key ? { ...l, qty: e.target.value.replace(/\D/g, "") } : l)))}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            aria-label={`ลบรายการที่ ${i + 1}`}
                            disabled={values.lines.length === 1}
                            onClick={() => set("lines", values.lines.filter((l) => l.key !== line.key))}
                          >
                            <Trash2Icon />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="self-start"
                      onClick={() => set("lines", [...values.lines, { key: lineKey++, sku: "", qty: "12" }])}
                    >
                      <PlusIcon data-icon="inline-start" />
                      เพิ่มรายการ
                    </Button>
                    {show("lines") && <FieldError>{errors.lines}</FieldError>}
                  </FieldSet>

                  <Field>
                    <FieldLabel id="round-label">รอบส่ง</FieldLabel>
                    <ToggleGroup
                      type="single"
                      variant="outline"
                      size="sm"
                      aria-labelledby="round-label"
                      value={values.round}
                      onValueChange={(v) => v && set("round", v)}
                      className="justify-start"
                    >
                      <ToggleGroupItem value="morning">
                        <SunriseIcon data-icon="inline-start" />
                        รอบเช้า
                      </ToggleGroupItem>
                      <ToggleGroupItem value="afternoon">
                        <SunsetIcon data-icon="inline-start" />
                        รอบบ่าย
                      </ToggleGroupItem>
                      <ToggleGroupItem value="express">
                        <ZapIcon data-icon="inline-start" />
                        ด่วนพิเศษ
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="note">หมายเหตุ</FieldLabel>
                    <Textarea id="note" rows={2} value={values.note} onChange={(e) => set("note", e.target.value)} aria-describedby="note-desc" />
                    <FieldDescription id="note-desc">ไม่บังคับ · ทีมแพ็กจะเห็นข้อความนี้</FieldDescription>
                  </Field>

                  <Field orientation="horizontal" data-invalid={Boolean(show("confirmed")) || undefined}>
                    <Checkbox
                      {...a11y("confirmed")}
                      checked={values.confirmed}
                      onCheckedChange={(c) => { set("confirmed", c === true); blur("confirmed")() }}
                    />
                    <div className="flex flex-col gap-1">
                      <FieldLabel htmlFor="confirmed">ยืนยันที่อยู่กับลูกค้าแล้ว *</FieldLabel>
                      {show("confirmed") && <FieldError id="confirmed-error">{errors.confirmed}</FieldError>}
                    </div>
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>
          </Annotated>

          <Annotated n={3} kind="standard" className="sticky bottom-0 z-10">
            <div className="sticky bottom-0 z-10 -mx-(--page-gutter) flex justify-end gap-2 border-t border-border bg-background/95 px-(--page-gutter) py-3 backdrop-blur">
              <Button type="button" variant="outline" disabled={saving}>
                ยกเลิก
              </Button>
              <Button type="submit" disabled={saving} aria-busy={saving}>
                {saving && <Spinner data-icon="inline-start" />}
                {saving ? "กำลังบันทึก…" : "บันทึกคำสั่งซื้อ"}
              </Button>
            </div>
          </Annotated>
        </form>
      </OmsShell>
    </AnnotationsProvider>
  )
}
