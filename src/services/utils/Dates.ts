
export function toDateString(time?: number): string {
  if (typeof time === 'undefined') { return '' }
  const parts = new Date(time).toDateString().split(' ')
  return `${parts[1]} ${parts[2]}, ${parts[3]}`
}

