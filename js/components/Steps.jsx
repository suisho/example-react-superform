var React = require("react/addons")
var Marty = require("marty")

var buttons = require("./FormButtons.jsx")
var NextButton = buttons.next
var PrevButton = buttons.prev
var UserStore = require("../store/UserStore")

var UserState = Marty.createStateMixin(UserStore)
var ZipcodeSource = require("../zipcode/ZipcodeSource")
var AddressForm = React.createClass({
  mixins : [React.addons.LinkedStateMixin, UserState],
  propTypes : {
    change : React.PropTypes.func
  },
  autocompleteAddress(e){
    e.preventDefault()
    ZipcodeSource.getAddress("1000000")
  },
  change(e){
    this.props.change(this.refs.pref)
  },
  render(){
    console.log(this.state)
    return (
      <div>
        <div>
          <input name="zipcode"/>
          <button onClick={this.autocompleteAddress}>Auto Input</button>
        </div>
        <div>
          <input refs="pref" valueLink={this.linkState("pref")} />
          <input refs="addr1" valueLink={this.linkState("addr1")} />
          <input refs="addr2" valueLink={this.linkState("addr2")} />
        </div>
      </div>
    )
  }
})

var Step1 = React.createClass({
  mixins : [UserState],
  validate(){
    console.log("step1 validate")
  },
  changeAddress(e){
    console.log(e)
    e.target.value
  },
  render(){
    return (
      <form>
        <h1>Step1</h1>
        <div>
          <input name="first-name"  placeholder="Foo" value=""/>
          <input name="last-name"   placeholder="Bob" value=""/>
        </div>
        <AddressForm/>
        <NextButton validate={this.validate}/>
      </form>
    )
    /**
    pref={this.state.pref}
    addr1={this.state.addr1}
    addr2={this.state.addr2}
    change={this.changeAddress}
    */
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