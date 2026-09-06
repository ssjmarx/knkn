/**
 * The flag store — a string-keyed record holding all persistent game state.
 * Creates, reads, writes, checks, and clears entries in one shared mutable record.
 * Dialogue choices write through DialogueSystem; conditional dialogue text reads from it.
 */
export type Flags = Record<string, boolean | number | string>

/** Returns a fresh, empty Flags record. */
export function createFlags(): Flags {
  return {}
}

/** Writes a value into the store under the given key. */
export function setFlag(flags: Flags, key: string, value: boolean | number | string): void {
  flags[key] = value
}

/** Reads a key with a type-safe fallback when it's absent. */
export function getFlag<T extends boolean | number | string>(
  flags: Flags,
  key: string,
  defaultValue: T
): T {
  return key in flags ? flags[key] as T : defaultValue
}

/** Whether the key exists in the store at all. */
export function hasFlag(flags: Flags, key: string): boolean {
  return key in flags
}

/** Deletes every entry, leaving the record empty. */
export function resetFlags(flags: Flags): void {
  Object.keys(flags).forEach((key) => {
    delete flags[key]
  })
}
