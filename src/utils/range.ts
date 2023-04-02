export class Range {

  static size(length: number): Range {
    if (length < 0) { throw new Error("Can't create a size-based range with a negative length") }
    return new Range(0, length - 1)
  }

  constructor(
    public readonly start: number,
    public readonly end: number,
    public readonly increment: number = 1
  ) {
    if (increment === 0) {
      throw new Error("Range can't have an increment of 0")
    }
  }

  beyondEnd(index: number): boolean {
    return this.increment < 0 ? index < this.end : index > this.end
  }

  map<T>(fn: (index: number) => T): T[] {
    const out: T[] = []
    for (let index = this.start; !this.beyondEnd(index); index += this.increment) {
      out.push(fn(index))
    }
    return out
  }

  list(): number[] {
    return this.map(i => i)
  }
}
