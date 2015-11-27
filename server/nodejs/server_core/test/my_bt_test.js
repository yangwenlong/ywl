var bt_tree = require("../ai/bt_tree.js")
var util = require("util")

var entity_js = require("../entities/entity.js")

var avatar,monster

function create_entity_cb(ent)
{
	// ent.position = [Math.random()*100,Math.random()*100,0.0]
	avatar = ent
	console.log("the position is "+ent.position)
}

function run_bt()
{
	var bt = new bt_tree.Behavior_Tree()

	var run_bt = function(bt,ent,tree)
	{
		function handle()
		{

			// console.log("this is run_bt"+util.inspect(ent,true,20))
			bt.run_bt(tree,ent)	
		}
		
		setInterval(handle,1000)
	}

	bt.load_behavior_tree("./test_bt_.xml",run_bt,bt,monster)
}

function create_monster_cb(ent)
{
	// ent.position = [Math.random()*100,Math.random()*100,0.0]
	monster = ent

	// run_bt()
}



entity_js.create_entity('../defs/Avatar.xml',create_entity_cb)
entity_js.create_entity('../defs/Monster.xml',create_monster_cb)




