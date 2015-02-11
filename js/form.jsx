var React = require("react")
var Marty = require("marty")
var Dispatcher = require("marty/dispatcher")

var mockServer = require("./mockServer")

var UserStore = Marty.createStore({
  getInitialState(){
    return {
      firstName : null,
      lastName : null
    }
  },
  postUser(user){
    mockServer.postUser(user, function(err, body){

    })
  }
})
// Action - Constant - Store - State - View - Action ---
//

var FormConstants = Marty.createConstants({
  Form : ["NEXT", "PREV"]
})

var FormStore = Marty.createStore({
  handlers : {
    next : FormConstants.Form.NEXT,
    prev : FormConstants.Form.PREV,
  },
  getInitialState(){
    return {
      step : 1
    }
  },
  incrementStep(i){
    var max = 3
    var min = 1
    var step = this.state.step + i
    step = Math.max(step, min)
    step = Math.min(step, max)
    this.state.step = step
    this.hasChanged()
  },
  next(){
    this.incrementStep(1)
  },
  prev(){
    this.incrementStep(-1)
  }
})
var FormState = Marty.createStateMixin(FormStore)

var FormAction = Marty.createActionCreators({
  next : FormConstants.Form.NEXT(function(){
    this.dispatch()
  }),
  prev : FormConstants.Form.PREV(function(){
    this.dispatch()
  })
})

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
  /*nextHandler(e){
    e.preventDefault()
    this.setState({step : this.state.step + 1})
    // rerender ? this.render()
  },*/
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

var NextButton = React.createClass({
  doAction(e){
    e.preventDefault()
    FormAction.next()
  },
  render(){
    return <button onClick={this.doAction}>Next</button>
  }
})
var PrevButton = React.createClass({
  doAction(e){
    e.preventDefault()
    FormAction.prev()
  },
  render(){
    return <button onClick={this.doAction}>Prev</button>
  }
})
var Step1 = React.createClass({
  render(){
    return (
      <form>
        <h1>Step1</h1>
        <Name/>
        <NextButton/>
      </form>
    )
  }
})
var Step2 = React.createClass({
  render : function(){
    return (
      <div>
        <h1>Step2</h1>
        <PrevButton/>
        <NextButton/>
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

React.render(<FormComtainer />, document.getElementById('form'))

