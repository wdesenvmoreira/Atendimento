export default class EventDispatcher {
  constructor () {
    var eventTaget = document.createDocumentFragment();

    ['addEventListener', 'dispatchEvent', 'removeEventListener'].map(function (method) {
      this[method] = eventTaget[method].bind(eventTaget)
    }.bind(this))
  }
}
