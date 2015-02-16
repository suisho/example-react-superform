var React = require("react")
var FormActionCreator = require("../action/FormActionCreator")

var FormActionButton = {
  propTypes : {
    validate : React.PropTypes.func.isRequired,
  },
  doAction(e){
    e.preventDefault()
    this.props.validate()
    this.action()
  }
}

var NextButton = React.createClass({
  mixins : [FormActionButton],
  action : FormActionCreator.next,
  render(){
    return <button onClick={this.doAction}>Next</button>
  }
})
var PrevButton = React.createClass({
  mixins : [FormActionButton],
  action : FormActionCreator.prev,
  render(){
    return <button onClick={this.doAction}>Prev</button>
  }
})
module.exports = {
  next : NextButton,
  prev : PrevButton
}