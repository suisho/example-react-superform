var React = require("react")

module.exports = React.createClass({
  getInitialState(){
    return {
      open : true
    }
  },
  render(){
    return (<button>Open</button>)
  }
})
