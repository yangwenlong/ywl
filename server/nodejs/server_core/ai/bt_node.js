var util = require("./ai_util.js")
var blackboard = require("./blackboard.js")
var inspect = require("util").inspect
// NODE STATES ================================================================
var START     = 0
var SUCCESS   = 1
var FAILURE   = 2
var RUNNING   = 3
var ERROR     = 4


var BaseNode = function() {
	this.initialize = function(children)
	{
		this.id = util.createUUID()
	 	this._state = START
	    this.children = []
	    if (children) {
	        for (var i=0;i<children.length;i++) {
	            this.children.push(children[i])
	        }
	    }
	}
    this.initialize()
}
 
// BaseNode.prototype.initialize = function(children) {
//     this.id = util.createUUID()
//  	this._state = START
//     this.children = []
//     if (children) {
//         for (var i=0;i<children.length;i++) {
//             this.children.push(children[i])
//         }
//     }
// }
 
BaseNode.prototype.execute = function(tick) {
	if(this.children.length==1)
	{
		console.log("this is BaseNode")
		this.children[0].execute(tick)
	}
    return true
}

BaseNode.prototype.enterNode = function(tick)
{
	//拷贝tick中的各种属性
	var state = blackboard.get_entity_state(tick.tree,this,tick.ent)
	if(state)
		this._state = state
	else
		this._state = START
}

BaseNode.prototype.leaveNode = function(tick)
{
	//移除node中的各种属性
	blackboard.set_entity_state(tick.tree,this,tick.ent,this._state)
	this._state = START
}


BaseNode.prototype.get_state = function()
{
	return this._state
}

BaseNode.prototype.set_state = function(state)
{
	this._state = state
}

// Executes behaviors in priority order until one of them is successful.
// Attempts to execute children in the order they were added.
// - If a child returns BT_FAILURE, begin executing the next child if there is one, else return BT_FAILURE.
// - If a child returns BT_ERROR, return BT_ERROR.
// - If a child returns BT_SUCCESS, return BT_SUCCESS.
// - If a child returns BT_RUNNING, return BT_RUNNING.

var SelectNode = function()
{
	BaseNode.call(this)
}

SelectNode.prototype = new BaseNode()

SelectNode.prototype.execute = function(tick)
{
	console.log("this is SelectNode")
	for(var child_name in this.children)
	{
		var child = this.children[child_name]
		var status = child.execute(tick)
		if(status!=FAILURE)
		{
			return status
		}
	}
}


// Executes behaviors in order
// Executes its children in the order they were added.
// If the currently executing child returns BT_FAILURE, BT_ERROR, or BT_RUNNING, this returns the same status.
// If the currently executing child returns BT_SUCCESS, this begins executing the next child, if it exists. 
// It continues in this fashion until one of the children returns BT_FAILURE, BT_ERROR, or BT_RUNNING. 
// If all children have successfully executed, it will return BT_SUCCESS.

var SeqNode = function()
{
	BaseNode.call(this)
}

SeqNode.prototype = new BaseNode()

SeqNode.prototype.execute = function(tick)
{
	console.log("this is SeqNode")
	for(var child_name in this.children)
	{
		
		var child = this.children[child_name]
		var status = child.execute(tick)
		if(status!=SUCCESS)
		{
			return status
		}
	}
}

// Execute behaviors in parallel

var ParallelNode = function()
{
	BaseNode.call(this)
}
ParallelNode.prototype = new BaseNode()
ParallelNode.prototype.execute = function(tick)
{
	console.log("this is ParallelNode")
	for(var child_name in this.children)
	{
		var child = this.children[child_name]
		var status = child.execute(tick)
	}
}




var ActionNode = function()
{
	BaseNode.apply()
}
ActionNode.prototype = new BaseNode()
ActionNode.prototype.execute = function(tick)
{
	console.log("this is ActionNode")
	return this.step(tick)
}

ActionNode.prototype.step = function(tick)
{
	return SUCCESS
}


var ConditionNode = function(operation,params)
{
	BaseNode.call(this)
	this._operation = operation
	this._params = params
}

ConditionNode.prototype = new BaseNode()
ConditionNode.prototype.execute = function(tick)
{
	console.log("this is ConditionNode")
	return this.step(tick)
}
ConditionNode.prototype.step = function(tick)
{
	var ent = tick.ent
	var result = ent[this._operation](this._params)
	if(result)
		return SUCCESS
	return FAILURE
}


var If_True_Condition_Action_Else_Action = function(tick)
{

}

exports.BaseNode = BaseNode
exports.SelectNode = SelectNode
exports.SeqNode = SeqNode
exports.ActionNode = ActionNode
exports.ConditionNode = ConditionNode
exports.ParallelNode = ParallelNode
exports.START     = START
exports.SUCCESS   = SUCCESS
exports.FAILURE   = FAILURE
exports.RUNNING   = RUNNING
exports.ERROR     = ERROR

