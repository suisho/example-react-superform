var React = require("react/addons")
var Marty = require("marty")

var UserStore = require("../store/UserStore")

var UserState = Marty.createStateMixin(UserStore)

var AddressForm = require("./AddressForm.jsx")

var buttons = require("./FormButtons.jsx")
var NextButton = buttons.next
var PrevButton = buttons.prev

var Step1 = React.createClass({
  mixins : [UserState],
  validate(){
    console.log("step1 validate")
  },
  render(){
    if(this.refs.address){
      console.log(this.refs.address.getRefsData())
    }
    return (
      <form>
        <h1>Step1</h1>
        <div>
          <input name="first-name" placeholder="Foo" value=""/>
          <input name="last-name" placeholder="Bob" value=""/>
        </div>
        <AddressForm />
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
  render(){
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
