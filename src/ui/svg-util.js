class Element {

  constructor(el) {
    this.el = el
  }

  getEl() {
    return this.el
  }

  appendChild(el) {
    this.el.appendChild(el.getEl())
  }

  removeChild(el) {
    this.el.removeChild(el.getEl())
  }

  attr(options) {
    this.setAttr(options)
  }

  setAttr(options) {
    //el.setAttributeNS(null, 'transform', 'translate('+0+','+0+')')
    Object.keys(options).forEach((key)=>{
      this.el.setAttributeNS(null, key, options[key])
    })
    return this

  }

  setStyle(options) {
    this.el.style = options
  }

  className(className) {
    this.el.setAttributeNS(null, 'class', className)
  }

  transform(translate) {
    this.el.setAttributeNS(null, 'transform', translate)
  }

  getTextContent(text) {
    return this.el.textContent
  }

  setTextContent(text) {
    this.el.textContent = text
  }

  setInnerHTML(html) {
    this.el.innerHTML = html
  }

  click(onClick) {
    this.el.addEventListener('click', (e) => {
      onClick(e)
    })
  }
}

class DraggableElement extends Element {

  mouseMoveHandler(onDragging, e) {
    if(e.changedTouches && e.changedTouches.length > 0) {
      e = e.changedTouches[0]
    }
    const x = e.clientX
    const y = e.clientY
    if(this.isDragging) {
      const transform = this.el.getAttributeNS(null, 'transform')
      onDragging(x - this.draggingX, y - this.draggingY, x, y, e)
    }
  }

  mouseDownHandler(onDragging, onStart, onEnd, e) {
    if(e.changedTouches && e.changedTouches.length > 0) {
      e = e.changedTouches[0]
    }
    this.isDragging = true
    this.draggingX = e.clientX
    this.draggingY = e.clientY
    onStart(this.draggingX, this.draggingY)
    window.addEventListener('mousemove', this.mouseMoveHandler.bind(this, onDragging), false)
    window.addEventListener('touchmove', this.mouseMoveHandler.bind(this, onDragging), false)
    window.addEventListener('mouseup', this.mouseUpHandler.bind(this, onDragging, onEnd), false)
    window.addEventListener('touchend', this.mouseUpHandler.bind(this, onDragging, onEnd), false)
  }

  mouseUpHandler(onDragging, onEnd, e) {
    if(this.isDragging) {
      this.isDragging = false
      onEnd(e)
      window.removeEventListener('mousemove', this.mouseMoveHandler.bind(this, onDragging), false)
      window.removeEventListener('touchmove', this.mouseMoveHandler.bind(this, onDragging), false)
      window.removeEventListener('mouseup', this.mouseUpHandler.bind(this, onEnd), false)
      window.removeEventListener('touchend', this.mouseUpHandler.bind(this, onEnd), false)
    }
  }

  drag(onDragging, onStart, onEnd) {
    //dammy dragging elementが必要？
    this.el.addEventListener('mousedown', this.mouseDownHandler.bind(this, onDragging, onStart, onEnd), false)
    this.el.addEventListener('touchstart', this.mouseDownHandler.bind(this, onDragging, onStart, onEnd), false)

  }

}

const createElement = function(type, _options, style) {
  let options = _options || {}
  const el = window.document.createElementNS('http://www.w3.org/2000/svg', type);
  //el.setAttributeNS(null, 'transform', 'translate('+0+','+0+')')
  Object.keys(options).forEach((key)=>{
    el.setAttributeNS(null, key, options[key])
  })
  if(style) {
    //el.style = style
  }
  return new Element(el)
}

const createDraggableElement = function(type, options, style) {
  const el = window.document.createElementNS('http://www.w3.org/2000/svg', type);
  //el.setAttributeNS(null, 'transform', 'translate('+0+','+0+')')
  Object.keys(options).forEach((key)=>{
    el.setAttributeNS(null, key, options[key])
  })
  if(style) {
    el.style = style
  }
  return new DraggableElement(el)
}

const SVGUtil = {
  Element,
  DraggableElement,
  createElement,
  createDraggableElement
}

export default SVGUtil