// open / closeなtoggleボタン
var React = require("react")

module.exports = React.createClass({
  getInitialState(){
    return {
      open : false
    }
  },
  buttonMessage(){
    return this.state.open ? "Close" : "Open"
  },
  display(){
    return this.state.open ? "block" : "none"
  },
  onClick(e){
    e.stopPropagation()
    e.preventDefault()
    this.setState({
      open : !this.state.open
    })
  },
  render(){
    var style = {
      display : this.display()
    }
    return (
      <div>
        <button onClick={this.onClick}>{this.buttonMessage()}</button>
        <div style={style}>
          {this.props.children}
        </div>
      </div>
    )
  }
})
