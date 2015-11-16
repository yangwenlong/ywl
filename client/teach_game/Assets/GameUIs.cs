using UnityEngine;
using System.Collections;
using state_machine;

public class GameUIs {
	private static GameUIs _instance = null;

	public GameObject login_panel{ get; set;}
	public GameObject select_room_panel{ get; set;}
	public GameObject hall_panel { get; set; }
	public GameObject create_room_panel { get; set; }

	public StateMachine machine;

	private GameUIs()
	{
		this.machine = new StateMachine ();
	}
	public static GameUIs getInstance()
	{
		if(GameUIs._instance==null)
			GameUIs._instance = new GameUIs ();
		return GameUIs._instance;
	}
	public void hide_all()
	{
		login_panel.SetActive (false);
		select_room_panel.SetActive (false);
		hall_panel.SetActive (false);
		create_room_panel.SetActive (false);
	}
}
