# Contributing

รายละเอียดเต็มอยู่ใน Storybook → **Guides/Governance** สรุปย่อ:

1. เปิด issue อธิบายปัญหา และตรวจว่ามี component หรือ pattern เดิมที่ใช้ได้หรือไม่
2. แก้ tokens ที่ `tokens/*.json` เท่านั้น (ห้ามแก้ `src/styles/tokens.css` ตรง ๆ) แล้วรัน `bun run tokens`
3. ทุก component/pattern ต้องมี story ครอบคลุม default, focus, disabled, loading, error และทั้งสอง density พร้อมคำอธิบาย “ใช้เมื่อ / ไม่ควรใช้ / ข้อควรระวัง”
4. แก้สี → เพิ่มคู่สีใน `tokens/contrast.json`
5. ก่อนเปิด PR:

```bash
bun run tokens && bun test && bun run typecheck && bun run lint && bun run test:stories && bun run registry:build
```

6. บันทึกใน `CHANGELOG.md` และระบุระดับเวอร์ชัน (major / minor / patch)
7. รีวิวโดย design 1 คน + frontend 1 คน

ห้ามใช้ข้อมูลลูกค้าจริงใน stories หรือ fixtures
