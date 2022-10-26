import * as PIXI from './pixi.mjs'

import { Scroller } from './Scroller.js'
import { WallSpritesPool } from './WallSpritesPool.js'

export class Main {
  constructor() {
    this.SCROLL_SPEED = 5
    this.app = new PIXI.Application({ width: 512, height: 384 })
    this.container = new PIXI.Container()

    this.app.stage.addChild(this.container)
    document.body.append(this.app.view)

    this.loadSpriteSheet()
  }

  update() {
    this.scroller = new Scroller(this.container)
    this.app.ticker.add((delta) => {
      this.scroller.moveViewportXBy(this.SCROLL_SPEED)
    })
  }

  loadSpriteSheet() {
    this.app.loader.add('wall', 'images/wall.json')
    // this.app.loader.add('bg-mid', 'images/bg-mid.png')
    // this.app.loader.add('bg-far', 'images/bg-far.png')
    this.app.loader.load(this.spriteSheetLoaded.bind(this))
  }

  spriteSheetLoaded() {
    this.update()

    const sheet = this.app.loader.resources['wall']
    this.pool = new WallSpritesPool(sheet)
    this.wallSlices = []
    this.generateTestWallSpan()
    
    
  }

  borrowWallSprites = (number) => {
    let sprite = null
    for (let i = 0; i < number; i++) {
      if (i % 2 == 0) {
        sprite = this.pool.borrowWindow()
      } else {
        sprite = this.pool.borrowDecoration()
      }
      sprite.x = -32 + i * 64
      sprite.y = 128

      this.wallSlices.push(sprite)
      this.container.addChild(sprite)
    }
  }

  returnWallSprites() {
    for (let i = 0; i < this.wallSlices.length; i++) {
      const sprite = this.wallSlices[i]
      this.container.removeChild(sprite)
      if (!(i % 2)) {
        this.pool.returnWindow(sprite)
      } else {
        this.pool.returnDecoration(sprite)
      }
    }
    this.wallSlices = []
  }

  generateTestWallSpan() {
    const lookupTable = [
      this.pool.borrowFrontEdge, // 1st slice
      this.pool.borrowWindow, // 2nd slice
      this.pool.borrowDecoration, // 3rd slice
      this.pool.borrowWindow, // 4th slice
      this.pool.borrowDecoration, // 5th slice
      this.pool.borrowWindow, // 6th slice
      this.pool.borrowBackEdge, // 7th slice
    ]

    for (let i = 0; i < lookupTable.length; i++) {
      const func = lookupTable[i]

      const sprite = func.call(this.pool)
      sprite.position.x = 32 + i * 64
      sprite.position.y = 128

      this.wallSlices.push(sprite)

      this.container.addChild(sprite)
    }
  }

  clearTestWallSpan() {
    const lookupTable = [
      this.pool.returnFrontEdge, // 1st slice
      this.pool.returnWindow, // 2nd slice
      this.pool.returnDecoration, // 3rd slice
      this.pool.returnWindow, // 4th slice
      this.pool.returnDecoration, // 5th slice
      this.pool.returnWindow, // 6th slice
      this.pool.returnBackEdge, // 7th slice
    ]

    for (let i = 0; i < lookupTable.length; i++) {
      const func = lookupTable[i]
      const sprite = this.wallSlices[i]

      this.container.removeChild(sprite)
      func.call(this.pool, sprite)
    }

    this.wallSlices = []
  }
}
