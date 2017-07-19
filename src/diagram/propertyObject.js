import {EventEmitter} from 'events'
import SVGUtil from '../ui/svg-util'

export default class PropertyObject extends EventEmitter {

	constructor(id, diagram, bound, type) {
		super()
	  this.elem = SVGUtil.createDraggableElement('g', {})

  }
  
}