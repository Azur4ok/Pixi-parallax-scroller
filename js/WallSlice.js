export class WallSlice {
  static WIDTH = 64
  constructor(type, y) {
    this.type = type
    this.y = y
    this.sprite = null
  }
}
