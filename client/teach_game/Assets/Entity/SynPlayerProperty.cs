using UnityEngine;
using System.Collections;
using EntityNS;

public class SynPlayerProperty : MonoBehaviour {

	// Use this for initialization
	void Start () {
		StartCoroutine(SynProperty());
	}

	IEnumerator SynProperty ()
	{
		while(true)
		{
			GameObject player = EntityManager.getInstance().player.instance;
			EntityManager.getInstance().getPlayer().cell.cellMethod("position", player.transform.position.x , player.transform.position.y, 0);
			yield return new WaitForSeconds(0.1f);
		}

	}

	// Update is called once per frame
	void Update () {
	
	}
}
