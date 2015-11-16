using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class ShowJoint : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		int index = 0;

		Vector3 position = transform.position;
		Queue<Transform> child = new Queue<Transform> ();

		foreach (Transform c in transform) {
			Joint joint = c.GetComponent<Joint>();
			c.position = position + new Vector3(Mathf.Cos(joint.direction)*joint.length,Mathf.Sin(joint.direction)*joint.length,0);
			child.Enqueue(c);
			LineRenderer lr = c.GetComponent<LineRenderer>();
			lr.SetWidth(0.1f,0.1f);
			lr.SetPosition(0,c.position);
			lr.SetPosition(1,position);
		}

		while(child.Count>0)
		{
			Transform ct = child.Dequeue();
			
			foreach (Transform c in ct) {
				Joint joint = c.GetComponent<Joint>();
				c.position = ct.position + new Vector3(Mathf.Cos(joint.direction)*joint.length,Mathf.Sin(joint.direction)*joint.length,0);
				child.Enqueue(c);
				
				LineRenderer lr = c.GetComponent<LineRenderer>();
				lr.SetPosition(0,c.position);
				lr.SetWidth(0.1f,0.1f);
				lr.SetPosition(1,ct.position);
			}
		}
	}
}
