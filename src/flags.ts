export type Flags = Record<string, boolean | number | string>

export function createFlags(): Flags {
  return {}
}

export function setFlag(flags: Flags, key: string, value: boolean | number | string): void {
  flags[key] = value
}

export function getFlag<T extends boolean | number | string>(
  flags: Flags,
  key: string,
  defaultValue: T
): T {
  return key in flags ? flags[key] as T : defaultValue
}

export function hasFlag(flags: Flags, key: string): boolean {
  return key in flags
}

export function resetFlags(flags: Flags): void {
  Object.keys(flags).forEach((key) => {
    delete flags[key]
  })
}
