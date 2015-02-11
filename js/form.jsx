var React = require("react")
var Marty = require("marty")
var Dispatcher = require("marty/dispatcher")



var UserStore = Marty.createStore({
  getInitialState(){
    return {
      firstName : null,
      lastName : null
    }
  }
})

var FormComtainer = React.createClass({
  getInitialState(){
    return {
      step : 1
    }
  },
  getStepForm(){
    switch(this.state.step){
      case 1:
        return (<Step1/>)
      case 2:
        return (<Step2/>)
    }
  },
  nextHandler(e){
    e.preventDefault()
    this.setState({step : this.state.step + 1})
    // rerender ? this.render()
  },
  render(){
    var form = this.getStepForm()
    form.props.doNext = this.nextHandler
    return form
  }
})


var Name = React.createClass({
  render(){
    return (
      <div>
        <input name="first_name" placeholder="Foo" />
        <input name="last_name" placeholder="Bob" />
      </div>
    )
  }
})
var Step1 = React.createClass({
  render(){
    return (
      <form>
        <h1>Step1</h1>
        <Name/>
        <button onClick={this.props.doNext}>Next</button>
      </form>
    )
  }
})
var Step2 = React.createClass({
  render : function(){
    return (
      <div>
        <h1>Step2</h1>
      </div>
    )
  }
})

React.render(<FormComtainer />, document.getElementById('form'))

