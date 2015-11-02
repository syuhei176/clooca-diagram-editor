var Snap = require('../thirdparty/snap.svg');
var Diagram = require('./diagram/diagram');

function DiagramEditor() {
	var s = Snap("#canvas");
	var diagram = new Diagram(s);
	diagram.addNode('00001', 'rectangle', {
                    x : 204,
                    y : 80,
                    w : 100,
                    h : 70                
            });
}

CloocaEditorFramework = {
	init : function(options, cb) {
		window.addEventListener('load', function(e) {
			cb();
		});
	},
	DiagramEditor : DiagramEditor	
}

module.exports = CloocaEditorFramework;

window.Cef = CloocaEditorFramework;