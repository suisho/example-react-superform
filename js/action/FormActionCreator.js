var Marty = require("marty")
var FormConstants = require("../constant").form
module.exports = Marty.createActionCreators({
  next : FormConstants.NEXT(function(){
    this.dispatch()
  }),
  prev : FormConstants.PREV(function(){
    this.dispatch()
  })
})
