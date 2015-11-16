using UnityEngine;
using System.Collections;
using EntityNS;

public class Move : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		if (Input.GetKeyUp (KeyCode.A)) {

            GameObject player = EntityManager.getInstance().player.instance;
			EntityManager.getInstance().getPlayer().cell.cellMethod("position", player.transform.position.x-2,player.transform.position.y,0);
		} else if (Input.GetKeyUp(KeyCode.D)) {
            GameObject player = EntityManager.getInstance().player.instance;
            EntityManager.getInstance().getPlayer().cell.cellMethod("position", player.transform.position.x + 2, player.transform.position.y, 0);
        } else if (Input.GetKeyUp(KeyCode.W)) {
            GameObject player = EntityManager.getInstance().player.instance;
            EntityManager.getInstance().getPlayer().cell.cellMethod("position", player.transform.position.x, player.transform.position.y+2, 0);
        } else if (Input.GetKeyUp(KeyCode.S)) {
            GameObject player = EntityManager.getInstance().player.instance;
            EntityManager.getInstance().getPlayer().cell.cellMethod("position", player.transform.position.x, player.transform.position.y-2, 0);
        }
	}
}
