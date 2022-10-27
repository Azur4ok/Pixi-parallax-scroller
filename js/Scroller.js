import { SpriteImage } from './SpriteImage.js'
import { Walls } from './Walls.js'
import { MapBuilder } from './MapBuilder.js'

export class Scroller {
  constructor(stage) {
    this.farImage = new SpriteImage('./images/bg-far.png', 512, 256)
    this.farImage.DELTA_X = 0.128
    stage.addChild(this.farImage)

    this.midImage = new SpriteImage('./images/bg-mid.png', 512, 256, null, 128)
    this.midImage.DELTA_X = 0.64
    stage.addChild(this.midImage)

    this.front = new Walls()
    stage.addChild(this.front)

    this.mapBuilder = new MapBuilder(this.front)

    this.viewportX = 0
  }

  setViewportX(viewportX) {
    this.viewportX = viewportX
    this.farImage.setViewportX(viewportX)
    this.midImage.setViewportX(viewportX)
    this.front.setViewportX(viewportX)
  }

  getViewportX() {
    return this.viewportX
  }

  moveViewportXBy(units) {
    const newViewportX = this.viewportX + units
    this.setViewportX(newViewportX)
  }
}
