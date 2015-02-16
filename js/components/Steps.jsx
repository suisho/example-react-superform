var React = require("react")
var Marty = require("marty")

var buttons = require("./FormButtons.jsx")
var NextButton = buttons.next
var PrevButton = buttons.prev
var UserStore = require("../store/UserStore")

var UserState = Marty.createStateMixin(UserStore)

var Step1 = React.createClass({
  //mixins : [UserState],
  validate(){
    console.log("step1 validate")
  },
  render(){
    return (
      <form>
        <h1>Step1</h1>
        <div>
          <input name="first-name"  placeholder="Foo" value=""/>
          <input name="last-name"   placeholder="Bob" value=""/>
        </div>
        <NextButton validate={this.validate}/>
      </form>
    )
  }
})
var Step2 = React.createClass({
  validate(){
  },
  render(){
    return (
      <div>
        <h1>Step2</h1>
        <PrevButton validate={this.validate}/>
        <NextButton validate={this.validate}/>
      </div>
    )
  }
})
var Step3 = React.createClass({
  render : function(){
    return (
      <div>
        <h1>Step3</h1>
        <PrevButton/>
      </div>
    )
  }
})
module.exports = {
  "Step1" : Step1,
  "Step2" : Step2,
  "Step3" : Step3
}