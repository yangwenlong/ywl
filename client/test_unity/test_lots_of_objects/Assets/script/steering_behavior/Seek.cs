using UnityEngine;
using System.Collections;

public class Seek : MonoBehaviour {

	public Vector3 target = Vector3.zero;
	public float max_velocity_speed = 1.0f;

	public void setTarget(Vector3 t)
	{
	}

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		Vector3 desired_velocity = (target - this.transform.position).normalized  * this.max_velocity_speed;
		Movement m = GetComponent<Movement> ();
		Vector3 steering = desired_velocity - m.velocity;
		steering = steering / m.mass;

		m.addForce (steering);
	}
}
