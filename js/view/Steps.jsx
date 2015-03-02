var React = require("react/addons")
var Marty = require("marty")

var UserStore = require("../store/UserStore")

var UserState = Marty.createStateMixin(UserStore)

var AddressForm = require("./AddressForm.jsx").d
var Toggle = require("../component/Toggle.jsx")
var buttons = require("./FormButtons.jsx")
var TreeCheckbox = require("./TreeCheckbox.jsx")
var NextButton = buttons.next
var PrevButton = buttons.prev

var Step1 = React.createClass({
  mixins : [UserState],
  validate(){
    console.log("step1 validate")
  },
  updateHandler(update){
    this.setState(update)
  },
  onChange(e){
    var change = {}
    change[e.target.name] = e.target.value
    this.updateHandler(change)
  },
  renderInput(name, placeHolder){
    var value = this.state[name]
    return (
      <input
        key={name}
        name={name}
        value={value}
        placeholder={placeHolder}
        onChange={this.onChange}
      />
    )
  },
  render(){
    if(this.refs.address){
      console.log(this.refs.address.getRefsData())
    }
    var forms = []
    forms.push(this.renderInput("firstName", "foo"))
    forms.push(this.renderInput("lastName", "bar"))
    return (
      <form>
        <h1>Step1</h1>
        <div>
          {forms}
        </div>
        <Toggle>
          <TreeCheckbox />
        </Toggle>
        <AddressForm
          pref={this.state.pref}
          addr1={this.state.addr1}
          addr2={this.state.addr2}
          updateHandler={this.updateHandler}
        />
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
