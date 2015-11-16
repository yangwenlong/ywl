using UnityEngine;
using System.Collections;
using EntityNS;

public class test_entity : MonoBehaviour {

	float t;
	// Use this for initialization
	void Start () {

		AsynchronousClient.StartClient();
		t = Time.time;
	}
	
	// Update is called once per frame
	void Update () {
		if (Time.time - t > 1) {
			t = Time.time;
			//AsynchronousClient.Send("{\"id\":10000000,\"function\":\"username\",\"params\":\"xxxxxxxx\"}");
			//Debug.Log("the asynchr string is "+AsynchronousClient
			AsynchronousClient.ProcessPackage();
		}
	}
}
