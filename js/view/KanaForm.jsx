var React = require("react")
var convertKana = require("../lib/kana")
module.exports = React.createClass({
  getInitialState(){
    return {
      buffers : "",
      firstNameKana : ""
    }
  },
  onKey(e){
    this.syncKana()
  },
  syncKana(){
    var kana = this.getKana()
    if(kana === ""){
      this.clear()
    }
    this.setState({
      firstNameKana : kana
    })
  },
  clear(){
    this.replaceState(this.getInitialState())
  },
  getBuffer(){
    return this.state.buffer || ""
  },
  getKana(){
    var name = this.state.firstName
    var oldKana = this.state.firstNameKana
    if(!name || name.length === 0){
      return ""
    }

    var cnv = convertKana(name)
    var converted = this.getBuffer() + cnv
    console.log([
      this.getBuffer(), name, oldKana, cnv, converted
    ])

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
  },
  render(){
    return (
      <div>
        <div>
          <input
            name="firstName"
            value={this.state.firstName}
            onChange={this.onChange}
            onKeyUp={this.onKey}
          />
        </div>
        <div>
          <input name="firstNameKana" value={this.state.firstNameKana} onChange={this.onChange} />
        </div>
      </div>
    )
  }
})
