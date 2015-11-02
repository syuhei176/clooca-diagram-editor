var Snap = require('../thirdparty/snap.svg');
var Diagram = require('./diagram/diagram');
var uuid = require('uuid');

function DiagramEditor() {
	this.el = window.document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	var s = Snap(this.el);
	this.diagram = new Diagram(s);
}

DiagramEditor.prototype.addNode = function(_options) {
	var options = _options || {};
	var id = options.id || uuid();
	var bound = options.bound || {x:0,y:0,w:100,h:40};
	this.diagram.addNode(id, 'rectangle', bound);
}

DiagramEditor.prototype.getEl = function() {
	return this.el;
}

function Item(elem) {
	this.elem = elem;
}

Item.prototype.add = function(item) {
	this.elem.appendChild(item.getEl());
}

CloocaEditorFramework = {
	init : function(options, cb) {
		window.addEventListener('load', function(e) {
			var main = window.document.getElementById(options.el);
			var item = new Item(main);
			cb(item);
		});
	},
	DiagramEditor : DiagramEditor
}

module.exports = CloocaEditorFramework;

window.Cef = CloocaEditorFramework;