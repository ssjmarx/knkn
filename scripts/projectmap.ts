/**
 * The project map generator — reads every src/ module and writes memory-bank/projectMap.md.
 * Parses the docstring convention (3-line module blocks, 1-line function one-liners) and renders the module map.
 * Strict: exits 1 and writes nothing when any docstring is missing or malformed.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

type FunctionEntry = {
  name: string
  params: string
  doc: string
}

type ClassEntry = {
  name: string
  doc: string
  methods: FunctionEntry[]
}

type ModuleEntry = {
  path: string
  doc: string[]
  functions: FunctionEntry[]
  classes: ClassEntry[]
}

type ParseResult =
  | { kind: "ok"; module: ModuleEntry }
  | { kind: "undocumented"; where: string }

const MODULE_DOC_LINES = 3
const EXPORT_FUNCTION = /^(?:export )?function ([a-zA-Z_$][\w$]*)[<(]/
const EXPORT_CLASS = /^export class ([A-Z][\w$]*)/
const METHOD = /^ {2}(?:override |private |public |get |set |async |static )*([a-zA-Z_$][\w$]*)\(/
const CONTROL = new Set(["if", "for", "while", "switch", "constructor", "return", "catch"])
const EXPORT_TYPE = /^export (interface|type) /

/** Every .ts file under src/, one directory deep, sorted for stable output. */
function listModules(): string[] {
  const paths: string[] = []
  for (const entry of readdirSync("src", { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith(".ts")) {
      paths.push(join("src", entry.name))
    } else if (entry.isDirectory()) {
      for (const inner of readdirSync(join("src", entry.name), { withFileTypes: true })) {
        if (inner.isFile() && inner.name.endsWith(".ts")) {
          paths.push(join("src", entry.name, inner.name))
        }
      }
    }
  }
  return paths.sort()
}

/** The first block comment in the file, iff it has exactly three content lines. */
function parseModuleDoc(lines: string[]): string[] | undefined {
  if (lines[0]?.trim() !== "/**") return undefined
  const body: string[] = []
  for (let i = 1; i < lines.length; i++) {
    const trimmed = lines[i]!.trim()
    if (trimmed === "*/") break
    if (!trimmed.startsWith("* ")) return undefined
    body.push(trimmed.slice(2))
  }
  return body.length === MODULE_DOC_LINES ? body : undefined
}

/** docstring on the line directly above index, or undefined. */
function docAbove(lines: string[], index: number): string | undefined {
  if (index === 0) return undefined
  const match = /^\/\*\* (.*) \*\/$/.exec(lines[index - 1]!.trim())
  return match ? match[1] : undefined
}

/** The parameter text from a declaration line; "…" when the signature spans lines. */
function signatureParams(line: string): string {
  const open = line.indexOf("(")
  if (open === -1) return ""
  const close = line.indexOf(")", open)
  if (close === -1) return "…"
  return line.slice(open + 1, close)
}

/** Parses one module into a ModuleEntry, or reports the first docstring violation. */
function parseFile(path: string): ParseResult {
  const lines = readFileSync(path, "utf8").split("\n")
  const doc = parseModuleDoc(lines)
  if (doc === undefined) {
    return { kind: "undocumented", where: `${path}: module docstring missing or not exactly ${MODULE_DOC_LINES} lines` }
  }

  const entry: ModuleEntry = { path, doc, functions: [], classes: [] }
  let currentClass: ClassEntry | null = null
  let inTypeBody = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!
    const asClass = EXPORT_CLASS.exec(line)

    if (inTypeBody) {
      if (line.trim() === "}") {
        inTypeBody = false
      }
      continue
    }
    if (EXPORT_TYPE.test(line) && line.trim().endsWith("{")) {
      inTypeBody = true
      continue
    }

    if (asClass) {
      const docLine = docAbove(lines, i)
      if (docLine === undefined) {
        return { kind: "undocumented", where: `${path}:${i + 1} — class ${asClass[1]} has no one-liner` }
      }
      currentClass = { name: asClass[1]!, doc: docLine, methods: [] }
      entry.classes.push(currentClass)
      continue
    }

    const asFunction = EXPORT_FUNCTION.exec(line)
    if (asFunction) {
      const docLine = docAbove(lines, i)
      if (docLine === undefined) {
        return { kind: "undocumented", where: `${path}:${i + 1} — function ${asFunction[1]} has no one-liner` }
      }
      entry.functions.push({ name: asFunction[1]!, params: signatureParams(line), doc: docLine })
      currentClass = null
      continue
    }

    const asMethod = METHOD.exec(line)
    if (asMethod) {
      const name = asMethod[1]!
      if (CONTROL.has(name)) continue
      const docLine = docAbove(lines, i)
      if (docLine === undefined) {
        return { kind: "undocumented", where: `${path}:${i + 1} — method ${name} has no one-liner` }
      }
      const method = { name, params: signatureParams(line), doc: docLine }
      if (currentClass) {
        currentClass.methods.push(method)
      } else {
        entry.functions.push(method)
      }
    }
  }

  return { kind: "ok", module: entry }
}

/** Renders the whole map as markdown from parsed modules. */
function renderMap(modules: ModuleEntry[]): string {
  const parts: string[] = [
    "# Project Map — generated module map",
    "",
    "> GENERATED by `npm run map` (scripts/projectmap.ts) — do not hand-edit.",
    "> Infrastructure and environment: `techContext.md`. Everything else: `projectbrief.md`.",
    ""
  ]
  for (const module of modules) {
    parts.push(`## ${module.path}`, "")
    for (const line of module.doc) {
      parts.push(line)
    }
    parts.push("")
    for (const c of module.classes) {
      parts.push(`- **class ${c.name}** — ${c.doc}`)
      for (const m of c.methods) {
        parts.push(`  - \`${m.name}(${m.params})\` — ${m.doc}`)
      }
    }
    for (const f of module.functions) {
      parts.push(`- \`${f.name}(${f.params})\` — ${f.doc}`)
    }
    parts.push("")
  }
  return parts.join("\n")
}

function main(): void {
  const results = listModules().map(parseFile)
  const violations = results.filter((r) => r.kind === "undocumented")
  if (violations.length > 0) {
    console.error("projectmap: docstring convention violations — map NOT written:")
    for (const v of violations) {
      console.error(`  - ${v.where}`)
    }
    process.exit(1)
  }
  const modules = results.filter((r) => r.kind === "ok").map((r) => r.module)
  writeFileSync("memory-bank/projectMap.md", renderMap(modules))
  console.log(`projectmap: wrote memory-bank/projectMap.md — ${modules.length} modules`)
}

main()

