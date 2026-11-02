# MOOVE Design System

Design System กลางสำหรับ OMS และ Internal Tools ของ MOOVE: tokens, components (shadcn/ui), patterns และเอกสารใน Storybook

## เริ่มใช้งาน

```bash
bun install
bun run storybook        # เปิดที่ localhost:8000 (ถ้า port 8000 ถูกใช้ จะแจ้งและหยุด)
```

| Script | ทำอะไร |
| --- | --- |
| `bun run storybook` | เปิดเอกสารที่ <http://localhost:8000> (`storybook dev -p 8000 --exact-port`) |
| `bun run tokens` | สร้าง CSS/TS/JSON จาก `tokens/*.json` และตรวจ contrast |
| `bun test` | ทดสอบ tokens และ contrast ของทุกคู่สี |
| `bun run test:stories` | รันทุก story เป็น test (render, interaction, a11y) ใน Chromium |
| `bun run typecheck` / `bun run lint` | ตรวจ TypeScript / ESLint |
| `bun run build-storybook` | build Storybook แบบ static (ใช้ภายในเท่านั้น) |
| `bun run registry:build` | สร้าง `registry.json` และ `public/r/*.json` |
| `bun run registry:serve` | เปิด registry ที่ <http://localhost:8787> สำหรับทดสอบติดตั้ง |
| `bun scripts/screenshot.ts <story-id>` | จับภาพ story (ต้องเปิด Storybook อยู่) |

## โครงสร้าง

```text
tokens/                     Source of truth (W3C DTCG JSON) + contrast.json
scripts/                    build-tokens, build-registry, check-port, screenshot
src/styles/                 tokens.css (generated), fonts.css, base.css
src/components/ui/          shadcn/ui primitives ที่ปรับเข้ากับ MOOVE + stories
src/components/patterns/    DataTable, ConfirmDialog, Empty/ErrorState, PageHeader, AppShell
src/examples/               หน้าตัวอย่าง OMS สำหรับผู้บริหาร
src/docs/                   MDX: Principles, Foundations, Patterns, Guides
registry.json → public/r/   shadcn registry (@moove)
```

นำไปใช้ในระบบอื่น: ดู Storybook → **Guides/Using in your app** · การเปลี่ยนแปลง: **Guides/Governance** และ [CONTRIBUTING.md](CONTRIBUTING.md)

## การตัดสินใจหลัก

- **ฟอนต์:** IBM Plex Sans Thai + IBM Plex Sans + IBM Plex Mono ซึ่งเลือกหลังเปรียบเทียบจริงกับ Noto Sans Thai/Inter/JetBrains Mono และ Anuphan/Inter (ดู Foundations/Typography) · รหัสต้องใช้ mono เพราะ feature `zero` ไม่ทำงานในฟอนต์ sans
- **Density:** comfortable 44px (ค่าเริ่มต้น สำหรับ OMS บน iPad ตาม ADR-009) และ compact 32px (desktop)
- **สีสถานะ:** สีสดใช้เป็น indicator เท่านั้น ตัวอักษรใช้คู่สีเข้มบนพื้นอ่อน · ขอบช่องกรอกปรับเป็น #7A8995 เพื่อให้ผ่าน 3:1 บนพื้น Secondary
- **ส่งต่อ:** shadcn registry ให้โค้ดอยู่ใน repo ของแต่ละระบบ (ADR-009)
- **ยังไม่ทำใน v1:** Dark mode (โครงสร้าง tokens รองรับแล้ว)

## แผนเริ่มต้น (v1)

| ลำดับ | งาน | สถานะ |
| --- | --- | --- |
| 1 | Setup: Bun, Vite, Tailwind v4, shadcn + skill, Storybook :8000 | ✅ |
| 2 | Foundations: tokens, contrast test, ทดสอบและเลือกฟอนต์, density | ✅ |
| 3 | Components สำหรับหน้ารายการ: Button, Badge, Input, Select, Checkbox, Tabs, Card, Navigation, DataTable | ✅ |
| 4 | Components สำหรับฟอร์ม: Field, Textarea, Alert, Dialog/ConfirmDialog, Toast | ✅ |
| 5 | Patterns + Examples สำหรับผู้บริหาร | ✅ |
| 6 | Registry + เอกสารการใช้งานและการดูแล | ✅ |
| ถัดไป | ตัดสินใจ host ของ registry · CI · Date range picker · Combobox ขั้นสูง · Dark mode · Visual regression · sync กับ Figma | ⏳ |
