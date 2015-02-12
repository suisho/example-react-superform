var React = require("react")
var Marty = require("marty")
var Dispatcher = require("marty/dispatcher")

// Action - Constant - Store - State - View - Action ---

var FormStore = require("./FormStore")
var FormConstants = require("./constant").form
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



var FormState = Marty.createStateMixin(FormStore)

var FormAction = Marty.createActionCreators({
  next : FormConstants.NEXT(function(){
    this.dispatch()
  }),
  prev : FormConstants.PREV(function(){
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
  render(){
    var form = this.getStepForm()
    //form.props.doNext = this.nextHandler
    return form
  }
})



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
  action : FormAction.next,
  render(){
    return <button onClick={this.doAction}>Next</button>
  }
})
var PrevButton = React.createClass({
  mixins : [FormActionButton],
  action : FormAction.prev,
  render(){
    return <button onClick={this.doAction}>Prev</button>
  }
})
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
          <input name="first_name" placeholder="Foo" />
          <input name="last_name" placeholder="Bob" />
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
        <PrevButton validate={this.validate}__/>
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

React.render(<FormComtainer />, document.getElementById('form'))

