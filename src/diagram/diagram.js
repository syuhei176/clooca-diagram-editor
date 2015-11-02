var Node = require('./node');
var Connection = require('./edge');
var Selector = require('./selector');

function Diagram(s) {
	var self = this;
	this.snap = s;
	this.base = this.snap.group();
    var base_rect = this.snap.rect(0, 0, 1200, 800);
    this.base.append(base_rect);
    var gui_group = this.snap.group();
    base_rect.attr({
    	visibility : "hidden",
    	"pointer-events" : "fill"
    });
    this.selector = new Selector.Selector(s, gui_group);
    this.connection_selector = new Selector.ConnectionSelector(s, gui_group);
    base_rect.mousedown(function() {
    	self.selector.clear();
    	self.connection_selector.clear();
    });

    this.listeners = {
    	nodeupdate : [],
    	noderemove : [],
    	conupdate : []
    };
    this.nodes = {};
    this.connections = {};

    this.selector.on("changed", function(node) {
    	self.fireOnNodeUpdate(node);
    });
    this.selector.on("removed", function(node) {
    	self.fireOnNodeRemove(node);
    });
    this.connection_selector.on("changed", function(con) {
    	self.fireOnConUpdate(con);
    });
}

Diagram.prototype.getGroup = function() {
	return this.base;
}

Diagram.prototype.addNode = function(id, type, bound) {
	var self = this;
	var node = new Node(id, this.snap, this, bound, type);
	node.onclick(function() {
		self.selector.setTarget(node);
	});
	this.nodes[id] = node;
}

Diagram.prototype.remove = function(id) {
	var self = this;
	var elem = this.nodes[id];
	if(elem) {
		elem.remove();
	}else{
    	elem = this.connections[id];
    	elem.remove();
	}
}


Diagram.prototype.updateNode = function(id, bound) {
	var self = this;
	this.nodes[id].setPos(bound.x, bound.y);
	this.nodes[id].setSize(bound.w, bound.h);
}

Diagram.prototype.addConnection = function(id, start, end) {
	var self = this;
	var con = new Connection(id, this.snap, this, start, end);
	con.onclick(function() {
		self.connection_selector.setTarget(con);
	});
	this.connections[id] = con;
}

Diagram.prototype.updateConnection = function(id, start, end) {
	var self = this;
	this.connections[id].setStartPos(start.x, start.y);
	this.connections[id].setEndPos(end.x, end.y);
}

Diagram.prototype.on = function(event, cb) {
	this.listeners[event].push(cb);
}

Diagram.prototype.fireOnNodeRemove = function(e) {
	this.listeners["noderemove"].forEach(function(l) {
		l(e);
	});
}

Diagram.prototype.fireOnNodeUpdate = function(e) {
	this.listeners["nodeupdate"].forEach(function(l) {
		l(e);
	});
}

Diagram.prototype.fireOnConUpdate = function(e) {
	this.listeners["conupdate"].forEach(function(l) {
		l(e);
	});
}

module.exports = Diagram;

