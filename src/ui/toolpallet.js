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
    this.length = 0
    this.items = []
  }

  addItem(name) {
    const group = SVGUtil.createElement('g', {})
    const rect = SVGUtil.createElement('rect', {
      x: 0,
      y: 20,
      width: 40,
      height: 40,
      stroke: '#000',
      fill: '#fff'
    })
    const text = SVGUtil.createElement('text', {
      x: 0,
      y: 40,
      text: name
    })
    text.el.textContent = name
    group.transform('translate('+(this.items.length*42)+',0)')
    group.appendChild(rect)
    group.appendChild(text)
    this.el.appendChild(group)
    rect.click(() => {
      this.selectedToolName = name
      this._select(rect)
    })
    this.selectedToolName = name
    this.items.push(rect)
    this._select(rect)
  }

  _select(target) {
    this.items.forEach((item) => {
      item.attr({
        stroke: '#000'
      })
    })
    target.attr({
      stroke: '#0ff'
    })
  }

  getSelectedToolName() {
    return this.selectedToolName
  }

  getEl() {
    return this.el.getEl()
  }
}