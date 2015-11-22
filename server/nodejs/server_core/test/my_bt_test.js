var bt_tree = require("../ai/bt_tree.js")
var util = require("util")

var bt = new bt_tree.Behavior_Tree()
var entity = function()
{
	this.count = 1
	this.has_target = function(x)
	{
		return true
	},
	this.distance_lower_than = function(params)
	{
		return true
	}
}
var ent = new entity()

var run_bt = function(bt,ent,tree)
{
	function handle()
	{

		// console.log("this is run_bt"+util.inspect(ent,true,20))
		bt.run_bt(tree,ent)	
	}
	
	setInterval(handle,1000)
}

bt.load_behavior_tree("./test_bt_.xml",run_bt,bt,ent)


