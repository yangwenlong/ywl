using UnityEngine;
using System.Collections;
using EntityNS;

public class Move : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		if (Input.GetKey (KeyCode.A)) {
			GameObject player = EntityManager.getInstance().player.instance;
			EntityManager.getInstance().player.cellSetPosition(player.transform.position.x-1,player.transform.position.y,0);
		} else if (Input.GetKey (KeyCode.D)) {
		} else if (Input.GetKey (KeyCode.W)) {
		} else if (Input.GetKey (KeyCode.S)) {
		}
	}
}
