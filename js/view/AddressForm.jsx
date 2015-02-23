var _ = require("lodash")
var React = require("react")
var Marty = require("marty")
var UserStore = require("../store/UserStore")
var ZipcodeSource = require("../source/ZipcodeSource")
var Typeahead = require("react-typeahead").Typeahead
var UserState = Marty.createStateMixin(UserStore)


var prefs = [
  "北海道", "青森"
]

module.exports = React.createClass({
  mixins : [React.addons.LinkedStateMixin, UserState],
  autocompleteAddress(e){
    e.preventDefault()
    ZipcodeSource.getAddress("1000000")
  },
  onChangePref(e){
    if(_.indexOf(prefs, e.target.value)){
      console.log("same")
    }
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
          <Typeahead options={prefs} onChange={this.onChangePref} />
          <input refs="addr1" valueLink={this.linkState("addr1")} />
          <input refs="addr2" valueLink={this.linkState("addr2")} />
        </div>
      </div>
    )
  }
})

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

module.exports.c = React.createClass({
  autocompleteAddress(e){
    e.preventDefault()
    ZipcodeSource.getAddress("1000000")
  },
  getRefsData(){
    return {
      pref : this.refs.pref.getDOMNode().value,
      addr1 : this.refs.addr1.getDOMNode().value,
      addr2 : this.refs.addr2.getDOMNode().value
    }
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
          <input ref="pref" defaultValue={this.props.pref}/>
          <input ref="addr1" defaultValue={this.props.addr1} />
          <input ref="addr2" defaultValue={this.props.addr2} />
        </div>
      </div>
    )
  }
})
