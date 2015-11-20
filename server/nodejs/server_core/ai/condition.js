var bt_node = require("./bt_node.js")
var blackboard = require("./blackboard.js")

var TimerReached = function(dur_time)
{
	ConditionNode.call(this)

	this._start_time = -1
	this._dur_time = dur_time
}

TimerReached.prototype.execute = function(tick)
{
	console.log("this is TimerReached")
	return this.step(tick)
}
TimerReached.prototype.step = function(tick)
{
	if(this._state!=bt_node.RUNNING)
	{
		this._start_time = time()
		return bt_node.FAILURE
	}
	else
	{
		if(this._start_time+this._dur_time<time())
			return bt_node.FAILURE
		else
			return bt_node.SUCCESS
	}
}

TimerReached.prototype.enterNode = function(tick)
{
	ConditionNode.prototype.enterNode.call(this,tick)
	this._start_time = blackboard.get_node_value(tick.tree,this,tick.ent,"_start_time",-1)
	this._dur_time   = blackboard.get_node_value(tick.tree,this,tick.ent,"_dur_time",-1)
}

TimerReached.prototype.leaveNode = function(tick)
{
	//移除node中的各种属性
	ConditionNode.prototype.leaveNode.call(this,tick)
	blackboard.set_node_value(tick.tree,this,tick.ent,"_start_time",this._start_time)
	blackboard.set_node_value(tick.tree,this,tick.ent,"_dur_time",this._dur_time)
}

TimerReached.prototype = new ConditionNode()

