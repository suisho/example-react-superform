var React = require("react")
module.exports = React.createClass({
  render(){
    var classNames = []
    if(this.props.className){
      classNames.push("has-error")
    }
    return (
      <input className={classNames.join(" ")} onChange={this.props.onChange} value={this.props.value} placeholder={this.props.placeHolder}/>
    )
  }
})
