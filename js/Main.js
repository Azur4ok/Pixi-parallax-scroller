import { Scroller } from './Scroller.js'

export class Main {
  constructor() {
    this.SCROLL_SPEED = 5
    this.app = new PIXI.Application({ width: 512, height: 384 })
    this.container = new PIXI.Container()

    this.app.stage.addChild(this.container)
    document.querySelector('main').append(this.app.view)

    this.loadSpriteSheet()
  }

  loadSpriteSheet() {
    const loader = new PIXI.Loader()
    loader.add('wall', 'wall.json')
    loader.add('bg-mid', 'images/bg-mid.png')
    loader.add('bg-far', 'images/bg-far.png')
    loader.onComplete.add(this.spriteSheetLoaded.bind(this))
    loader.load()
    console.log(loader.resources.wall)
  }

  async spriteSheetLoaded() {
    this.scroller = new Scroller(this.container)
    this.app.ticker.add((delta) => {
      this.scroller.moveViewportXBy(this.SCROLL_SPEED)
    })

  }
}
