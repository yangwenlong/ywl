using UnityEngine;
using System.Collections;
using UnityEngine.EventSystems;

public class select_room_panel : MonoBehaviour {

	// Use this for initialization
	void Start () {
		GameUIs.getInstance ().select_room_panel = this.gameObject;
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	public void onEscape()
	{
		GameUIs.getInstance ().machine.onTrigger (state_machine.EVENT_TYPE.TRIGGER_LOGIN_STATE, null);
	}

	public void gotoHall()
	{
		GameUIs.getInstance ().machine.onTrigger (state_machine.EVENT_TYPE.TRIGGER_HALL_STATE, null);
	}
}
