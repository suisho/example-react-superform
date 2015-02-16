var React = require("react")
var Marty = require("marty")
var UserStore = require("../store/UserStore")

var UserState = Marty.createStateMixin(UserStore)
var ZipcodeSource = require("../zipcode/ZipcodeSource")

module.exports = React.createClass({
  mixins : [React.addons.LinkedStateMixin, UserState],
  autocompleteAddress(e){
    e.preventDefault()
    ZipcodeSource.getAddress("1000000")
  },
  render(){
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

var React = require("react")
var Marty = require("marty")
var UserStore = require("../store/UserStore")

var UserState = Marty.createStateMixin(UserStore)
var ZipcodeSource = require("../zipcode/ZipcodeSource")

module.exports.b = React.createClass({
  autocompleteAddress(e){
    e.preventDefault()
    ZipcodeSource.getAddress("1000000")
  },
  render(){
    console.log(this.props)
    return (
      <div>
        <div>
          <input name="zipcode"/>
          <button onClick={this.autocompleteAddress}>Auto Input</button>
        </div>
        <div>
          <input refs="pref_p" valueLink={this.props.pref}/>
          <input refs="addr1_p" valueLink={this.props.addr1} />
          <input refs="addr2_p" valueLink={this.props.addr2} />
        </div>
      </div>
    )
  }
})