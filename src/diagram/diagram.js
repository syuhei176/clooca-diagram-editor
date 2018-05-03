import Node from './node'
import Connection from './edge'
import SVGUtil from '../ui/svg-util'
import {EventEmitter} from 'events'

export default class Diagram extends EventEmitter {

  constructor(rootElement) {
    super()
    this.base = SVGUtil.createElement('g', {})
    rootElement.appendChild(this.base.getEl())
    this.nodes = {};
    this.connections = {};
  }

  removeSelf(rootElement) {
    rootElement.removeChild(this.base.getEl())
  }

  getGroup() {
    return this.base;
  }

  addNode(id, bound, options) {

    var node = new Node(id, this, bound, options);
    node.on('click', () => {
      this.emit("nodeClicked", {node: node})
    });
    this.nodes[id] = node;
    return node

  }

  removeNode(id) {
    delete this.nodes[id];
  }

  updateNode(id, bound) {
    var self = this;
    this.nodes[id].setPos(bound.x, bound.y);
    this.nodes[id].setSize(bound.w, bound.h);
  }

  addConnection(id, start, end) {

    var conn = new Connection(id, this.snap, this, start, end);
    conn.on('click', () => {
      this.emit("connClicked", {conn: conn})
    });
    this.connections[id] = conn;
    return conn
    
  }

  updateConnection(id, start, end) {
    var self = this;
    this.connections[id].setStartPos(start.x, start.y);
    this.connections[id].setEndPos(end.x, end.y);
  }

  getNode(id) {
    return this.nodes[id]
  }

  toJson() {
    let nodes = Object.keys(this.nodes).map((id) => {
      return this.nodes[id].toJson()
    })
    let edges = Object.keys(this.connections).map((id) => {
      const edge = this.connections[id]
      return edge.toJson()
    })
    return {
      nodes: nodes,
      edges: edges
    }
  }

}
