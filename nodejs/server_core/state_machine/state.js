var STATE_ID = 
{
 	IDLE_STATE = 1,
 	FIGHTING_STATE = 2,
 	RUNAWAY_STATE = 3,
 	TALK_STATE = 4,
}


var EVENT_TYPE = 
{
	TRIGGER_IDLE_STATE = 1,
	TRIGGER_FIGHTING_STATE = 2,
	TRIGGER_RUNAWAY_STATE = 3,
	TRIGGER_TALK_STATE = 4,
}

exports.State = function(id,ent,machine)
{
	this.id = id
	this.ent = ent
	this.machine = machine
}

State.prototype = {
    getId : function(){
        return this.id
    },
    this.onTrigger = function(event_type,data)
	{
		if(event_type == EVENT_TYPE.TRIGGER_IDLE_STATE)
			this.next_state = this.machine.getState(STATE_ID.IDLE_STATE)
		else if(event_type == EVENT_TYPE.TRIGGER_TALK_STATE)
			this.next_state = this.machine.getState(STATE_ID.TALK_STATE)
		else if(event_type == EVENT_TYPE.TRIGGER_RUNAWAY_STATE)
			this.next_state = this.machine.getState(STATE_ID.RUNAWAY_STATE)
		else if(event_type == EVENT_TYPE.TRIGGER_FIGHTING_STATE)
			this.next_state = this.machine.getState(STATE_ID.FIGHTING_STATE)
	}
	this.onLeave = function(next_state)
	{

	}
	this.onEnter = function(from_state)
	{

	}
	this.check = function()
	{
		return this.next_state
	}
}

//无所事事状态    
function IdleState(id,ent,machine)
{
    State.call(this,id,ent,machine)

    
}
IdleState.prototype = new State()
IdleState.prototype.constructor = IdleState


//战斗状态
function FightingState(id,ent,machine)
{
    State.call(this,id,ent,machine)

    
}
FightingState.prototype = new State()
FightingState.prototype.constructor = FightingState

//逃跑状态
function RunawayState(id,ent,machine)
{
    State.call(this,id,ent,machine)

}
RunawayState.prototype = new State()
RunawayState.prototype.constructor = RunawayState

//逃跑状态
function TalkState(id,ent,machine)
{
    State.call(this,id,ent,machine)

    
}
TalkState.prototype = new State()
TalkState.prototype.constructor = TalkState

//离开状态


exports.StateMachine = function (ent) 
{
		this.monster = ent
		State current_state;
		all_states = {}
		init_all_states ()

		this.init_all_states = function()
		{
			idle_state = new IdleState(STATE_ID.IDLE_STATE,this.monster,this)
			fighting_state = new FightingState(STATE_ID.FIGHTING_STATE,this.monster,this)
			runaway_state = new RunawayState(STATE_ID.RUNAWAY_STATE,this.monster,this)
			talk_state = new TalkState(STATE_ID.TALK_STATE,this.monster,this)

			this.addState(idle_state)
			this.addState(fighting_state)
			this.addState(runaway_state)
			this.addState(talk_state)
		}

		this.addState = function(state)
		{
			this.all_states [state.id] = state
		}

		this.getState = function(id)
		{
			return this.all_states[id]
		}

		this.run = function(state)
		{
			if (current_state!=null)
				current_state.onLeave (state)
			if(state==null)
				state = this.getState (STATE_ID.IDLE_STATE)
			state.onEnter (current_state)
			current_state = state
		}
		this.onTrigger = function(event_type,data)
		{
			current_state.onTrigger (event_type, data)
			State next_state = current_state.check ()
			if ((next_state==null) || (next_state.id == current_state.id)) {
				return
			}
			current_state.onLeave (next_state)
			next_state.onEnter (current_state)
			current_state = next_state
		}
}


Monster = function()
{
	this.talk = function()
	{
		console.log("hahahah I am a monster")
	}

	this.idle = function()
	{
		console.log("idle...idle....annoy")
	}

	this.fighting = function()
	{
		console.log("fighting..fighting...I love it")
	}

	this.runaway = function()
	{
		console.log("runaway..runaway...I hate it")
	}

	this.machine = StateMachine(this)
}

m = new Monster()