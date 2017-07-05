var Node = require('./node');
var Connection = require('./edge');
import {EventEmitter} from 'events'

export default class Diagram extends EventEmitter {

  constructor(s) {
    super()
    this.snap = s;
    this.base = this.snap.group();
    var gui_group = this.snap.group();

    this.nodes = {};
    this.connections = {};

  }

  getGroup() {
    return this.base;
  }

  addNode(id, type, bound) {

    var node = new Node(id, this.snap, this, bound, type);
    node.onclick(() => {
      this.emit("nodeClicked", {node: node})
    });
    this.nodes[id] = node;
    return node

  }

  remove(id) {
    var self = this;
    var elem = this.nodes[id];
    if(elem) {
      elem.remove();
    }else{
        elem = this.connections[id];
        elem.remove();
    }
  }

  updateNode(id, bound) {
    var self = this;
    this.nodes[id].setPos(bound.x, bound.y);
    this.nodes[id].setSize(bound.w, bound.h);
  }

  addConnection(id, start, end) {

    var con = new Connection(id, this.snap, this, start, end);
    con.onclick(() => {
      this.connection_selector.setTarget(con);
    });
    this.connections[id] = con;

  }

  updateConnection(id, start, end) {
    var self = this;
    this.connections[id].setStartPos(start.x, start.y);
    this.connections[id].setEndPos(end.x, end.y);
  }
}
