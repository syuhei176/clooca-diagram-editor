export class Storage {
  saveModel(name, modelData) {
    window.localStorage.setItem('clooca.v3.model.' + name, JSON.stringify(modelData))
  }
  loadModel(name) {
    let stringifiedModelData = window.localStorage.getItem('clooca.v3.model.' + name)
    return JSON.parse(stringifiedModelData)
  } 
}