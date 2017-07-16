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

  click(onClick) {
    this.el.addEventListener('click', (e) => {
      onClick(e)
    })
  }
}

class DraggableElement extends Element {

  drag(onDragging, onStart, onEnd) {
    //dammy dragging elementが必要？
    window.addEventListener('mousemove', (e) => {
      const x = e.clientX
      const y = e.clientY
      if(this.isDragging) {
        const transform = this.el.getAttributeNS(null, 'transform')
        onDragging(x - this.draggingX, y - this.draggingY, x, y, e)
      }
    }, false)
    /*
    this.el.addEventListener('mouseout', (e) => {
      if(this.isDragging) {
        this.isDragging = false
        onEnd()
      }
    })
    */
    window.addEventListener('mouseup', (e) => {
      if(this.isDragging) {
        this.isDragging = false
        onEnd(e)
      }
    }, false)
    this.el.addEventListener('mousedown', (e) => {
      this.isDragging = true
      this.draggingX = e.clientX
      this.draggingY = e.clientY
      onStart(this.draggingX, this.draggingY)
    }, false)
  }

}

const createElement = function(type, options, style) {
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