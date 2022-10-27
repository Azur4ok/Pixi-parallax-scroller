import * as PIXI from './pixi.mjs'
import { WallSpritesPool } from './WallSpritesPool.js'
import { SliceType } from './SliceType.js'
import { WallSlice } from './WallSlice.js'

export class Walls extends PIXI.Container {
  VIEWPORT_WIDTH = 512
  VIEWPORT_NUM_SLICES = Math.ceil(Walls.VIEWPORT_WIDTH / WallSlice.WIDTH) + 1
  constructor() {
    super()

    this.pool = new WallSpritesPool()
    this.createLookupTables()

    this.slices = []

    this.createTestMap()

    this.viewportX = 0
    this.viewportSliceX = 0
  }

  addNewSlices() {
    let firstX = -(this.viewportX % WallSlice.WIDTH)
    for (
      let i = this.viewportSliceX, sliceIndex = 0;
      i < this.viewportSliceX + Walls.VIEWPORT_NUM_SLICES;
      i++
    ) {
      const slice = this.slices[i]
      if (slice.sprite === null && slice.type != SliceType.GAP) {
        slice.sprite = this.borrowWallSprite(slice.type)

        slice.sprite.position.x = firstX + sliceIndex * WallSlice.WIDTH
        slice.sprite.position.y = slice.y

        this.addChild(slice.sprite)
      } else if (slice.sprite !== null) {
        slice.sprite.position.x = firstX + sliceIndex * WallSlice.WIDTH
      }
    }
  }

  removeOldSlices(prevViewportSliceX) {
    let numOldSlices = this.viewportSliceX - prevViewportSliceX
    if (numOldSlices > Walls.VIEWPORT_NUM_SLICES) {
      numOldSlices = Walls.VIEWPORT_NUM_SLICES
    }

    for (let i = prevViewportSliceX; i < prevViewportSliceX + numOldSlices; i++) {
      const slice = this.slices[i]

      if (slice.sprite !== null) {
        this.returnWallSprite(slice.type, slice.sprite)
        this.removeChild(slice.sprite)
        slice.sprite = null
      }
    }
  }

  setViewportX(viewportX) {
    this.viewportX = this.checkViewportXBounds(viewportX)

    const prevViewportSliceX = this.viewportSliceX
    this.viewportSliceX = Math.floor(this.viewportX / WallSlice.WIDTH)

    this.removeOldSlices(prevViewportSliceX)
    this.addNewSlices()
  }

  checkViewportXBounds(viewportX) {
    const maxViewportX = (this.slices.length - Walls.VIEWPORT_NUM_SLICES) * WallSlice.WIDTH

    if (viewportX < 0) {
      viewportX = 0
    } else if (viewportX >= maxViewportX) {
      viewportX = maxViewportX
    }
    return viewportX
  }

  addSlice(sliceType, y) {
    const slice = new WallSlice(sliceType, y)
    this.slices.push(slice)
  }

  createLookupTables() {
    this.borrowWallSpriteLookup = []
    this.borrowWallSpriteLookup[SliceType.FRONT] = this.pool.borrowFrontEdge
    this.borrowWallSpriteLookup[SliceType.BACK] = this.pool.borrowBackEdge
    this.borrowWallSpriteLookup[SliceType.STEP] = this.pool.borrowStep
    this.borrowWallSpriteLookup[SliceType.DECORATION] = this.pool.borrowDecoration
    this.borrowWallSpriteLookup[SliceType.WINDOW] = this.pool.borrowWindow

    this.returnWallSpriteLookup = []
    this.returnWallSpriteLookup[SliceType.FRONT] = this.pool.returnFrontEdge
    this.returnWallSpriteLookup[SliceType.BACK] = this.pool.returnBackEdge
    this.returnWallSpriteLookup[SliceType.STEP] = this.pool.returnStep
    this.returnWallSpriteLookup[SliceType.DECORATION] = this.pool.returnDecoration
    this.returnWallSpriteLookup[SliceType.WINDOW] = this.pool.returnWindow
  }

  borrowWallSprite(sliceType) {
    return this.borrowWallSpriteLookup[sliceType].call(this.pool)
  }

  returnWallSprite(sliceType, sliceSprite) {
    return this.returnWallSpriteLookup[sliceType].call(this.pool, sliceSprite)
  }

  createTestWallSpan() {
    this.addSlice(SliceType.FRONT, 192)
    this.addSlice(SliceType.WINDOW, 192)
    this.addSlice(SliceType.DECORATION, 192)
    this.addSlice(SliceType.WINDOW, 192)
    this.addSlice(SliceType.DECORATION, 192)
    this.addSlice(SliceType.WINDOW, 192)
    this.addSlice(SliceType.DECORATION, 192)
    this.addSlice(SliceType.WINDOW, 192)
    this.addSlice(SliceType.BACK, 192)
  }

  createTestSteppedWallSpan() {
    this.addSlice(SliceType.FRONT, 192)
    this.addSlice(SliceType.WINDOW, 192)
    this.addSlice(SliceType.DECORATION, 192)
    this.addSlice(SliceType.STEP, 256)
    this.addSlice(SliceType.WINDOW, 256)
    this.addSlice(SliceType.BACK, 256)
  }

  createTestGap() {
    this.addSlice(SliceType.GAP)
  }

  createTestMap() {
    for (let i = 0; i < 10; i++) {
      this.createTestWallSpan()
      this.createTestGap()
      this.createTestSteppedWallSpan()
      this.createTestGap()
    }
  }
}
