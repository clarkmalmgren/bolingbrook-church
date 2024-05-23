import { useEffect } from 'react'

const data: { [ id: string ]: number } = {}

export function useDetectLoop(id: string, max: number = 10): boolean {
  useEffect(() => {
    data[id] = (data[id] || 0) + 1
    return () => {
      const count = data[id] || 0
      if (count > 1) {
        data[id] = count - 1
      } else {
        delete data[id]
      }
    }
  }, [id])

  return data[id] > max
}
