var _ = require("lodash")
var React = require("react")
var Marty = require("marty")
var UserStore = require("../store/UserStore")
var ZipcodeSource = require("../source/ZipcodeSource")
//var Typeahead = require("react-typeahead").Typeahead
var UserState = Marty.createStateMixin(UserStore)


var prefs = [
  "北海道", "青森"
]

// Use LinkedStateMixin + MartyState
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
          <input valueLink={this.linkState("pref")} />
          <input valueLink={this.linkState("addr1")} />
          <input valueLink={this.linkState("addr2")} />
        </div>
      </div>
    )
  }
})

// controlled + UserState
module.exports.b = React.createClass({
  mixins : [UserState],
  autocompleteAddress(e){
    e.preventDefault()
    ZipcodeSource.getAddress("1000000")
  },
  onChange(e){
    var change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
  },
  render(){
    return (
      <div>
        <div>
          <input name="zipcode"/>
          <button onClick={this.autocompleteAddress}>Auto Input</button>
        </div>
        <div>
          <input name="pref" value={this.state.pref} onChange={this.onChange}/>
          <input name="addr1" value={this.state.addr1} onChange={this.onChange} />
          <input name="addr2" value={this.state.addr2} onChange={this.onChange} />
        </div>
      </div>
    )
  }
})


// uncontrolled
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

// prop
module.exports.d = React.createClass({
  autocompleteAddress(e){
    e.preventDefault()
    ZipcodeSource.getAddress("1000000")
  },
  onChange(e){
    var change = {}
    change[e.target.name] = e.target.value
    this.props.updateHandler(change)
  },
  render(){
    return (
      <div>
        <div>
          <input name="zipcode"/>
          <button onClick={this.autocompleteAddress}>Auto Input</button>
        </div>
        <div>
          <input name="pref" value={this.props.pref} onChange={this.onChange}/>
          <input name="addr1" value={this.props.addr1} onChange={this.onChange} />
          <input name="addr2" value={this.props.addr2} onChange={this.onChange} />
        </div>
      </div>
    )
  }
})