
var entity_js = require('./entity.js')
var state_machine = require('../state_machine/state.js')
var bt_tree = require("../ai/bt_tree.js")
var physics = require("../physics/movement.js")

var monster_bt = undefined

var load_monster_bt = function(tree,param)
{
	
	monster_bt = tree
}

bt_tree.load_behavior_tree("../test/test_bt_.xml",load_monster_bt)

function Monster(id)
{
	console.log("the id is "+id)
	entity_js.Entity.call(this,id)
	this.movement = new physics.entity_physics(this)
    this._type = 'Monster'
    this.count = 1
    // this.position = [10,2,0]

    this.seek = function(target_pos)
    {
    	this.movement.seek(target_pos)
    }

    this.wander = function()
    {
    	this.movement.wander()
    }

	this.talk = function()
	{
		entity_js.Entity.prototype.position = [Math.random()*100,Math.random()*100,0.0]
		console.log("hahahah I am a monster"+entity_js.Entity.prototype.position)
	}

	this.idle = function()
	{
		console.log("idle......"+entity_js.Entity.prototype.position)
		entity_js.Entity.prototype.position = [Math.random()*100,Math.random()*100,0.0]
		console.log("idle...idle....annoy"+entity_js.Entity.prototype.getId.apply(this)+entity_js.Entity.prototype.position)
	}

	this.fighting = function()
	{
		entity_js.Entity.prototype.position = [Math.random()*100,Math.random()*100,0.0]
		console.log("fighting..fighting...I love it"+entity_js.Entity.prototype.position)
	}

	this.runaway = function()
	{
		entity_js.Entity.prototype.position = [Math.random()*100,Math.random()*100,0.0]
		console.log("runaway..runaway...I hate it"+entity_js.Entity.prototype.position)
	}


	// this.machine = new state_machine.StateMachine(this)
}



Monster.prototype = new entity_js.Entity()
Monster.prototype.constructor = Monster
Monster.prototype.enterWorld = function()
{
	console.log("this is enterWorld of monster...")
	// setTimeout(this.idle,0)
	// setTimeout(this.talk,2000)
	// setTimeout(this.fighting,5000)
	// setTimeout(this.runaway,10000)
	// this.showTextAction(0,"hahah")
	// this.run_bt()
}

// //pos为偏移量
Monster.prototype.showTextAction = function(pos,text)
{
	entity_js.rpc_proxy(this,'showTextAction',text)
}

Monster.prototype.run_bt = function()
{

	if(monster_bt)
	{
		// var inspect = require("../util/inspect.js").inspect
		// console.log("the inspect is "+(monster_bt instanceof bt_tree.Behavior_Tree))
		monster_bt.run_bt(monster_bt,this)
	}
}

Monster.prototype.tick = function(tick_time)
{
	this.wander()
	this.movement.tick(tick_time/1000.0)
	this.run_bt()
}

exports.Monster = Monster

// function create_entity_cb(ent)
// {
// 	console.log("this is ent"+ent)
// }

// entity_js.create_entity('../defs/Monster.xml',null)
// m.machine.onTrigger( EVENT_TYPE.TRIGGER_IDLE_STATE, "++++++++++goto idle+++++++++++++")
// m.machine.onTrigger( EVENT_TYPE.TRIGGER_FIGHTING_STATE, "++++++++++goto fighting+++++++++++++")
// m.machine.onTrigger( EVENT_TYPE.TRIGGER_RUNAWAY_STATE, "++++++++++goto runaway+++++++++++++")
// m.machine.onTrigger( EVENT_TYPE.TRIGGER_TALK_STATE, "++++++++++goto talk+++++++++++++")