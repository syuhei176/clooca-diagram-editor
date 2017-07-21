import {EventEmitter} from 'events'
import SVGUtil from '../ui/svg-util'
import Property from './property'

export default class Connection extends EventEmitter {
  constructor(id, s, diagram, start, end) {
    super()
    this.id = id;
    this.start = {};
    this.end = {};
    this.points = [{}, {}]

	  this.group = SVGUtil.createElement('g')
	  this.propertyGroup = SVGUtil.createElement('g')
	  this.editGroup = SVGUtil.createElement('g')

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
      'stroke-width': 20
    })

    this.coll.className("node");

   
    this.group.appendChild(this.elem);
    this.group.appendChild(this.propertyGroup);
    this.group.appendChild(this.coll);
    this.group.appendChild(this.editGroup);
    diagram.getGroup().appendChild(this.group);
    
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
    /*
    this.coll.drag((dx, dy, x, y, e) => {
      this.setStartPos(this.base_start.x + dx, this.base_start.y + dy);
      this.setEndPos(this.base_end.x + dx, this.base_end.y + dy);
      this.emit('move', {})
    }, (x, y) => {
      this.base_start.x = this.start.x;
      this.base_start.y = this.start.y;
      this.base_end.x = this.end.x;
      this.base_end.y = this.end.y;
    }, (e) => {
      //diagram.fireOnConUpdate(this);
    });
    */
    this.coll.click(() => {
      console.log('click', this)

      this.emit('click', this)
    });

    this.initProperty()

  }

  checkRelPos(start, end) {

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

  setStartPos(start, end) {
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

  setEndPos(start, end) {

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

  getStartPos() {
  	return this.start;
  }

  getEndPos() {
    return this.end;
  }

  refresh() {

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
    const textPoint = this.points.reduce((c, acc) => {
      return {
        x: c.x + acc.x,
        y: c.y + acc.y
      }
    }, {x:0, y:0});
    textPoint.x = textPoint.x / this.points.length
    textPoint.y = textPoint.y / this.points.length
    this.propertyGroup.transform("translate("+(textPoint.x-20)+","+textPoint.y+")");
    this.editGroup.transform("translate("+(textPoint.x-20)+","+textPoint.y+")");

  }

  getWidth() {
    return 100
  }

  getHeight() {
    return 100
  }

	initProperty() {
		const newProperty = new Property({
      node: this,
      editGroup: this.editGroup
    })
		newProperty.updateText("default")
		this.property = newProperty
		this.propertyGroup.appendChild(newProperty.getEl())
	}

  edit() {
    console.log("edit")
    this.property.showTextarea()
  }
}
