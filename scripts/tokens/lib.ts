// Loads DTCG token files, flattens them and resolves {references}.
import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"

import { contrastRatio } from "../../src/lib/contrast"

export const TOKENS_DIR = join(import.meta.dirname, "../../tokens")

export type Token = {
  path: string[]
  type?: string
  value: unknown
  description?: string
  ref?: string
}

type Node = Record<string, unknown>

export function loadTree(dir = TOKENS_DIR): Node {
  const tree: Node = {}
  for (const file of readdirSync(dir).sort()) {
    if (!file.endsWith(".json") || file === "contrast.json") continue
    const json = JSON.parse(readFileSync(join(dir, file), "utf8")) as Node
    for (const [key, value] of Object.entries(json)) {
      if (key.startsWith("$")) continue
      if (key in tree) throw new Error(`Duplicate top-level token group "${key}" in ${file}`)
      tree[key] = value
    }
  }
  return tree
}

export function flatten(node: Node, path: string[] = [], type?: string): Token[] {
  const groupType = (node.$type as string | undefined) ?? type
  if ("$value" in node) {
    return [
      {
        path,
        type: groupType,
        value: node.$value,
        description: node.$description as string | undefined,
      },
    ]
  }
  return Object.entries(node)
    .filter(([key]) => !key.startsWith("$"))
    .flatMap(([key, child]) => flatten(child as Node, [...path, key], groupType))
}

const REF = /^\{([^}]+)\}$/

export function resolveTokens(tokens: Token[]): Map<string, Token> {
  const byPath = new Map(tokens.map((t) => [t.path.join("."), t]))

  function resolve(token: Token, seen: string[] = []): unknown {
    const match = typeof token.value === "string" && token.value.match(REF)
    if (!match) return token.value
    const target = byPath.get(match[1])
    if (!target) throw new Error(`Unknown reference {${match[1]}} in ${token.path.join(".")}`)
    if (seen.includes(match[1])) throw new Error(`Circular reference: ${[...seen, match[1]].join(" → ")}`)
    return resolve(target, [...seen, match[1]])
  }

  const resolved = new Map<string, Token>()
  for (const [key, token] of byPath) {
    const match = typeof token.value === "string" && token.value.match(REF)
    resolved.set(key, { ...token, value: resolve(token), ref: match ? match[1] : undefined })
  }
  return resolved
}

export type ContrastPair = {
  fg: string
  bg: string
  min: number
  usage: string
  forbidden?: boolean
}

export type ContrastResult = ContrastPair & {
  fgValue: string
  bgValue: string
  ratio: number
  passes: boolean
}

export function loadContrastPairs(dir = TOKENS_DIR): ContrastPair[] {
  return (JSON.parse(readFileSync(join(dir, "contrast.json"), "utf8")) as { pairs: ContrastPair[] }).pairs
}

export function checkContrast(resolved: Map<string, Token>, pairs: ContrastPair[]): ContrastResult[] {
  return pairs.map((pair) => {
    const fg = resolved.get(`color.${pair.fg}`)
    const bg = resolved.get(`color.${pair.bg}`)
    if (!fg || !bg) throw new Error(`Contrast pair references unknown color: ${pair.fg} / ${pair.bg}`)
    const ratio = contrastRatio(String(fg.value), String(bg.value))
    return {
      ...pair,
      fgValue: String(fg.value),
      bgValue: String(bg.value),
      ratio: Math.round(ratio * 100) / 100,
      passes: ratio >= pair.min,
    }
  })
}
