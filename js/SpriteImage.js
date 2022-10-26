import * as PIXI from './pixi.mjs'

export class SpriteImage extends PIXI.TilingSprite {
  constructor(path, width, height, x = 0, y = 0, tx = 0, ty = 0) {
    super()
    const texture = PIXI.Texture.from(path)
    PIXI.TilingSprite.call(this, texture, width, height)
    this.x = x
    this.y = y
    this.tilePosition.x = tx
    this.tilePosition.y = ty
    this.viewportX = 0
    this.DELTA_X = 0
  }

  setViewportX(newViewportX) {
    const distanceTravelled = newViewportX - this.viewportX
    this.viewportX = newViewportX
    this.tilePosition.x -= distanceTravelled * this.DELTA_X
  }
}
