import Diagram from '../../diagram/diagram'
import uuid from 'uuid'
import {EventEmitter} from 'events'
import ToolPallet from '../../ui/toolpallet'
import ExplorerUI from '../../ui/explorer'
import {Selector, ConnectionSelector} from '../../ui/selector'
import SVGUtil from '../../ui/svg-util'

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
    this.loadDiagram({})

    this.selector.on('rubberbundend', (e) => {
      const start = this.diagram.getNode(e.startId)
      if(e.endId) {
        // ノードに繋げる
        const end = this.diagram.getNode(e.endId)
        this.addConnection(start, end, {})
      }else{
        // 新しくノードを作成して、繋げる
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
      let shape = this.toolpallet.getSelectedShape()
      if(toolName == "select") {

      }else{
        this.addNode({
          bound: {
            x: e.x,
            y: e.y,
            w: 100,
            h: 100
          },
          shape: shape
        });
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
      this.emit('click', {
        x: e.clientX,
        y: e.clientY
      })
      this.selector.clear();
      this.connection_selector.clear();

    }, false)
    this.el.appendChild(layer)

  }


  addTopGUILayer() {
    if(this.topGUILayer)
      this.el.removeChild(this.topGUILayer.getEl())
    this.topGUILayer = SVGUtil.createElement('g', {})
    this.topGUILayer.appendChild(this.selector)
    this.topGUILayer.appendChild(this.connection_selector)
    this.el.appendChild(this.topGUILayer.getEl())
  }

  load(d) {
    this.loadDiagram(d)
  }

  loadDiagram(d) {
    if(this.diagram) {
      this.diagram.removeSelf(this.el)
    }
    this.diagram = new Diagram(this.el);
    this.addTopGUILayer()
    this.diagram.on('nodeClicked', (e) => {
      this.selector.setTarget(e.node)
    })
    this.diagram.on('connClicked', (e) => {
      this.connection_selector.setTarget(e.conn);
    })
    if(d.data) {
      d.data.nodes.forEach((n) => {
        const node = this.diagram.addNode(n.id, n.bound, n.options);
        if(n.properties[0])
          node.updateText(n.properties[0])
      })
      d.data.edges.forEach((e) => {
        const conn = this.diagram.addConnection(
          e.id,
          this.diagram.getNode(e.start),
          this.diagram.getNode(e.end)
        );
        if(e.properties[0])
          conn.updateText(e.properties[0])
      })
    }else{
      d.data = {
        nodes: [],
        edges: []
      }
    }
    this.currentDiagramData = d;
  }

  serializeDiagram() {
    return this.diagram.toJson()
  }

  addNode(_options) {
    var options = _options || {};
    var id = options.id || uuid();
    var bound = options.bound || {x:0,y:0,w:100,h:40};
    var node = this.diagram.addNode(id, bound, options);
    this.emit('addNode', {node:node})
    node.on('nodeupdate', (node) => {
      this.currentDiagramData.data = this.serializeDiagram()
    })
    this.currentDiagramData.data = this.serializeDiagram()
    return node;
  }

  addConnection(src, target, _options) {
    var options = _options || {};
    var id = options.id || uuid();
    this.diagram.addConnection(id, src, target)

    this.currentDiagramData.data = this.serializeDiagram()
  }

  createToolPallet() {
    this.toolpallet = new ToolPallet()
    this.el.appendChild(this.toolpallet.getEl());
    //this.toolpallet.onSelect()
    return this.toolpallet;
  }

  createExplorer() {
    this.explorer = new ExplorerUI()
    this.el.appendChild(this.explorer.getEl());
    return this.explorer;
  }

}

export {DiagramEditor}
