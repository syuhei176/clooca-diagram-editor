README.md
=====

```
Cef.init({}, function(elem) {
	var diagramEditor = new Cef.DiagramEditor();
	elem.add(diagramEditor);
	diagramEditor.addNode({bound:{
		x : 100,
		y : 100,
		w : 100,
		h : 50
	}});
});

```