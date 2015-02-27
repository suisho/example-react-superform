var React = require("react")
var treeCheck = require("../lib/tree_check")
var CheckBox = require("../component/CheckBox.jsx")
var fixture = {
  "name" : "p",
  "checked" : true,
  "children" : [
    { "checked" : false ,
      "name" : "A",
      "children" : [
          { "checked" : true, "name" : "A-1" },
          { "checked" : true, "name" : "A-2"},
          { "checked" : true, "name" : "A-3" },
      ]
    },
    { "checked" : false, "name" : "B" },
    { "checked" : true ,
      "name" : "C",
      "children" : [
          { "checked" : true, "name" : "C-1" },
          { "checked" : false, "name" : "C-2"},
          { "checked" : true, "name" : "C-3" },
      ]
    },
    { "checked" : true ,
      "name" : "D",
      "children" : [
          { "checked" : false, "name" : "D-1" },
          { "checked" : false, "name" : "D-2"},
      ]
    },
  ]
}
var generateCheckbox = function(item, keys, onChange){
  var children = item.children || []
  var childrenComponents = children.map(function(child, i){
    var k = keys.concat()
    k.push(i)
    var c = generateCheckbox(child, k, onChange)
    return (<li key={i}>{c}</li>)
  })
  var childUl = (children.length > 0)
              ? (<ul>{childrenComponents}</ul>)
              : null
  return (
    <div>
      <CheckBox
        name={keys.join(".")}
        checked={item.checked}
        onChange={onChange}
        label={item.name} />
      {childUl}
    </div>
  )
}
module.exports = React.createClass({
  getInitialState : function(){
    return {
      data : [treeCheck.every(fixture)]
    }
  },
  onChange : function(e){
    var data = this.state.data
    treeCheck.set(data, e.target.name.split("."), e.target.checked)
    var newData = treeCheck.every(data[0])
    this.setState({
      data : [newData]
    })
  },
  render(){
    var cbs = generateCheckbox(this.state.data[0], [0], this.onChange)
    return (
      <div>
        <ul>
          <li>
            {cbs}
          </li>
        </ul>
      </div>
    )
  }
})
