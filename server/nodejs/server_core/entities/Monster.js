
var entity_js = require('./entity.js')
var state_machine = require('../state_machine/state.js')

function Monster(id)
{
	entity_js.Entity.call(this,id)
    this._type = 'Monster'
    this.position = [10,2,0]

	this.talk = function()
	{
		console.log("hahahah I am a monster")
		this.position = [Math.random()*100,Math.random()*100,0]
	}

	this.idle = function()
	{
		this.position = [Math.random()*100,Math.random()*100,0]
		console.log("idle...idle....annoy")
	}

	this.fighting = function()
	{
		this.position = [Math.random()*100,Math.random()*100,0]
		console.log("fighting..fighting...I love it")
	}

	this.runaway = function()
	{
		this.position = [Math.random()*100,Math.random()*100,0]
		console.log("runaway..runaway...I hate it")
	}

	this.machine = new state_machine.StateMachine(this)
}

Monster.prototype = new entity_js.Entity()
Monster.prototype.constructor = Monster

Monster.prototype.enterWorld = function()
{

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