Selector.CursorRange = 6;
Selector.CursorOffset = 10;

function Selector(snap, g) {
	var self = this;
	this.pos = {
		x : 0,
		y : 0
	};
	this.target = null;
	this.listeners = {
		changed : [],
		removed : []
	};
	this.group = snap.group();
	g.append(this.group);
	this.cursor = {
		n : snap.circle(50, 0, Selector.CursorRange),
		s : snap.circle(50, 100, Selector.CursorRange),
		w : snap.circle(0, 50, Selector.CursorRange),
		e : snap.circle(100, 50, Selector.CursorRange),
		nw : snap.circle(0, 0, Selector.CursorRange),
		ne : snap.circle(100, 0, Selector.CursorRange),
		sw : snap.circle(0, 100, Selector.CursorRange),
		se : snap.circle(100, 100, Selector.CursorRange),
		remove : snap.circle(120, 50, Selector.CursorRange)
	}
	for(var key in this.cursor) {
		this.cursor[key].attr({
		    fill: "#3030ff",
		    stroke: "#fff",
		    strokeWidth: 3
		});
		this.group.append(this.cursor[key]);
	}

	this.cursor["n"].drag(function(dx, dy, x, y, e) {
		self.target.setPos(self.target_bound.x, self.target_bound.y + dy);
		self.target.setSize(self.target_bound.w, self.target_bound.h - dy);
		self.refresh();
	}, start, end);
	this.cursor["s"].drag(function(dx, dy, x, y, e) {
		self.target.setSize(self.target_bound.w, self.target_bound.h + dy);
		self.refresh();
	}, start, end);
	this.cursor["w"].drag(function(dx, dy, x, y, e) {
		self.target.setPos(self.target_bound.x + dx, self.target_bound.y);
		self.target.setSize(self.target_bound.w - dx, self.target_bound.h);
		self.refresh();
	}, start, end);
	this.cursor["e"].drag(function(dx, dy, x, y, e) {
		self.target.setSize(self.target_bound.w + dx, self.target_bound.h);
		self.refresh();
	}, start, end);
	this.cursor["nw"].drag(function(dx, dy, x, y, e) {
		self.target.setPos(self.target_bound.x + dx, self.target_bound.y + dy);
		self.target.setSize(self.target_bound.w - dx, self.target_bound.h - dy);
		self.refresh();
	}, start, end);
	this.cursor["ne"].drag(function(dx, dy, x, y, e) {
		self.target.setPos(self.target_bound.x, self.target_bound.y + dy);
		self.target.setSize(self.target_bound.w + dx, self.target_bound.h - dy);
		self.refresh();
	}, start, end);
	this.cursor["sw"].drag(function(dx, dy, x, y, e) {
		self.target.setPos(self.target_bound.x + dx, self.target_bound.y);
		self.target.setSize(self.target_bound.w - dx, self.target_bound.h + dy);
		self.refresh();
	}, start, end);
	this.cursor["se"].drag(function(dx, dy, x, y, e) {
		self.target.setSize(self.target_bound.w + dx, self.target_bound.h + dy);
		self.refresh();
	}, start, end);
	this.cursor["remove"].click(function() {
		self.fireOnRemoved(self.target);
		self.clear();
	}, start, end);
	

	function start() {

	}
	function end() {
		self.fireOnChanged(self.target);
		self.setTarget(self.target);
	}
}

Selector.prototype.on = function(event, cb) {
	this.listeners[event].push(cb);
}

Selector.prototype.fireOnChanged = function(e) {
	this.listeners["changed"].forEach(function(l) {
		l(e);
	});
}

Selector.prototype.fireOnRemoved = function(e) {
	this.listeners["removed"].forEach(function(l) {
		l(e);
	});
}

Selector.prototype.clear = function() {
	this.target = null;
	this.group.attr({
		visibility : "hidden"
	});
}


