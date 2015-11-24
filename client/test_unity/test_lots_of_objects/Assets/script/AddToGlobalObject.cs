using UnityEngine;
using System.Collections;
using GlobalObjectNameSpace;

public class AddToGlobalObject : MonoBehaviour {


	// Use this for initialization
	void Start () {
		GlobalObjectManager.getInstance ().objects.Add (this.transform.gameObject);
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
