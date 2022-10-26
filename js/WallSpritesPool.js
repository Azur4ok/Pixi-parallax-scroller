import * as PIXI from './pixi.mjs'

export class WallSpritesPool {
  constructor(sheet) {
    this.sheet = sheet

    this.createWindows()
    this.createDecorations()
    this.createFrontEdges()
    this.createBackEdges()
  }

  createFrontEdges() {
    this.frontEdges = []

    this.addFrontEdgeSprites(2, 'edge_01')
    this.addFrontEdgeSprites(2, 'edge_02')

    this.shuffle(this.frontEdges)
  }

  createBackEdges() {
    this.backEdges = []

    this.addBackEdgeSprites(2, 'edge_01')
    this.addBackEdgeSprites(2, 'edge_02')

    this.shuffle(this.backEdges)
  }

  addFrontEdgeSprites(amount, frameId) {
    for (let i = 0; i < amount; i++) {
      const sprite = new PIXI.Sprite(this.sheet.textures[frameId])
      this.frontEdges.push(sprite)
    }
  }

  addBackEdgeSprites(amount, frameId) {
    for (let i = 0; i < amount; i++) {
      const sprite = new PIXI.Sprite(this.sheet.textures[frameId])
      sprite.anchor.x = 1
      sprite.scale.x = -1
      this.backEdges.push(sprite)
    }
  }

  borrowFrontEdge() {
    return this.frontEdges.shift()
  }

  returnFrontEdge(sprite) {
    this.frontEdges.push(sprite)
  }

  borrowBackEdge() {
    return this.backEdges.shift()
  }

  returnBackEdge(sprite) {
    this.backEdges.push(sprite)
  }

  createWindows() {
    this.windows = []

    this.addWindowSprites(6, 'window_01')
    this.addWindowSprites(6, 'window_02')

    this.shuffle(this.windows)
  }

  createDecorations() {
    this.decorations = []

    this.addDecorationsSprites(6, 'decoration_01')
    this.addDecorationsSprites(6, 'decoration_02')
    this.addDecorationsSprites(6, 'decoration_03')

    this.shuffle(this.decorations)
  }

  addDecorationsSprites(amount, frameId) {
    for (let i = 0; i < amount; i++) {
      const sprite = new PIXI.Sprite(this.sheet.textures[frameId])
      this.decorations.push(sprite)
    }
  }

  borrowDecoration() {
    return this.decorations.shift()
  }

  returnDecoration(sprite) {
    this.decorations.push(sprite)
  }

  borrowWindow() {
    return this.windows.shift()
  }

  returnWindow(sprite) {
    this.windows.push(sprite)
  }

  addWindowSprites(amount, frameId) {
    for (let i = 0; i < amount; i++) {
      const sprite = new PIXI.Sprite(this.sheet.textures[frameId])
      this.windows.push(sprite)
    }
  }

  shuffle(arr) {
    const length = arr.length
    const shuffles = length * 3
    for (let i = 0; i < shuffles; i++) {
      const wallSlice = arr.pop()
      const position = Math.floor(Math.random * (length - 1))
      arr.splice(position, 0, wallSlice)
    }
  }
}
