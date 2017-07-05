import SVGUtil from './svg-util'

export default class ToolPalletUI {
  constructor() {
    this.el = SVGUtil.createElement('g', {
      transform: 'translate('+0+','+0+')',

    })
    const rect = SVGUtil.createElement('rect', {
      x: 0,
      y: 0,
      width: 240,
      height: 80,
      stroke: '#000',
      fill: '#fff'
    }, {
      'stroke-width': 1
    })
    this.el.appendChild(rect)
  }

  addItem() {
    const rect = SVGUtil.createElement('rect', {
      x: 0,
      y: 20,
      width: 40,
      height: 40,
      stroke: '#000',
      fill: '#fff'
    })
    this.el.appendChild(rect)
  }

  getEl() {
    return this.el.getEl()
  }
}