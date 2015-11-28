var bt_node = require("./bt_node.js")
var blackboard = require("./blackboard.js").global_black_board
var math = require("../util/math.js")

var TimerReached = function(dur_time)
{
	bt_node.ConditionNode.call(this)
	this._start_time = -1
	this._dur_time = Number(dur_time)
}

TimerReached.prototype = new bt_node.ConditionNode()

TimerReached.prototype._execute = function(tick)
{
	console.log("this is TimerReached")
	return this.step(tick)
}
TimerReached.prototype.step = function(tick)
{
	if(this._start_time<=0)
	{
		var date = new Date()
		this._start_time = date.getTime()
		return bt_node.RUNNING
	}
	else
	{
		var date = new Date()
		if((this._start_time+this._dur_time)<=date.getTime())
		{
			this._start_time = -1
			return bt_node.SUCCESS
		}
		else
		{
			return bt_node.RUNNING
		}
			
	}
}

TimerReached.prototype.enterNode = function(tick)
{
	bt_node.ConditionNode.prototype.enterNode.call(this,tick)
	this._start_time = blackboard.get_node_value(tick.tree,this,tick.ent,"_start_time",this._start_time)
	this._dur_time   = blackboard.get_node_value(tick.tree,this,tick.ent,"_dur_time",this._dur_time)
}

TimerReached.prototype.leaveNode = function(tick)
{
	//移除node中的各种属性
	bt_node.ConditionNode.prototype.leaveNode.call(this,tick)
	blackboard.set_node_value(tick.tree,this,tick.ent,"_start_time",this._start_time)
	blackboard.set_node_value(tick.tree,this,tick.ent,"_dur_time",this._dur_time)
}



//=======================================================================================================================================

var CircleTrap = function(radius)
{
	bt_node.ConditionNode.call(this)
	this.radius = Number(radius)
}

CircleTrap.prototype = new bt_node.ConditionNode()

CircleTrap.prototype._execute = function(tick)
{
	// console.log("this is CircleTrap")
	return this.step(tick)
}
CircleTrap.prototype.step = function(tick)
{
	var entity_js = require('../entities/entity.js')
	var entities = entity_js.getAllEntities()
	for(var entid in entities)
	{
		var entity = entities[entid]
		if(entity!=tick.ent && math.distance(entity.position,tick.ent.position)<=this.radius)
		{
			return bt_node.SUCCESS
		}
	}
	return bt_node.FAILURE
}

CircleTrap.prototype.enterNode = function(tick)
{
	bt_node.ConditionNode.prototype.enterNode.call(this,tick)
	this.radius = blackboard.get_node_value(tick.tree,this,tick.ent,"radius",this.radius)
}

CircleTrap.prototype.leaveNode = function(tick)
{
	//移除node中的各种属性
	bt_node.ConditionNode.prototype.leaveNode.call(this,tick)
	blackboard.set_node_value(tick.tree,this,tick.ent,"radius",this.radius)
}



exports.CircleTrap = CircleTrap
exports.TimerReached = TimerReached