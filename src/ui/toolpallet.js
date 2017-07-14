import SVGUtil from './svg-util'
import Style from './icon.css'

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

  addItem(name, className) {
    const group = SVGUtil.createElement('g', {})
    const rect = SVGUtil.createElement('foreignObject', {
      x: 0,
      y: 20,
      width: 60,
      height: 60
      //stroke: '#000',
      //fill: `url(${selectIcon})`
      //opacity: 0,
      //"background-image": `url(${selectIcon})`
    })
    const div = document.createElement('div')
    rect.el.appendChild(div)
    div.classList.add(Style[className || 'selectIcon'])
    /*
    const text = SVGUtil.createElement('text', {
      x: 0,
      y: 40,
      text: name
    })
    text.el.textContent = name
    */
    group.transform('translate('+(this.items.length*42)+',0)')
    group.appendChild(rect)
    //group.appendChild(text)
    this.el.appendChild(group)
    rect.click(() => {
      this.selectedToolName = name
      this._select(div)
    })
    this.selectedToolName = name
    this.items.push(div)
    this._select(div)
  }

  _select(target) {
    this.items.forEach((item) => {
      item.style['border'] = 'solid 1px #333'
    })
    target.style['border'] = 'solid 2px #55e'
  }

  getSelectedToolName() {
    return this.selectedToolName
  }

  getEl() {
    return this.el.getEl()
  }
}

