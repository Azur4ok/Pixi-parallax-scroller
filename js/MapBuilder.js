import { SliceType } from './SliceType.js'

export class MapBuilder {
  WALL_HEIGHTS = [256, 224, 192, 160, 128]
  constructor(walls) {
    this.walls = walls
  }

  createMap() {}

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
}
