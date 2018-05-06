import {EventEmitter} from 'events'
import SVGUtil from '../ui/svg-util'
import Property from './property'

class Shape {
  constructor(options, w, h) {
    this.options = options || {}
		this.color = this.options.color || "#fff";
    if(this.options.svg) {
      this.el = SVGUtil.createElement('g')
      this.el.setInnerHTML(this.options.svg)
    }else{
      this.el = SVGUtil.createElement('rect', {
        x: 0,
        y: 0,
        width: w,
        height: h
      })
    }
		this.el.attr({
			fill: this.color,
			stroke: "#000",
			strokeWidth: 1			
		});
    this._isCustom = !!this.options.svg
  }

  isCustom() {
    return this._isCustom
  }

  getEl() {
    return this.el
  }

  setSize(w, h) {
    if(this.isCustom()) {
      const ww = w / this.options.width
      const hh = h / this.options.height
      this.el.transform("scale("+ww+","+hh+")");
    }else{
      this.el.attr({
        width : w,
        height : h
      });
    }
  }
}

export default class Node extends EventEmitter {

	constructor(id, diagram, bound, options) {
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
		this.options = options || {}
		this.connections = [];
	  this.elem = SVGUtil.createElement('g')
    this.shape = new Shape(this.options.shape, bound.w, bound.h)
	  this.propertyGroup = SVGUtil.createElement('g')
	  this.coll = SVGUtil.createDraggableElement('rect', {
	  	x: 0,
	  	y: 0,
	  	width: this.bound.w,
	  	height: this.bound.h,
      'data-cid': this.id,
      'visibility': 'hidden',
      'pointer-events': 'fill'
	  })
	  this.editGroup = SVGUtil.createElement('g')
		this.elem.appendChild(this.shape.getEl())
		this.elem.appendChild(this.propertyGroup)
		this.elem.appendChild(this.coll)
		this.elem.appendChild(this.editGroup)

		diagram.getGroup().appendChild(this.elem);
		this.start_pos = {
			x : 0,
			y : 0
		}
		this.coll.drag((dx, dy, x, y, e)=>{
			this.setPos(this.start_pos.x + dx, this.start_pos.y + dy);
			this.emit('move')
		}, (x, y) => {
			this.start_pos.x = this.bound.x;
			this.start_pos.y = this.bound.y;
		}, (e) => {
			diagram.emit('nodeupdate', this);
		});
		this.coll.click(() => {
			this.emit('click')
		});
		this.init();
	}

  getId() {
    return this.id
  }

	init(onclick) {

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
		const newProperty = new Property({
      node: this,
      editGroup: this.editGroup
    })
		newProperty.updateText("default")
    newProperty.on('change', (e) => {
			this.setH(newProperty.getHeight() + 20)
			this.diagram.emit('nodeupdate', this);
    })
		this.properties.push(newProperty)
		this.propertyGroup.appendChild(newProperty.getEl())
	}

  edit() {
    this.properties[0].showTextarea()
  }

  updateText(text) {
    this.properties[0].updateText(text)
    if(!this.shape.isCustom())
      this.setH(this.properties[0].getHeight() + 20)
  }

	refresh() {
		this.elem.transform("translate("+this.bound.x+","+this.bound.y+")");
    this.shape.setSize(this.bound.w, this.bound.h)

    this.coll.attr({
      width : this.bound.w,
      height : this.bound.h
    });
    /*
		if(this.type == "rect" || this.type == "rectangle") {

		}else if(this.type == "ellipse") {
			this.shape.attr({
				cx : this.bound.w/2,
				cy : this.bound.h/2,
				rx : this.bound.w/2,
				ry : this.bound.h/2
			});
		}else{

		}
    */
	}

	toJson() {
    var properties = {}
    for(var key in this.properties) {
      properties[key] = this.properties[key].toJson()
    }
		return {
			id: this.getId(),
			bound: this.bound,
			properties: properties
		}
	}
	
}

