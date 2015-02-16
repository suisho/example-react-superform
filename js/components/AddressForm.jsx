var React = require("react")
var Marty = require("marty")
var UserStore = require("../store/UserStore")

var UserState = Marty.createStateMixin(UserStore)
var ZipcodeSource = require("../zipcode/ZipcodeSource")

module.exports = React.createClass({
  mixins : [React.addons.LinkedStateMixin, UserState],
  propTypes : {
    change : React.PropTypes.func
  },
  autocompleteAddress(e){
    e.preventDefault()
    ZipcodeSource.getAddress("1000000")
  },
  change(e){
    this.props.change(this.refs.pref)
  },
  render(){
    console.log(this.state)
    return (
      <div>
        <div>
          <input name="zipcode"/>
          <button onClick={this.autocompleteAddress}>Auto Input</button>
        </div>
        <div>
          <input refs="pref" valueLink={this.linkState("pref")} />
          <input refs="addr1" valueLink={this.linkState("addr1")} />
          <input refs="addr2" valueLink={this.linkState("addr2")} />
        </div>
      </div>
    )
  }
})