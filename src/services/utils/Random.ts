import { Range } from './Range'

const DefaultRandomStringCharacters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-'.split('')

export const Random = new class {

  /**
   * Returns a random integer between min and max and inclusive of both ends.
   * 
   * @param min smallest possible number (inclusive)
   * @param max largest possible number (inclusive)
   * @returns the random integer
   */
  int(min: number, max: number): number {
    return Math.min(max, Math.floor(this.float(min, max + 1)))
  }

  rand(): number {
    return Math.random()
  }

  float(min: number, max: number): number {
    const span = max - min
    return this.rand() * span + min
  }

  bool(): boolean {
    return this.float(0, 1) <= 0.5
  }

  choose<T>(from: T[]): T {
    const idx = this.int(0, from.length - 1)
    return from[idx]
  }

  string(len: number, characters: string[] = DefaultRandomStringCharacters): string {
    return Range.size(len).map(() => this.choose(characters)).join('')
  }
}