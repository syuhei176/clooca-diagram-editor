const Snap = require('imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js');

var Diagram = require('./diagram/diagram');
var uuid = require('uuid');

class DiagramEditor {
	constructor(el) {
		const wrapper = window.document.getElementById(el);
		this.el = window.document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		let browserSize = {
		  width: window.innerWidth || document.body.clientWidth,
		  height: window.innerHeight || document.body.clientHeight
		}
		this.el.style.width = browserSize.width + 'px'
		this.el.style.height = browserSize.height + 'px'
		//this.el.setAttributeNS('http://www.w3.org/2000/svg', 'width', 500)
		//this.el.setAttributeNS('http://www.w3.org/2000/svg', 'height', 500)
		wrapper.appendChild(this.el);
		var s = Snap(this.el);
		this.diagram = new Diagram(s);
	}

	addNode(_options) {
		var options = _options || {};
		var id = options.id || uuid();
		var bound = options.bound || {x:0,y:0,w:100,h:40};
		this.diagram.addNode(id, 'rectangle', bound);
	}
}

export {DiagramEditor}
