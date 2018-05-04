import {EventEmitter} from 'events'
import SVGUtil from '../svg-util'

export default class ExplorerUI extends EventEmitter {
  constructor() {
    super()
    this.options = {
      width: 200,
      offset: 12
    }
    this.el = SVGUtil.createElement('g', {
      transform: 'translate('+0+','+120+')',
    })
    this.wrapper = SVGUtil.createElement('rect', {
      x: 0,
      y: 0,
      width: this.options.width,
      height: 420,
      stroke: '#000',
      fill: '#fff'
    }, {
      'stroke-width': 1
    })
    this.el.appendChild(this.wrapper)
    this.list = [];
    this.items = []
  }

  getEl() {
    return this.el.getEl()
  }

  add(diagram) {
    const { offset } = this.options
    this.list.push(diagram)
    const group = SVGUtil.createElement('g', {})
    const rect = SVGUtil.createElement('rect', {
      x: 0,
      y: 0,
      width: this.options.width - offset * 2,
      height: 40,
      stroke: '#000',
      fill: '#fff'
    })
    const text = SVGUtil.createElement('text', {
      x: 20,
      y: 20
    })
    text.setTextContent(diagram.name)
    group.appendChild(rect)
    group.appendChild(text)
    group.transform('translate(' + offset + ',' + (offset + (this.list.length - 1) * 40) + ')')
    this.el.appendChild(group)
    rect.click(() => {
      this._select(rect)
      this.emit("select", {diagram: diagram})
    })
    this.items.push(rect)
  }

  _select(target) {
    this.items.forEach((item) => {
      item.attr({
        fill: '#ffffff'
      })
    })
    target.attr({
      fill: '#e0e0e0'
    })
  }

  refresh() {

  }

}

