using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using UnityEngine.EventSystems;
using UnityEngine.Events;

public class hall_panel : MonoBehaviour {

	void Start () 
	{
		GameUIs.getInstance ().hall_panel = this.gameObject;
	}
	
	public void OnButtonClick(){
		GameUIs.getInstance ().machine.onTrigger (state_machine.EVENT_TYPE.TRIGGER_CREATE_ROOM_STATE, null);
	}
	public void onEscape()
	{
		GameUIs.getInstance ().machine.onTrigger (state_machine.EVENT_TYPE.TRIGGER_SELECT_ROOM_STATE, null);
	}
}
