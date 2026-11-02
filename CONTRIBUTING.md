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

## Branch protection

`main` accepts changes only through a pull request. Direct pushes, force pushes and branch deletion are blocked.

A pull request can merge when:
- the `verify` check passes (tokens up to date, `bun test`, typecheck, lint, story tests with accessibility checks, Storybook and registry builds),
- it has 1 approving review (the Governance guide asks for one design and one frontend reviewer; the ruleset enforces 1 approval until a CODEOWNERS file is added and `require_code_owner_review` is switched on), and
- all review conversations are resolved and the branch is up to date with `main`.

The checks live in `.github/workflows/ci.yml`. They only verify; nothing is deployed automatically.

### One-time setup (repo admin)
1. Create the GitHub repo and push `main`.
2. **Settings → Rules → Rulesets → New ruleset → Import a ruleset** and choose `.github/rulesets/protect-main.json`. The rules do not apply until you import them: the file is only a template.
3. After the first workflow run, check that the `verify` check appears under the ruleset's required checks.

The ruleset has no bypass actors, so admins follow the same rules. Add yourself in the ruleset's "Bypass list" if you need an emergency path.

