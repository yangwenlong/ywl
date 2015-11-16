var STATE_ID = {}
{
 	STATE_ID.IDLE_STATE = 1
 	STATE_ID.FIGHTING_STATE = 2
 	STATE_ID.RUNAWAY_STATE = 3
 	STATE_ID.TALK_STATE = 4
}


var EVENT_TYPE = {}
{
	EVENT_TYPE.TRIGGER_IDLE_STATE = 1
	EVENT_TYPE.TRIGGER_FIGHTING_STATE = 2
	EVENT_TYPE.TRIGGER_RUNAWAY_STATE = 3
	EVENT_TYPE.TRIGGER_TALK_STATE = 4
}

function State(id,ent,machine)
{
	this.id = id
	this.ent = ent
	this.machine = machine
}

State.prototype = {
    getId : function(){
        return this.id
    },
    onTrigger: function(event_type,data)
	{
		console.log("the event_type is "+event_type+":"+data)
		if(event_type == EVENT_TYPE.TRIGGER_IDLE_STATE)
			this.next_state = this.machine.getState(STATE_ID.IDLE_STATE)
		else if(event_type == EVENT_TYPE.TRIGGER_TALK_STATE)
			this.next_state = this.machine.getState(STATE_ID.TALK_STATE)
		else if(event_type == EVENT_TYPE.TRIGGER_RUNAWAY_STATE)
			this.next_state = this.machine.getState(STATE_ID.RUNAWAY_STATE)
		else if(event_type == EVENT_TYPE.TRIGGER_FIGHTING_STATE)
			this.next_state = this.machine.getState(STATE_ID.FIGHTING_STATE)
	},
	onLeave : function(next_state)
	{

	},
	onEnter : function(from_state)
	{

	},
	check : function()
	{
		return this.next_state
	},
}


//------------------------------------------------------------------------
//无所事事状态    
function IdleState(id,ent,machine)
{
    State.call(this,id,ent,machine)

    
}
IdleState.prototype = new State()
IdleState.prototype.constructor = IdleState
IdleState.prototype.onEnter = function(from_state)
{
	this.ent.idle()
}


//------------------------------------------------------------------------
//战斗状态
function FightingState(id,ent,machine)
{
    State.call(this,id,ent,machine)

    
}
FightingState.prototype = new State()
FightingState.prototype.constructor = FightingState
FightingState.prototype.onEnter = function(from_state)
{
	this.ent.fighting()
}


//------------------------------------------------------------------------
//逃跑状态
function RunawayState(id,ent,machine)
{
    State.call(this,id,ent,machine)

}
RunawayState.prototype = new State()
RunawayState.prototype.constructor = RunawayState
RunawayState.prototype.onEnter = function(from_state)
{
	this.ent.runaway()
}


//------------------------------------------------------------------------
//逃跑状态
function TalkState(id,ent,machine)
{
    State.call(this,id,ent,machine)

    
}
TalkState.prototype = new State()
TalkState.prototype.constructor = TalkState
TalkState.prototype.onEnter = function(from_state)
{
	this.ent.talk()
}


//------------------------------------------------------------------------
//离开状态


function StateMachine(ent) 
{
		this.monster = ent
		this.current_state = null
		this.all_states = {}
		
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
			if (this.current_state!=null)
				this.current_state.onLeave (state)
			if(state==null)
				state = this.getState (STATE_ID.IDLE_STATE)
			state.onEnter (this.current_state)
			this.current_state = state
		}
		this.onTrigger = function(event_type,data)
		{
			this.current_state.onTrigger (event_type, data)
			next_state = this.current_state.check ()
			if ((next_state==null) || (next_state.id == this.current_state.id)) {
				return
			}
			this.current_state.onLeave (next_state)
			next_state.onEnter (this.current_state)
			this.current_state = next_state
		}

		this.init_all_states ()
		this.run()
}
exports.StateMachine = StateMachine