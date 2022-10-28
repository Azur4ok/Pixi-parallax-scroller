import * as PIXI from './pixi.mjs'

import { Scroller } from './Scroller.js'
import { WallSpritesPool } from './WallSpritesPool.js'

export class Main {
  static MIN_SCROLL_SPEED = 5
  static MAX_SCROLL_SPEED = 15
  static SCROLL_ACCELERATION = 0.005
  constructor() {
    this.app = new PIXI.Application({ width: 512, height: 384 })
    this.container = new PIXI.Container()

    this.app.stage.addChild(this.container)
    document.body.append(this.app.view)
    this.scrollSpeed = Main.MIN_SCROLL_SPEED
    this.loadSpriteSheet()
  }

  loadSpriteSheet() {
    const loader = PIXI.Loader.shared
    loader.add('wall', 'images/wall.json')
    loader.load(this.spriteSheetLoaded)
  }

  update() {
    this.scroller = new Scroller(this.container)
    this.scrollSpeed += Main.SCROLL_ACCELERATION
    if (this.scrollSpeed > Main.MAX_SCROLL_SPEED) {
      this.scrollSpeed = Main.MAX_SCROLL_SPEED
    }
    this.app.ticker.add((delta) => {
      this.scroller.moveViewportXBy(this.scrollSpeed)
    })
  }

  spriteSheetLoaded = () => {
    this.update()
  }
}
