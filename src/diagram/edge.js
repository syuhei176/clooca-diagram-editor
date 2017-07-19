import SVGUtil from '../ui/svg-util'

function Connection(id, s, diagram, start, end) {
	var self = this;
	this.id = id;
  this.start = {};
  this.end = {};
	this.points = [{}, {}]
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
	
	this.setStartPos(start, end);
	this.setEndPos(start, end);

  start.addConnection(this)
  end.addConnection(this)
  start.on('move', ()=>{
		this.setStartPos(start, end);
    this.setEndPos(start, end);
    this.refresh()
  })
  end.on('move', ()=>{
		this.setStartPos(start, end);
    this.setEndPos(start, end);
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

Connection.prototype.checkRelPos = function(start, end) {
	let area;
	if(start.getX() + start.getWidth() < end.getX()) {
		area = 2
	}else if(start.getX() > (end.getX() + end.getWidth()) ) {
		area = 1
	}else{
		if(start.getY() + start.getHeight() < end.getY()) {
			area = 4
		}else if(start.getY() > end.getY()) {
			area = 3
		}else{
			area = 3
		}
	}
	return area
}

Connection.prototype.setStartPos = function(start, end) {
	let area = this.checkRelPos(start, end);
	if(area == 1) {
		this.start.x = start.getX()
		this.start.y = start.getY() + (start.getHeight() / 2)
	}else if(area == 2) {
		this.start.x = start.getX() + start.getWidth()
		this.start.y = start.getY() + (start.getHeight() / 2)
	}else if(area == 3) {
		this.start.x = start.getX() + (start.getWidth() / 2)
		this.start.y = start.getY()
	}else if(area == 4) {
		this.start.x = start.getX() + (start.getWidth() / 2)
		this.start.y = start.getY() + start.getHeight()
	}
	this.points[0].x = this.start.x
	this.points[0].y = this.start.y
	this.refresh();
}

Connection.prototype.setEndPos = function(start, end) {
	let area = this.checkRelPos(end, start);
	if(area == 1) {
		this.end.x = end.getX()
		this.end.y = end.getY() + (end.getHeight() / 2)
	}else if(area == 2) {
		this.end.x = end.getX() + end.getWidth()
		this.end.y = end.getY() + (end.getHeight() / 2)
	}else if(area == 3) {
		this.end.x = end.getX() + (end.getWidth() / 2)
		this.end.y = end.getY()
	}else if(area == 4) {
		this.end.x = end.getX() + (end.getWidth() / 2)
		this.end.y = end.getY() + end.getHeight()
	}
	const length = this.points.length;
	this.points[length - 1].x = this.end.x
	this.points[length - 1].y = this.end.y
	this.refresh();
}

Connection.prototype.getStartPos = function() {
	return this.start;
}

Connection.prototype.getEndPos = function() {
	return this.end;
}

Connection.prototype.refresh = function() {
	const startPoint = this.points[0]
	const points = this.points.slice(1)
	let str = "M" + startPoint.x + ' ' + startPoint.y
	points.forEach((p) => {
		str += "L" + p.x + " " + p.y
	})
	this.elem.attr({
		d : str
	});
	this.coll.attr({
		d : str
	});
}

export default Connection;
