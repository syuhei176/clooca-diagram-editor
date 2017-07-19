import {EventEmitter} from 'events'
import SVGUtil from '../ui/svg-util'
import Property from './property'

export default class Node extends EventEmitter {

	constructor(id, diagram, bound, type) {
		super()
		var self = this;
		this.id = id;
		this.diagram = diagram
		this.properties = []
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
		this.connections = [];
	  this.elem = SVGUtil.createDraggableElement('g', {
	  })
	  this.shape = SVGUtil.createDraggableElement('rect', {
	  	x: 0,
	  	y: 0,
	  	width: this.bound.w,
	  	height: this.bound.h,
      'data-cid': this.id
	  })
		this.elem.appendChild(this.shape)

		/*
		if(type == "rect") this.elem = s.rect(0, 0, this.bound.w, this.bound.h);
		else if(type == "ellipse") this.elem = s.ellipse(this.bound.w/2, this.bound.h/2, this.bound.w/2, this.bound.h/2);
		else if(type == "rectangle") this.elem = s.rect(0, 0, this.bound.w, this.bound.h, 5, 5);
		else this.elem = s.ellipse(0, 0, this.bound.w, this.bound.h);
		*/
		diagram.getGroup().appendChild(this.elem);
		this.start_pos = {
			x : 0,
			y : 0
		}
		this.shape.drag((dx, dy, x, y, e)=>{
			this.setPos(this.start_pos.x + dx, this.start_pos.y + dy);
			this.emit('move')
		}, (x, y) => {
			this.start_pos.x = this.bound.x;
			this.start_pos.y = this.bound.y;
		}, (e) => {
			diagram.emit('nodeupdate', this);
		});
		this.shape.click(() => {
			this.emit('click')
		});
		this.init();
	}

  getId() {
    return this.id
  }

	init(onclick) {

		this.elem.attr({
			fill: this.color,
			stroke: "#000",
			strokeWidth: 1			
		});
		this.elem.className("node");
		this.refresh();

		this.addProperty()
	}

	removeSelf() {
		this.diagram.getGroup().removeChild(this.elem);
		this.diagram.removeNode(this.id)
	}

	setPos(x, y) {
		this.bound.x = x;
		this.bound.y = y;
		this.refresh();
	}

	getBound() {
		return this.bound;
	}

	getX() {
		return this.bound.x;
	}

	getY() {
		return this.bound.y;
	}

	getWidth() {
		return this.bound.w
	}

	getHeight() {
		return this.bound.h
	}

	setSize(w, h) {
		if(typeof w != "number" || w <= 1) w = 2;
		if(typeof h != "number" || h <= 1) h = 2;
		this.bound.w = w;
		this.bound.h = h;
		this.refresh();
	}

	setW(w) {
		if(typeof w != "number" || w <= 1) w = 2;
		this.bound.w = w;
		this.refresh();
	}

	setH(h) {
	 if(typeof h != "number" || h <= 1) h = 2;
	 this.bound.h = h;
	 this.refresh();
  }

  addConnection(c) {
	  this.connections.push(c);
	}

	addProperty() {
		const newProperty = new Property({})
		newProperty.updateText("default")
    newProperty.on('change', (e) => {
      this.setH(newProperty.getHeight() + 20)
    })
		this.properties.push(newProperty)
		this.elem.appendChild(newProperty.getEl())
	}

  updateText(text) {
    this.properties[0].updateText(text)
    this.setH(this.properties[0].getHeight() + 20)
  }

	refresh() {
		this.elem.transform("translate("+this.bound.x+","+this.bound.y+")");
		if(this.type == "rect" || this.type == "rectangle") {
			this.shape.attr({
				width : this.bound.w,
				height : this.bound.h
			});
		}else if(this.type == "ellipse") {
			this.shape.attr({
				cx : this.bound.w/2,
				cy : this.bound.h/2,
				rx : this.bound.w/2,
				ry : this.bound.h/2
			});
		}else{

		}
	}

}

