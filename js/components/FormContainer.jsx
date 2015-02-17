var React = require("react")
var Marty = require("marty")
var StepComponents = require("./Steps.jsx")
var FormActionCreator = require("../form/FormActionCreator")
var FormStore = require("../form/FormStore")
var FormState = Marty.createStateMixin(FormStore)


var Step1 = StepComponents.Step1
var Step2 = StepComponents.Step2
var Step3 = StepComponents.Step3

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup

module.exports = React.createClass({
  mixins : [FormState],
  getStepForm(){
    console.log(this.state.step)
    switch(this.state.step){
      case 0:
        return (<div key="step-0"/>) // for animation
      case 1:
        return (<Step1 key="step-1"/>)
      case 2:
        return (<Step2 key="step-2"/>)
      case 3:
        return (<Step3 key="step-3"/>)
    }
  },
  render(){
    var form = this.getStepForm()
    //form.props.doNext = this.nextHandler
    return (
      <ReactCSSTransitionGroup transitionName="example">
        {form}
      </ReactCSSTransitionGroup>
    )
  },
  componentDidMount(){
    console.log("DM")
    FormActionCreator.next()
  }
})


