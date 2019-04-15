
const PercentPattern: RegExp = /(\d+(\.\d+)?)%/
const AbsolutePattern: RegExp = /\d+px/

export interface HeaderHeightProp {
  isRelative: boolean
  styleHeight(): string
}

class RelativeHeaderHeightProp implements HeaderHeightProp {
  isRelative = true
  percent: number

  constructor(percent: number) {
    this.percent = percent
  }

  pixelHeight(): number {
    return window.innerHeight * this.percent / 100
  }

  styleHeight(): string {
    return this.pixelHeight() + "px"
  }
}

class AbsoluteHeaderHeightProp implements HeaderHeightProp {
  isRelative = false
  height: string

  constructor(height: string) {
    this.height = height
  }

  styleHeight = () => this.height
}

export function parseHeaderHeight(s: string): HeaderHeightProp {
  var match: RegExpExecArray | null = null

  if (match = PercentPattern.exec(s)) {
    return new RelativeHeaderHeightProp(parseFloat(match[1]))
  } else if (match = AbsolutePattern.exec(s)) {
    return new AbsoluteHeaderHeightProp(s)
  } else {
    throw new Error(`Invalid header height setting: ${s}`)
  }
}
