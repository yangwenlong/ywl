var bt_node = require("./bt_node.js")
var tables = require("../util/tables.js")
var inspect = require("util").inspect
var math = require("../util/math.js")

var ShowTextAction = function(tick)
{
	bt_node.ActionNode.call(this)
}
ShowTextAction.prototype = new bt_node.ActionNode()


ShowTextAction.prototype.step = function(tick)
{
	var ent = tick.ent
	console.log("the ent count is "+ent.count)
	if(tables.getAiText(ent.count)==undefined)
	{
		return bt_node.FAILURE
	}
	console.log("hahaha"+tables.getAiText(ent.count).TEXT)
	ent.showTextAction(0,tables.getAiText(ent.count).TEXT)
	// console.log(inspect(tables))
	ent.count += 1
	return bt_node.SUCCESS
}

var WanderAction = function(radius)
{
	bt_node.ActionNode.call(this)
	this.target_position = null
	this.wander_radius = radius
}
WanderAction.prototype = new bt_node.ActionNode()

WanderAction.prototype._execute = function(tick)
{
	// console.log("this is WanderAction")
	return this.step(tick)
}

WanderAction.prototype.reset_target_position = function(ent)
{
	this.target_position = [ent.position[0]+Math.random()*this.wander_radius+1,ent.position[1]+Math.random()*this.wander_radius+1,ent.position[2]]
}

WanderAction.prototype.step = function(tick)
{
	var ent = tick.ent
	if(!this.target_position)
	{
		this.reset_target_position(ent)
	}
	if(math.distance(this.target_position,ent.position)<=0.5)
	{
		this.reset_target_position(ent)
		return bt_node.SUCCESS
	}
	else
	{
		var dir = [this.target_position[0]-ent.position[0],this.target_position[1]-ent.position[1],0]
		var distance = math.distance(this.target_position,ent.position)
		dir = [dir[0]*0.5/distance,dir[1]*0.5/distance,0]
		ent.position = [ent.position[0]+dir[0],ent.position[1]+dir[1],0]
		return bt_node.RUNNING
	}
	
}


var SeekAction = function()
{
	bt_node.ActionNode.call(this)
	this.target_position = null
}
SeekAction.prototype = new bt_node.ActionNode()

SeekAction.prototype._execute = function(tick)
{
	console.log("this is SeekAction")
	return this.step(tick)
}

SeekAction.prototype.step = function(tick)
{
	
}

var RotateAction = function()
{
	bt_node.ActionNode.call(this)
	this.target_position = null
}

RotateAction.prototype = new bt_node.ActionNode()

RotateAction.prototype._execute = function(tick)
{

}

RotateAction.prototype.step = function(tick)
{
	
}

exports.ShowTextAction = ShowTextAction
exports.WanderAction = WanderAction
exports.SeekAction = SeekAction