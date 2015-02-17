var Marty = require("marty")
var FormConstants = require("../constant").form
module.exports = Marty.createStore({
  minStep : 0,
  maxStep : 3,
  handlers : {
    next : FormConstants.NEXT,
    prev : FormConstants.PREV,
  },
  getInitialState(){
    return {
      step : 0
    }
  },
  incrementStep(i){
    var step = this.state.step + i
    step = Math.max(step, this.minStep)
    step = Math.min(step, this.maxStep)
    this.state.step = step
    this.hasChanged()
  },
  next(){
    this.incrementStep(1)
  },
  prev(){
    this.incrementStep(-1)
  }
})
