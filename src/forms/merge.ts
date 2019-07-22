
export function merge<T, S>(base: T, ...mods: S[]): T & S {
  return [base, ...mods]
    .reduce((prev, current) => Object.assign(prev, current), {}) as T & S
}

export function mergeArray<T, S>(base: T[], ...mods: S[]): T[] & S {
  return [base, ...mods]
    .reduce((prev, current) => Object.assign(prev, current), []) as T[] & S
}
