// Fails fast with a clear message when the Storybook port is taken.
// Usage: bun scripts/check-port.ts 8000
//
// A server may listen on 127.0.0.1, ::1 or 0.0.0.0. On macOS a wildcard bind can succeed even
// while 127.0.0.1 is taken, so we both try to connect and try to bind on each address.
import { createConnection, createServer } from "node:net"

const port = Number(process.argv[2] ?? 8000)

function accepts(host: string) {
  return new Promise<boolean>((resolve) => {
    const socket = createConnection({ host, port })
    socket.setTimeout(500)
    socket.once("connect", () => (socket.destroy(), resolve(true)))
    socket.once("timeout", () => (socket.destroy(), resolve(false)))
    socket.once("error", () => resolve(false))
  })
}

function bindFails(host: string) {
  return new Promise<boolean>((resolve) => {
    const server = createServer()
    server.once("error", (error: NodeJS.ErrnoException) => resolve(error.code === "EADDRINUSE"))
    server.once("listening", () => server.close(() => resolve(false)))
    server.listen(port, host)
  })
}

function owner() {
  const out = Bun.spawnSync(["lsof", "-nP", `-iTCP:${port}`, "-sTCP:LISTEN"], { stderr: "ignore" })
  return out.stdout.toString().trim()
}

const checks = await Promise.all([accepts("127.0.0.1"), accepts("::1"), bindFails("127.0.0.1"), bindFails("0.0.0.0")])

if (checks.some(Boolean)) {
  const who = owner()
  console.error(
    [
      "",
      `✗ Port ${port} ถูกใช้งานอยู่ — Storybook ต้องเปิดที่ http://localhost:${port} เท่านั้น จึงไม่เริ่มทำงาน`,
      `  Port ${port} is already in use. Storybook is pinned to this port (--exact-port), so it will not start.`,
      "",
      who ? `โปรเซสที่ใช้ port อยู่ / Process holding the port:\n${who}\n` : "",
      "วิธีแก้ / How to fix:",
      `  1. ถ้าเป็น Storybook ที่เปิดไว้แล้ว ให้ใช้หน้าต่างเดิมที่ http://localhost:${port}`,
      `  2. หรือปิดโปรแกรมที่ใช้ port ${port}: kill <PID>  (ดู PID จากตารางด้านบน) แล้วรันใหม่`,
      "",
    ].join("\n")
  )
  process.exit(1)
}
