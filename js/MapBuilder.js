import { SliceType } from './SliceType.js'

export class MapBuilder {
  static WALL_HEIGHTS = [256, 224, 192, 160, 128]
  constructor(walls) {
    this.walls = walls
    this.createMap()
  }

  createMap() {
    this.createWallSpan(3, 9, true)
    this.createGap(1)
    this.createWallSpan(1, 30)
    this.createGap(1)
    this.createWallSpan(2, 18)
    this.createGap(1)
    this.createSteppedWallSpan(2, 5, 28)
    this.createGap(1)
    this.createWallSpan(1, 10)
    this.createGap(1)
    this.createWallSpan(2, 6)
    this.createGap(1)
    this.createWallSpan(1, 8)
    this.createGap(1)
    this.createWallSpan(2, 6)
    this.createGap(1)
    this.createWallSpan(1, 8)
    this.createGap(1)
    this.createWallSpan(2, 7)
    this.createGap(1)
    this.createWallSpan(1, 16)
    this.createGap(1)
    this.createWallSpan(2, 6)
    this.createGap(1)
    this.createWallSpan(1, 22)
    this.createGap(2)
    this.createWallSpan(2, 14)
    this.createGap(2)
    this.createWallSpan(3, 8)
    this.createGap(2)
    this.createSteppedWallSpan(3, 5, 12)
    this.createGap(3)
    this.createWallSpan(0, 8)
    this.createGap(3)
    this.createWallSpan(1, 50)
    this.createGap(20)
  }

  createSteppedWallSpan(heightIndex, spanALength, spanBLength) {
    if (heightIndex < 2) {
      heightIndex = 2
    }

    this.createWallSpan(heightIndex, spanALength, false, true)
    this.addWallStep(heightIndex - 2)
    this.createWallSpan(heightIndex - 2, spanBLength - 1, true, false)
  }

  addWallFront(heightIndex) {
    const y = MapBuilder.WALL_HEIGHTS[heightIndex]
    this.walls.addSlice(SliceType.FRONT, y)
  }

  addWallBack(heightIndex) {
    const y = MapBuilder.WALL_HEIGHTS[heightIndex]
    this.walls.addSlice(SliceType.BACK, y)
  }

  addWallMid(heightIndex, spanLength) {
    const y = MapBuilder.WALL_HEIGHTS[heightIndex]
    for (let i = 0; i < spanLength; i++) {
      if (i % 2 === 0) {
        this.walls.addSlice(SliceType.WINDOW, y)
      } else {
        this.walls.addSlice(SliceType.DECORATION, y)
      }
    }
  }

  addWallStep(heightIndex) {
    const y = MapBuilder.WALL_HEIGHTS[heightIndex]
    this.walls.addSlice(SliceType.STEP, y)
  }

  createGap(spanLength) {
    for (let i = 0; i < spanLength; i++) {
      this.walls.addSlice(SliceType.GAP)
    }
  }

  createWallSpan(heightIndex, spanLength, noFront, noBack) {
    noFront = noFront || false
    noBack = noBack || false

    if (noFront === false && spanLength > 0) {
      this.addWallFront(heightIndex)
      spanLength--
    }

    const midSpanLength = spanLength - (noBack ? 0 : 1)
    if (midSpanLength > 0) {
      this.addWallMid(heightIndex, midSpanLength)
      spanLength -= midSpanLength
    }

    if (noBack === false && spanLength > 0) {
      this.addWallBack(heightIndex)
    }
  }
}
