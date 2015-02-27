var React = require("react")
module.exports = React.createClass({
  render(){
    return (
      <label>
        <input type="checkbox" name={this.props.name} checked={this.props.checked} onChange={this.props.onChange}/>
        <span>{this.props.label}</span>
      </label>
    )
  }
})
