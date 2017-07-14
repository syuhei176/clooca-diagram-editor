import SVGUtil from '../ui/svg-util'

function Connection(id, s, diagram, start, end) {
	var self = this;
	this.id = id;
  this.start = {};
  this.end = {};
  this.elem = SVGUtil.createElement('path', {
    d: "M0 0L0 0",
    fill: "none",
    stroke: "#333",
    strokeWidth: 4
  })

  this.coll = SVGUtil.createDraggableElement('path', {
    d: "M0 0L0 0",
    visibility : "hidden",
    "pointer-events" : "stroke",
    strokeWidth: 20
  })

	this.coll.className("node");

	diagram.getGroup().appendChild(this.elem);
	diagram.getGroup().appendChild(this.coll);

	this.setStartPos(start.getX(), start.getY());
	this.setEndPos(end.getX(), end.getY());
  start.addConnection(this)
  end.addConnection(this)
  start.on('move', ()=>{
    this.setStartPos(start.getX(), start.getY());
    this.refresh()
  })
  end.on('move', ()=>{
    this.setEndPos(end.getX(), end.getY());
    this.refresh()
  })

	this.base_start = {};
	this.base_end = {};
	this.listeners = {
		onclick : null,
		onmove : null
	};
	this.coll.drag(function(dx, dy, x, y, e) {
		self.setStartPos(self.base_start.x + dx, self.base_start.y + dy);
		self.setEndPos(self.base_end.x + dx, self.base_end.y + dy);
		if(self.listeners.onmove) self.listeners.onmove();
	}, function(x, y) {
		self.base_start.x = self.start.x;
		self.base_start.y = self.start.y;
		self.base_end.x = self.end.x;
		self.base_end.y = self.end.y;
	}, function(e) {
		diagram.fireOnConUpdate(self);
	});
	this.coll.click(function() {
		if(self.listeners.onclick) self.listeners.onclick();
	});
}


Connection.prototype.onclick = function(onclick) {
	this.listeners.onclick = onclick;
}

Connection.prototype.onmove = function(onmove) {
	this.listeners.onmove = onmove;
}

Connection.prototype.off = function(event) {
	this.listeners[event] = null;
}

Connection.prototype.setStartPos = function(x, y) {
	this.start.x = x;
	this.start.y = y;
	this.refresh();
}

Connection.prototype.setEndPos = function(x, y) {
	this.end.x = x;
	this.end.y = y;
	this.refresh();
}

Connection.prototype.getStartPos = function() {
	return this.start;
}

Connection.prototype.getEndPos = function() {
	return this.end;
}

Connection.prototype.refresh = function() {
	this.elem.attr({
		d : "M"+this.start.x+" "+this.start.y+"L"+this.end.x+" "+this.end.y
	});
	this.coll.attr({
		d : "M"+this.start.x+" "+this.start.y+"L"+this.end.x+" "+this.end.y
	});
}

export default Connection;
