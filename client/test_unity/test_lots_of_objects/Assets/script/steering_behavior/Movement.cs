using UnityEngine;
using System.Collections;

public class Movement : MonoBehaviour {

	public Vector3 velocity = Vector3.zero;
	public float mass = 1.0f;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		this.transform.position = this.transform.position + velocity * Time.deltaTime;
	}

	public void addForce(Vector3 f)
	{
		this.velocity += f;
	}

}
