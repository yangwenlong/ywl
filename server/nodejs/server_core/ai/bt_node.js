var util = require("./ai_util.js")
var blackboard = require("./blackboard.js").global_black_board
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
	this.enterNode(tick)

	this.open(tick)

	var status = this._execute(tick)

	if(status!=RUNNING)
	{
		this.close(tick)	
	}
	
	this.leaveNode(tick)
	return status
}

BaseNode.prototype._execute = function(tick)
{
	return FAILURE
}

BaseNode.prototype.enterNode = function(tick)
{
	
}

BaseNode.prototype.leaveNode = function(tick)
{
	var is_open = blackboard.get_open_nodes(tick.tree,tick.ent,this)
	if(!is_open)
	{
		tick.set_open_nodes_of_tree(this)
	}
}



BaseNode.prototype.open = function(tick)
{
	var is_open = blackboard.get_open_nodes(tick.tree,tick.ent,this)
	if(!is_open)
	{
		blackboard.set_open_nodes(tick.tree,tick.ent,this,true)
	}
	this._open(tick)
}

BaseNode.prototype._open = function(tick)
{

}

BaseNode.prototype.close = function(tick)
{
	this._close(tick)
	blackboard.set_open_nodes(tick.tree,tick.ent,this,false)
}

BaseNode.prototype._close = function(tick)
{

}

// link node
var LinkNode = function()
{
	BaseNode.call(this)
}

LinkNode.prototype = new BaseNode()

LinkNode.prototype._execute = function(tick) {
	if(this.children.length==1)
	{
		this.children[0].execute(tick)
	}
    return true
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

SelectNode.prototype._execute = function(tick)
{
	// console.log("this is SelectNode")
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

SeqNode.prototype._execute = function(tick)
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
ParallelNode.prototype._execute = function(tick)
{
	// console.log("this is ParallelNode")
	for(var child_name in this.children)
	{
		var child = this.children[child_name]
		var status = child.execute(tick)
	}
	return SUCCESS
}




var ActionNode = function()
{
	BaseNode.call(this)
}
ActionNode.prototype = new BaseNode()
ActionNode.prototype._execute = function(tick)
{
	// console.log("this is ActionNode")
	return this.step(tick)
}

ActionNode.prototype.step = function(tick)
{
	return SUCCESS
}


var ConditionNode = function()
{
	BaseNode.call(this)
}

ConditionNode.prototype = new BaseNode()
ConditionNode.prototype._execute = function(tick)
{
	// console.log("this is ConditionNode")
	return this.step(tick)
}
ConditionNode.prototype.step = function(tick)
{
	var ent = tick.ent
	
	return SUCCESS
}


var MemSequence = function()
{
	BaseNode.call(this)
}

MemSequence.prototype = new BaseNode()
MemSequence.prototype._execute = function(tick)
{
	var child = blackboard.get_node_value(tick.tree,this,tick.ent,'runningChild',0)
    for (var i=child; i<this.children.length; i++) {
        var status = this.children[i]._execute(tick)

        if (status !== SUCCESS) {
            if (status === RUNNING) {
                blackboard.set_node_value(tick.tree,this,tick.ent,'runningChild',i)
            }
            return status
        }
    }

    return SUCCESS
}


var MemLoopSequence = function()
{
	BaseNode.call(this)
}

MemLoopSequence.prototype = new BaseNode()
MemLoopSequence.prototype._execute = function(tick)
{

	var child = blackboard.get_node_value(tick.tree,this,tick.ent,'runningChild',0)
	if(child>=this.children.length)
		child = 0
    for (var i=child; i<this.children.length; i++) {
        var status = this.children[i]._execute(tick)
        if (status !== SUCCESS) {
            if (status === RUNNING) {
                blackboard.set_node_value(tick.tree,this,tick.ent,'runningChild',i)
            }
            return status
        }
    }
    blackboard.set_node_value(tick.tree,this,tick.ent,'runningChild',0)
    return SUCCESS
}



exports.BaseNode = BaseNode
exports.LinkNode = LinkNode
exports.SelectNode = SelectNode
exports.SeqNode = SeqNode
exports.ActionNode = ActionNode
exports.ConditionNode = ConditionNode
exports.ParallelNode = ParallelNode
exports.MemSequence = MemSequence
exports.MemLoopSequence = MemLoopSequence
exports.START     = START
exports.SUCCESS   = SUCCESS
exports.FAILURE   = FAILURE
exports.RUNNING   = RUNNING
exports.ERROR     = ERROR

