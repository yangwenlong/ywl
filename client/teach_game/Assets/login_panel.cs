using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using UnityEngine.EventSystems;
using UnityEngine.Events;

public class login_panel : MonoBehaviour {

	public Button	button;
	void Start () 
	{
		EventTriggerListener.Get(button.gameObject).onClick =OnButtonClick;
		GameUIs.getInstance ().login_panel = this.gameObject;
		GameUIs.getInstance ().hide_all ();
		GameUIs.getInstance ().machine.run (null);
	}
	
	private void OnButtonClick(GameObject go){
		GameUIs.getInstance ().machine.onTrigger (state_machine.EVENT_TYPE.TRIGGER_SELECT_ROOM_STATE, null);
	}
}
