var React = require("react")
var convertKana = require("../lib/kana")

var KanaInput = React.createClass({
  propType : {
    initialValue : React.PropTypes.string,
    onUpdate : React.PropTypes.func.isRequired
  },
  getCleanValue(){
    return {
      buffer : "",
      kana : "",
      value : ""
    }
  },
  getInitialState(){
    var clean = this.getCleanValue()
    clean.value = this.props.initialValue || ""
    return clean
  },
  onKeyEvent(){
    this.updateState()
  },
  updateState(){
    if(!this.state.value){ // clean if empty
      this.clean()
      return
    }
    var state = this.getNextState(this.state)
    this.setState(state, () => {
      this.onUpdate()
    })
  },
  clean(){
    this.replaceState(this.getCleanValue(), () => {
      this.onUpdate()
    })
  },
  getNextState(state){
    return this.buildNextState(state)
  },
  buildNextState(state){
    var buffer = state.buffer || ""
    var nextState = {
      buffer : buffer,
      value : state.value,
    }
    var kana = state.kana
    var converted = buffer + convertKana(state.value)
    if(converted.match(kana)){
      nextState.kana = converted
      return nextState
    }
    nextState.buffer = kana
    nextState.kana = kana
    return nextState
  },
  onUpdate(){
    console.log(this.state)
    this.props.onUpdate(this.state)
  },
  onChange(e){
    this.setState({ value : e.target.value })
    this.onUpdate()
  },
  render(){
    return <input
      value={this.state.value}
      onChange={this.onChange}
      onKeyDown={this.onKeyEvent}
    />
  }
})
module.exports = React.createClass({
  getInitialState(){
    return {
      kana : ""
    }
  },
  onUpdateKana(data){
    this.setState({
      kana : data.kana
    })
    //this.props.onChange(this.state)
  },
  render(){
    return (
      <div>
        <div>
          <KanaInput
            onUpdate={this.onUpdateKana}
          />
        </div>
        <div>
          <input name="kana" value={this.state.kana} onChange={this.onChange} />
        </div>
      </div>
    )
  }
})
