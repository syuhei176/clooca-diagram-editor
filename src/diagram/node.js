
function Node(id, s, diagram, bound, type) {
	var self = this;
	this.id = id;
	if(typeof bound.w != "number" || bound.w <= 1) bound.w = 2;
	if(typeof bound.h != "number" || bound.h <= 1) bound.h = 2;
	this.bound = {
		x : bound.x,
		y : bound.y,
		w : bound.w,
		h : bound.h
	};
	this.color = "#fff";
	this.type = type;
	if(type == "rect") this.elem = s.rect(0, 0, this.bound.w, this.bound.h);
	else if(type == "ellipse") this.elem = s.ellipse(this.bound.w/2, this.bound.h/2, this.bound.w/2, this.bound.h/2);
	else if(type == "rectangle") this.elem = s.rect(0, 0, this.bound.w, this.bound.h, 5, 5);
	else this.elem = s.ellipse(0, 0, this.bound.w, this.bound.h);
	diagram.getGroup().append(this.elem);
	this.start_pos = {
		x : 0,
		y : 0
	}
	this.listeners = {
		onclick : null,
		onmove : null
	};
	this.elem.drag(function(dx, dy, x, y, e) {
		self.setPos(self.start_pos.x + dx, self.start_pos.y + dy);
		if(self.listeners.onmove) self.listeners.onmove();
	}, function(x, y) {
		self.start_pos.x = self.bound.x;
		self.start_pos.y = self.bound.y;
	}, function(e) {
		diagram.emit('nodeupdate', self);
	});
	this.elem.click(function() {
		self.listeners.onclick();
	});
	this.init();
}

Node.prototype.init = function(onclick) {
	this.elem.attr({
		fill: this.color,
		stroke: "#000",
		strokeWidth: 1			
	});
	this.elem.addClass("node");
	this.refresh();
}

Node.prototype.remove = function() {
}

Node.prototype.onclick = function(onclick) {
	this.listeners.onclick = onclick;
}

Node.prototype.onmove = function(onmove) {
	this.listeners.onmove = onmove;
}

Node.prototype.off = function(event) {
	this.listeners[event] = null;
}

Node.prototype.setPos = function(x, y) {
	this.bound.x = x;
	this.bound.y = y;
	this.refresh();
}

Node.prototype.getBound = function() {
	return this.bound;
}

Node.prototype.getX = function() {
	return this.bound.x;
}

Node.prototype.getY = function() {
	return this.bound.y;
}

Node.prototype.setSize = function(w, h) {
	if(typeof w != "number" || w <= 1) w = 2;
	if(typeof h != "number" || h <= 1) h = 2;
	this.bound.w = w;
	this.bound.h = h;
	this.refresh();
}

Node.prototype.setW = function(w) {
	if(typeof w != "number" || w <= 1) w = 2;
	this.bound.w = w;
	this.refresh();
}

Node.prototype.setH = function(h) {
	if(typeof h != "number" || h <= 1) h = 2;
	this.bound.h = h;
	this.refresh();
}

Node.prototype.refresh = function() {
	this.elem.transform("translate("+this.bound.x+","+this.bound.y+")");
	if(this.type == "rect" || this.type == "rectangle") {
		this.elem.attr({
			width : this.bound.w,
			height : this.bound.h
		});
	}else if(this.type == "ellipse") {
		this.elem.attr({
			cx : this.bound.w/2,
			cy : this.bound.h/2,
			rx : this.bound.w/2,
			ry : this.bound.h/2
		});
	}else{

	}
}

module.exports = Node;

