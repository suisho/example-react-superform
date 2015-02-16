var React = require("react")
var Marty = require("marty")
var Dispatcher = require("marty/dispatcher")

// Action - Constant - Store - State - View - Action ---

var FormStore = require("./form/FormStore")
var mockServer = require("./mockServer")
var StepComponents = require("./components/Steps.jsx")

var Step1 = StepComponents.Step1
var Step2 = StepComponents.Step2
var Step3 = StepComponents.Step3

var FormState = Marty.createStateMixin(FormStore)

var FormComtainer = React.createClass({
  mixins : [FormState],
  getStepForm(){
    switch(this.state.step){
      case 1:
        return (<Step1/>)
      case 2:
        return (<Step2/>)
      case 3:
        return (<Step3/>)
    }
  },
  render(){
    var form = this.getStepForm()
    //form.props.doNext = this.nextHandler
    return form
  }
})




React.render(<FormComtainer />, document.getElementById('form'))

