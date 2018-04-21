import SVGUtil from './svg-util'
import Style from './icon.css'

export default class ToolPalletUI {
  constructor() {
    this.el = SVGUtil.createElement('g', {
      transform: 'translate('+0+','+0+')',

    })
    this.wrapper = SVGUtil.createElement('rect', {
      x: 0,
      y: 0,
      width: 240,
      height: 80,
      stroke: '#000',
      fill: '#fff'
    }, {
      'stroke-width': 1
    })
    this.el.appendChild(this.wrapper)
    this.length = 0
    this.items = []
  }

  addItem(name, className, shape) {
    const group = SVGUtil.createElement('g', {})
    const rect = SVGUtil.createElement('rect', {
      x: 0,
      y: 10,
      width: 60,
      height: 60,
      fill: '#555',
      opacity: 0.5,
      'stroke-width': 2
    })
    group.appendChild(rect)

    if(shape) {
      const inner = SVGUtil.createElement('g', {})
      group.appendChild(inner)
      inner.setInnerHTML(shape.svg)
      inner.transform('scale('+(40/120)+','+(40/120)+')')
    }else{
      const foreignObject = SVGUtil.createElement('foreignObject', {
        x: 0,
        y: 20,
        width: 40,
        height: 40
        //stroke: '#000',
        //fill: `url(${selectIcon})`
        //opacity: 0,
        //"background-image": `url(${selectIcon})`
      })
      const div = document.createElement('div')
      foreignObject.el.appendChild(div)
      div.classList.add(Style[className || 'selectIcon'])
      group.appendChild(foreignObject)
    }

    group.click(() => {
      this.selectedToolName = name
      this.selectedShape = shape
      this._select(rect)
    })
    this.items.push(rect)
    this._select(rect)
    /*
    const text = SVGUtil.createElement('text', {
      x: 0,
      y: 40,
      text: name
    })
    text.el.textContent = name
    */
    group.transform('translate('+ (this.getWidth() - 64) +',0)')
    this.wrapper.setAttr({
      'width': this.getWidth()
    })
    //group.appendChild(text)
    this.el.appendChild(group)
    this.selectedToolName = name
  }

  getWidth() {
    return this.items.length*62 + 6;
  }

  _select(target) {
    this.items.forEach((item) => {
      item.attr({
        fill: '#555',
        stroke: '#333'
      })
    })
    target.attr({
      fill: '#424242',
      stroke: '#55e'
    })
  }

  getSelectedToolName() {
    return this.selectedToolName
  }

  getSelectedShape() {
    return this.selectedShape
  }

  getEl() {
    return this.el.getEl()
  }
}

