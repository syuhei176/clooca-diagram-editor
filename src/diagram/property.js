import {EventEmitter} from 'events'
import SVGUtil from '../ui/svg-util'

export default class Property extends EventEmitter {

	constructor(id, diagram, bound, type) {
		super()
	  this.gElement = SVGUtil.createDraggableElement('g', {})
	  this.textElement = SVGUtil.createDraggableElement('text', {})
    this.gElement.appendChild(this.textElement)
    this.textElement.click(() => {
      this.showTextarea()
    })
		this.gElement.transform("translate(0,20)");
  }

  updateText(text) {
    this.textElement.setTextContent(text)
  }

  showTextarea() {
    let text = this.textElement.getTextContent()
    this.foreignObject = SVGUtil.createElement('foreignObject', {})
    const textArea = document.createElement('textarea')
    textArea.value = text
    this.foreignObject.el.appendChild(textArea)
    this.gElement.appendChild(this.foreignObject)
    textArea.addEventListener('blur', ()=>{
      this.updateText(textArea.value)
      this.hideTextarea()
    })
  }

  hideTextarea() {
     this.gElement.removeChild(this.foreignObject)
  }

  getEl() {
    return this.gElement
  }

}