Selector.prototype.setTarget = function(node) {
	var self = this;
	this.group.attr({
		visibility : "visible"
	});
	if(this.target) this.target.off("onmove");
	this.target = node;
	self.target_bound = {
		x : this.target.getBound().x,
		y : this.target.getBound().y,
		w : this.target.getBound().w,
		h : this.target.getBound().h
	}
	this.pos.x = node.getX();
	this.pos.y = node.getY();
	this.refresh();
	this.target.onmove(function() {
		self.refresh();
	});
}

Selector.prototype.refresh = function() {
	if(!this.target) return;
	this.group.transform("translate("+this.target.getBound().x+","+this.target.getBound().y+")");		
	this.cursor.n.attr({
		cx : this.target.getBound().w/2,
		cy : -Selector.CursorOffset
	});
	this.cursor.s.attr({
		cx : this.target.getBound().w/2,
		cy : this.target.getBound().h+Selector.CursorOffset
	});
	this.cursor.w.attr({
		cx : -Selector.CursorOffset,
		cy : this.target.getBound().h/2
	});
	this.cursor.e.attr({
		cx : this.target.getBound().w+Selector.CursorOffset,
		cy : this.target.getBound().h/2
	});
	this.cursor.nw.attr({
		cx : -Selector.CursorOffset,
		cy : -Selector.CursorOffset
	});
	this.cursor.ne.attr({
		cx : this.target.getBound().w+Selector.CursorOffset,
		cy : -Selector.CursorOffset
	});
	this.cursor.sw.attr({
		cx : -Selector.CursorOffset,
		cy : this.target.getBound().h+Selector.CursorOffset
	});
	this.cursor.se.attr({
		cx : this.target.getBound().w+Selector.CursorOffset,
		cy : this.target.getBound().h+Selector.CursorOffset
	});
}

function ConnectionSelector(snap, g) {
	var self = this;
	this.pos = {
		x : 0,
		y : 0
	};
	this.target = null;
	this.listeners = {
		changed : []
	};
	this.group = snap.group();
	g.append(this.group);
	this.cursor = {
		start : snap.circle(50, 0, Selector.CursorRange),
		end : snap.circle(50, 100, Selector.CursorRange)
	}
	for(var key in this.cursor) {
		this.cursor[key].attr({
		    fill: "#3030ff",
		    stroke: "#fff",
		    strokeWidth: 3
		});
		this.group.append(this.cursor[key]);
	}

	this.cursor["start"].drag(function(dx, dy, x, y, e) {
		self.target.setStartPos(self.target_start.x + dx, self.target_start.y + dy);
		self.refresh();
	}, onstart, onend);
	this.cursor["end"].drag(function(dx, dy, x, y, e) {
		self.target.setEndPos(self.target_end.x + dx, self.target_end.y + dy);
		self.refresh();
	}, onstart, onend);

	function onstart() {

	}
	function onend() {
		self.fireOnChanged(self.target);
		self.setTarget(self.target);
	}
}

ConnectionSelector.prototype.clear = function() {
	this.target = null;
	this.group.attr({
		visibility : "hidden"
	});
}

ConnectionSelector.prototype.setTarget = function(connection) {
	var self = this;
	this.group.attr({
		visibility : "visible"
	});
	if(this.target) this.target.off("onmove");
	this.target = connection;
	self.target_start = {
		x : this.target.getStartPos().x,
		y : this.target.getStartPos().y
	};
	self.target_end = {
		x : this.target.getEndPos().x,
		y : this.target.getEndPos().y
	};
	this.refresh();
	this.target.onmove(function() {
		self.refresh();
	});
}

ConnectionSelector.prototype.on = function(event, cb) {
	this.listeners[event].push(cb);
}

ConnectionSelector.prototype.fireOnChanged = function(e) {
	this.listeners["changed"].forEach(function(l) {
		l(e);
	});
}
ConnectionSelector.prototype.refresh = function() {
	if(!this.target) return;
	this.cursor.start.attr({
		cx : this.target.getStartPos().x,
		cy : this.target.getStartPos().y
	});
	this.cursor.end.attr({
		cx : this.target.getEndPos().x,
		cy : this.target.getEndPos().y
	});
}

module.exports.Selector = Selector;
module.exports.ConnectionSelector = ConnectionSelector;

