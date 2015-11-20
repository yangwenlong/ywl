var bt_node = require("./bt_node.js")

var ShowTextAction = function(tick)
{
	bt_node.ActionNode.call(this)
}
ShowTextAction.prototype = new bt_node.ActionNode()
ShowTextAction.prototype.execute = function(tick)
{
	console.log("this is ShowTextAction")
	return this.step(tick)
}

ShowTextAction.prototype.step = function(tick)
{
	console.log("hahaha")
	return bt_node.SUCCESS
}



var PlayModelAction = function(tick)
{
	bt_node.ActionNode.apply()
}

PlayModelAction.prototype.execute = function(tick)
{
	console.log("this is PlayModelAction")
	return this.step(tick)
}

PlayModelAction.prototype.step = function(tick)
{
	return bt_node.SUCCESS
}

PlayModelAction.prototype = new bt_node.ActionNode()

exports.ShowTextAction = ShowTextAction
exports.PlayModelAction = PlayModelAction