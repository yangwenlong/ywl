using System;
using System.Collections;
using System.Collections.Generic;
namespace state_machine
{
	public enum EVENT_TYPE
	{
		TRIGGER_LOGIN_STATE,
		TRIGGER_SELECT_ROOM_STATE,
		TRIGGER_HALL_STATE,
		TRIGGER_CREATE_ROOM_STATE,
	}
	public enum STATE_ID
	{
		LOGIN_STATE,
		SELECT_ROOM_STATE,
		HALL_STATE,
		CREATE_ROOM_STATE
	}
	public abstract class State
	{
		public STATE_ID id;
		public State next_state;
		public StateMachine machine;
		public State(STATE_ID id,StateMachine machine)
		{
			this.id = id;
			this.machine = machine;
			this.machine.addState (this);
		}
		public abstract void onEnter (State from_state);
		public abstract void onLeave (State to_state);
		public virtual State check ()
		{
			return next_state;
		}
		public virtual void onTrigger (EVENT_TYPE event_type, object data)
		{
			if (event_type == EVENT_TYPE.TRIGGER_LOGIN_STATE) {
				this.next_state = machine.getState (STATE_ID.LOGIN_STATE);
			} else if (event_type == EVENT_TYPE.TRIGGER_SELECT_ROOM_STATE) {
				this.next_state = machine.getState (STATE_ID.SELECT_ROOM_STATE);
			} else if (event_type == EVENT_TYPE.TRIGGER_HALL_STATE) {
				this.next_state = machine.getState(STATE_ID.HALL_STATE);
			} else if (event_type == EVENT_TYPE.TRIGGER_CREATE_ROOM_STATE) {
				this.next_state = machine.getState(STATE_ID.CREATE_ROOM_STATE);
			}
		}
	}

	public class StateMachine  {
		private State current_state;
		private Dictionary<STATE_ID,State> all_states = new Dictionary<STATE_ID, State>();

		public StateMachine()
		{
			init_all_states ();
		}

		public void addState(State state)
		{
			this.all_states [state.id] = state;
		}

		private void init_all_states()
		{
			State login_state = new login_state (STATE_ID.LOGIN_STATE, this);
			State select_room_state = new select_room_state (STATE_ID.SELECT_ROOM_STATE, this);
			State hall_state = new hall_state (STATE_ID.HALL_STATE, this);
			State create_room_state = new create_room_state (STATE_ID.CREATE_ROOM_STATE, this);
		}

		public State getState(STATE_ID id)
		{
			return all_states [id];
		}

		public void run(State state)
		{
			if (current_state!=null)
				current_state.onLeave (state);
			if(state==null)
				state = this.getState (STATE_ID.LOGIN_STATE);
			state.onEnter (current_state);
			current_state = state;
		}
		public void onTrigger(EVENT_TYPE event_type,object data)
		{
			current_state.onTrigger (event_type, data);
			State next_state = current_state.check ();
			if ((next_state==null) || (next_state.id == current_state.id)) {
				return;
			}
			current_state.onLeave (next_state);
			next_state.onEnter (current_state);
			current_state = next_state;
		}
	}
}