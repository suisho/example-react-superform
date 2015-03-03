var React = require("react")
var convertKana = require("../lib/kana")
module.exports = React.createClass({
  getInitialState(){
    return {
      buffers : "",
      kana : ""
    }
  },
  onKeyEvent(e){
    this.syncKana()
  },
  syncKana(){
    var kana = this.getKana()
    if(kana === ""){
      this.replaceState(this.getInitialState())
    }
    this.setState({
      kana : kana
    })
  },
  getKana(){
    var name = this.state.firstName
    var oldKana = this.state.kana
    if(!name || name.length === 0){
      return ""
    }

    var cnv = convertKana(name)
    var buffer = this.state.buffer || ""
    var converted = buffer + cnv
    if(converted.match(oldKana)){
      return converted
    }
    this.setState({ buffer : oldKana })
    return oldKana
  },
  onChange(e){
    var update = {}
    update[e.target.name] = e.target.value
    this.setState(update)
    //this.props.onChange(this.state)
  },
  render(){
    return (
      <div>
        <div>
          <input
            name="firstName"
            value={this.state.firstName}
            onChange={this.onChange}
            onKeyDown={this.onKeyEvent}
          />
        </div>
        <div>
          <input name="firstNameKana" value={this.state.kana} onChange={this.onChange} />
        </div>
      </div>
    )
  }
})
