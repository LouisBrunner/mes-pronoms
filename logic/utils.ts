export const capitalize = (s: string): string => {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const pluralize = (word: string): string => {
  return `${word}s`
}

export const isArray = <T>(thing: T | T[]): thing is T[] => {
  return (thing as T[])?.length !== undefined
}

export const identity = (s: string): string => {
  return s
}
