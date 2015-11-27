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
			this.transform.position += new Vector3(-0.05f,0f,0f);
            //GameObject player = EntityManager.getInstance().player.instance;
			//EntityManager.getInstance().getPlayer().cell.cellMethod("position", player.transform.position.x-5,player.transform.position.y,0);
		} else if (Input.GetKey(KeyCode.D)) {
			this.transform.position += new Vector3(0.05f,0f,0f);
            //GameObject player = EntityManager.getInstance().player.instance;
            //EntityManager.getInstance().getPlayer().cell.cellMethod("position", player.transform.position.x + 5, player.transform.position.y, 0);
        } else if (Input.GetKey(KeyCode.W)) {
			this.transform.position += new Vector3(0f,0.05f,0f);
            //GameObject player = EntityManager.getInstance().player.instance;
            //EntityManager.getInstance().getPlayer().cell.cellMethod("position", player.transform.position.x, player.transform.position.y+5, 0);
        } else if (Input.GetKey(KeyCode.S)) {
			this.transform.position += new Vector3(0f,-0.05f,0f);
            //GameObject player = EntityManager.getInstance().player.instance;
            //EntityManager.getInstance().getPlayer().cell.cellMethod("position", player.transform.position.x, player.transform.position.y-5, 0);
        }
	}
}
