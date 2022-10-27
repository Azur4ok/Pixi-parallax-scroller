import * as PIXI from './pixi.mjs'

export class WallSpritesPool {
  constructor() {
    this.sheet = PIXI.Loader.shared.resources['wall'].spritesheet
    this.createWindows()
    this.createDecorations()
    this.createFrontEdges()
    this.createBackEdges()
    this.createSteps()
  }

  borrowFrontEdge = () => this.frontEdges.shift()

  returnFrontEdge(sprite) {
    this.frontEdges.push(sprite)
  }

  borrowBackEdge = () => this.backEdges.shift()

  returnBackEdge(sprite) {
    this.backEdges.push(sprite)
  }

  borrowStep = () => this.steps.shift()

  returnStep(sprite) {
    this.steps.push(sprite)
  }

  borrowDecoration = () => this.decorations.shift()

  returnDecoration(sprite) {
    this.decorations.push(sprite)
  }

  borrowWindow = () => this.windows.shift()

  returnWindow(sprite) {
    this.windows.push(sprite)
  }

  createWindows() {
    this.windows = []

    this.addWindowSprites(6, 'window_01')
    this.addWindowSprites(6, 'window_02')

    this.shuffle(this.windows)
  }

  createDecorations() {
    this.decorations = []

    this.addDecorationSprites(6, 'decoration_01')
    this.addDecorationSprites(6, 'decoration_02')
    this.addDecorationSprites(6, 'decoration_03')

    this.shuffle(this.decorations)
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

  createSteps() {
    this.steps = []
    this.addStepSprites(2, 'step_01')
  }

  addWindowSprites(amount, frameId) {
    for (let i = 0; i < amount; i++) {
      const sprite = new PIXI.Sprite.from(this.sheet.textures[frameId])
      this.windows.push(sprite)
    }
  }

  addDecorationSprites(amount, frameId) {
    for (let i = 0; i < amount; i++) {
      const sprite = new PIXI.Sprite.from(this.sheet.textures[frameId])
      this.decorations.push(sprite)
    }
  }

  addFrontEdgeSprites(amount, frameId) {
    for (let i = 0; i < amount; i++) {
      const sprite = new PIXI.Sprite.from(this.sheet.textures[frameId])
      this.frontEdges.push(sprite)
    }
  }

  addBackEdgeSprites(amount, frameId) {
    for (let i = 0; i < amount; i++) {
      const sprite = new PIXI.Sprite.from(this.sheet.textures[frameId])
      sprite.anchor.x = 1
      sprite.scale.x = -1
      this.backEdges.push(sprite)
    }
  }

  addStepSprites(amount, frameId) {
    for (let i = 0; i < amount; i++) {
      const sprite = PIXI.Sprite.from(this.sheet.textures[frameId])
      sprite.anchor.y = 0.25
      this.steps.push(sprite)
    }
  }

  shuffle(array) {
    const length = array.length
    const shuffles = length * 3
    for (let i = 0; i < shuffles; i++) {
      const wallSlice = array.pop()
      const position = Math.floor(Math.random() * (length - 1))
      array.splice(position, 0, wallSlice)
    }
  }
}
