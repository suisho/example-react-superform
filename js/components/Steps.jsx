var React = require("react/addons")
var Marty = require("marty")

var UserStore = require("../store/UserStore")

var UserState = Marty.createStateMixin(UserStore)

var AddressForm = require("./AddressForm.jsx")
var AddressFormB = require("./AddressForm.jsx").b
var AddressFormC = require("./AddressForm.jsx").c

var buttons = require("./FormButtons.jsx")
var NextButton = buttons.next
var PrevButton = buttons.prev

var Step1 = React.createClass({
  mixins : [React.addons.LinkedStateMixin, UserState],
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
          <input name="first-name"  placeholder="Foo" value=""/>
          <input name="last-name"   placeholder="Bob" value=""/>
        </div>
        <AddressFormC ref="address"
          pref={this.state.pref}
          addr1={this.state.addr1}
          addr2={this.state.addr2}
        />
        <NextButton validate={this.validate}/>
      </form>
    )
    // <AddressFormB
    //   pref={this.linkState("pref")}
    //   addr1={this.linkState("addr1")}
    //   addr2={this.linkState("addr2")}
    // />
    
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