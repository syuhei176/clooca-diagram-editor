import { DiagramEditor } from './editor/DiagramEditor'
import { Storage } from './storage'
const storage = new Storage()

export class clooca {
  constructor() {
    var diagramEditor = new DiagramEditor("main");
    var toolpallet = diagramEditor.createToolPallet();
    toolpallet.addItem('select', 'selectIcon')
    toolpallet.addItem('rect', 'rectIcon')
    var explorer = diagramEditor.createExplorer();
    var diagrams = [{
      name: "aaa"
    }, {
      name: "bbb"
    }]
    diagrams.forEach(function(d) {
      explorer.add(d)
    })
    diagramEditor.load(diagrams[0])
    explorer.on('select', (e) => {
      diagramEditor.load(e.diagram)
    })
    diagramEditor.on('addNode', function() {
      console.log(diagrams)

    })
    var node1 = diagramEditor.addNode({
      bound:{
        x : 200,
        y : 100,
        w : 100,
        h : 50
    }});
    node1.setPos(220, 120)
    var node2 = diagramEditor.addNode({
      bound:{
        x : 400,
        y : 150,
        w : 100,
        h : 50
    }});
  diagramEditor.addConnection(node1, node2, {/*options*/})
  node1.updateText('Book\n-----\n+ title:string')
  node2.updateText('Order\n-----\n+ id:string')

  }


}
