import Diagram from './diagram/diagram'
import uuid from 'uuid'
import {EventEmitter} from 'events'
import ToolPallet from './ui/toolpallet'
import {Selector, ConnectionSelector} from './ui/selector'
import SVGUtil from './ui/svg-util'

class DiagramEditor extends EventEmitter {
  constructor(el) {
    super()
    this.wrapper = window.document.getElementById(el);
    this.el = window.document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.browserSize = {
      width: window.innerWidth || document.body.clientWidth,
      height: window.innerHeight || document.body.clientHeight
    }
    this.el.style.width = this.browserSize.width + 'px'
    this.el.style.height = this.browserSize.height + 'px'
    //this.el.setAttributeNS('http://www.w3.org/2000/svg', 'width', 500)
    //this.el.setAttributeNS('http://www.w3.org/2000/svg', 'height', 500)
    this.wrapper.appendChild(this.el);



    this.selector = new Selector();
    this.connection_selector = new ConnectionSelector();
    this.addGUILayer()
    this.diagram = new Diagram(this.el);
    this.addTopGUILayer()

    this.diagram.on('nodeClicked', (e) => {
      this.selector.setTarget(e.node)
    })
    this.diagram.on('connClicked', (e) => {
      
      this.connection_selector.setTarget(e.conn);
    })

    this.selector.on('rubberbundend', (e) => {
      const start = this.diagram.getNode(e.startId)
      if(e.endId) {
        const end = this.diagram.getNode(e.endId)
        this.addConnection(start, end, {})
      }else{
        const newNode = this.addNode({
          bound: {
            x: e.event.x,
            y: e.event.y,
            w: 100,
            h: 100
          }
        });
        this.addConnection(start, newNode, {})
      }
    })

  }

  addGUILayer() {
    const layer = window.document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const layerClicker = window.document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    layer.setAttributeNS(null, 'transform', 'translate('+0+','+0+')')
    layerClicker.setAttributeNS(null, 'x', 0)
    layerClicker.setAttributeNS(null, 'y', 0)
    layerClicker.setAttributeNS(null, 'width', this.browserSize.width)
    layerClicker.setAttributeNS(null, 'height', this.browserSize.height)
    layerClicker.setAttributeNS(null, 'stroke', '#000')
    layerClicker.setAttributeNS(null, 'fill', '#fff')
    layerClicker.setAttributeNS(null, 'visibility', 'hidden')
    layerClicker.setAttributeNS(null, 'pointer-events', 'fill')
    /*
    base_rect.attr({
      visibility : "hidden",
      "pointer-events" : "fill"
    });
    */

    layer.appendChild(layerClicker)
    layerClicker.addEventListener('click', (e)=>{
      console.log(e)
      this.emit('click', {
        x: e.clientX,
        y: e.clientY
      })
      this.selector.clear();
      this.connection_selector.clear();

    }, false)
    this.el.appendChild(layer)

    this.selector.on("changed", (node) => {
      this.emit('nodeupdate', node)
    });
    this.selector.on("removed", function(node) {
      this.emit('noderemove', node)
    });
    this.connection_selector.on("changed", function(con) {
      this.emit('conupdate', con)
    });
    this.on('click', (e) => {
      let toolName = this.toolpallet.getSelectedToolName()
      if(toolName == "select") {

      }else{
        this.addNode({
          bound: {
            x: e.x,
            y: e.y,
            w: 100,
            h: 100
          }
        });
      }
    })

  }

  addTopGUILayer() {
    this.topGUILayer = SVGUtil.createElement('g', {})
    this.topGUILayer.appendChild(this.selector)
    this.topGUILayer.appendChild(this.connection_selector)
    this.el.appendChild(this.topGUILayer.getEl())
  }

  addNode(_options) {
    var options = _options || {};
    var id = options.id || uuid();
    var bound = options.bound || {x:0,y:0,w:100,h:40};
    var node = this.diagram.addNode(id, bound, options);
    this.emit('addNode', {node:node})
    return node;
  }

  addConnection(src, target, _options) {
    var options = _options || {};
    var id = options.id || uuid();
    this.diagram.addConnection(id, src, target)
  }

  createToolPallet(toolpallet) {
    this.toolpallet = new ToolPallet()
    this.el.appendChild(this.toolpallet.getEl());
    //this.toolpallet.onSelect()
    return this.toolpallet;
  }
}

export {DiagramEditor}
