
var entity_js = require('./entity.js')
var state_machine = require('../state_machine/state.js')

function Monster(id)
{
	entity_js.Entity.call(this,id)
    entity_js.Entity.prototype._type = 'Monster'
    // this.position = [10,2,0]

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

	this.machine = new state_machine.StateMachine(this)
}

Monster.prototype = new entity_js.Entity()
Monster.prototype.parent = entity_js.Entity.prototype
Monster.prototype.constructor = Monster
Monster.prototype.getId = entity_js.Entity.getId
Monster.prototype.enterWorld = function()
{
	console.log("this is enterWorld of monster...")
	setTimeout(this.idle,0)
	setTimeout(this.talk,2000)
	setTimeout(this.fighting,5000)
	setTimeout(this.runaway,10000)
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