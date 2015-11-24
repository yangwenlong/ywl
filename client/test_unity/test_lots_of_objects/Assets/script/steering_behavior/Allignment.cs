using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using GlobalObjectNameSpace;

public class Allignment : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}

	public Vector3 getNearByEntities()
	{
		Vector3 velocity = Vector3.zero;

		List<GameObject> all_objects = GlobalObjectManager.getInstance ().objects;
		for (int i=0; i<all_objects.Count; i++) {
			if(all_objects[i]!=this.gameObject)
			{
				GameObject go = all_objects[i];
				Movement m = go.GetComponent<Movement>();
				velocity += m.velocity;
			}
		}
		velocity = velocity / (all_objects.Count - 1);
		velocity.Normalize ();
		return velocity;
	}

	// Update is called once per frame
	void Update () {
		Vector3 velocity = getNearByEntities ();
		Movement m = GetComponent<Movement> ();
		m.addForce (velocity);
	}
}
