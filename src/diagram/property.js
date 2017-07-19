import {EventEmitter} from 'events'
import SVGUtil from '../ui/svg-util'

export default class Property extends EventEmitter {

	constructor(options) {
		super()
	  this.gElement = SVGUtil.createDraggableElement('g', {
    })
		this.gElement.transform("translate(0,20)");
    //this.clearText()
    this.fontSize = 14
    this.options = options
  }

  clearText() {
    if(this.gElement2)
      this.gElement.removeChild(this.gElement2)
	  this.gElement2 = SVGUtil.createDraggableElement('g', {
      'font-family': "sans-serif",
      'font-size': this.fontSize
    })
    this.gElement.appendChild(this.gElement2)
    /*
	  this.textElement = SVGUtil.createDraggableElement('text', {
      "y": 0,
      "fill": "#333"
    })
    this.gElement2.appendChild(this.textElement)
    this.textElement.click(() => {
      console.log('click')
      this.showTextarea()
    })
    */

  }

  updateText(text) {
    this.currentText = text
    this.clearText()
    let lines = text.split("\n")
    let elements = lines.map((line, i) => {
      let textElement = SVGUtil.createDraggableElement('text', {
        "y": 20 * i,
        "fill": "#333"
      })
      textElement.setTextContent(line)
      textElement.click(() => {
        console.log('click')
        this.showTextarea()
      })
      this.gElement2.appendChild(textElement)
      return textElement
    })
  }

  showTextarea() {
    if(this.textAreaDisplayed) return
    this.textAreaDisplayed = true
    this.foreignObject = SVGUtil.createElement('foreignObject', {
      width: this.options.node.getWidth(),
      height: this.options.node.getHeight(),
      y: -20
      //requiredExtensions: "http://www.w3.org/1999/xhtml"
    })
    const textArea = document.createElement('textarea')
    textArea.value = this.currentText
    textArea.style['font-size'] = this.fontSize
    textArea.style['margin-top'] = '0px'
    textArea.style['width'] = this.options.node.getWidth() + 'px'
    //textArea.style['height'] = this.options.node.getHeight() + 'px'
    
    this.foreignObject.el.appendChild(textArea)
    this.gElement2.appendChild(this.foreignObject)
    textArea.addEventListener('change', ()=>{
      this.updateText(textArea.value)
      //this.hideTextarea()
      this.textAreaDisplayed = false
      this.emit('change', this)
    })
    textArea.addEventListener('blur', ()=>{
      this.updateText(textArea.value)
      this.textAreaDisplayed = false
    })
    textArea.addEventListener('keydown', ()=>{
      textArea.rows = textArea.value.split('\n').length + 1
    })
    textArea.rows = textArea.value.split('\n').length + 1
  }

  hideTextarea() {
    if(this.foreignObject)
      this.gElement2.removeChild(this.foreignObject)
  }

  getHeight() {
    return this.currentText.split("\n").length * 20
  }

  getEl() {
    return this.gElement
  }

}