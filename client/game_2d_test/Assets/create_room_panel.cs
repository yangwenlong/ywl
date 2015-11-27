using UnityEngine;
using System.Collections;

public class create_room_panel : MonoBehaviour {

	// Use this for initialization
	void Start () {
		GameUIs.getInstance ().create_room_panel = this.gameObject;
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	public void onEscape()
	{
		GameUIs.getInstance ().machine.onTrigger (state_machine.EVENT_TYPE.TRIGGER_HALL_STATE, null);
	}
}
