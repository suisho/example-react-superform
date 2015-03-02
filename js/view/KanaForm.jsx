var React = require("react")
var convertKana = require("../lib/kana")
module.exports = React.createClass({
  getInitialState(){
    return {
      buffer : "",
      firstNameKana : ""
    }
  },
  onKeyDown(e){
    var name = this.state.firstName
    var kana = this.state.firstNameKana.length + convertKana(name)
    // console.log(String.fromCharCode(e.keyCode))
    // console.log(e.keyCode, name, convertKana(name), this.state.firstNameKana)
    this.setState({
      firstNameKana : kana
    })
  },
  onChange(e){
    var update = {}
    update[e.target.name] = e.target.value
    this.setState(update)
  },
  render(){
    return (
      <div>
        <div>
          <input
            name="firstName"
            value={this.state.firstName}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown} />
        </div>
        <div>
          <input name="firstNameKana" value={this.state.firstNameKana} onChange={this.onChange} />
        </div>
      </div>
    )
  }
})