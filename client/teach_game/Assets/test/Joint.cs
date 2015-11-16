using UnityEngine;
using System.Collections;

public class Joint : MonoBehaviour {
	
	public float direction;
	public float length;

	private bool is_set_target_direction = false;
	private float target_direction;
	private float duration;
	private float start_time;

	public void SetTargetDirection(float target,float duration)
	{
		this.target_direction = target;
		this.duration = duration;
		this.is_set_target_direction = true;
		this.start_time = Time.time;
		//Debug.Log ("the time is " + this.start_time);
	}
	
	// Use this for initialization
	void Start () {
		this.target_direction = direction;
		this.is_set_target_direction = false;
	}
	
	// Update is called once per frame
	void Update () {
		if (this.is_set_target_direction) {
			this.direction = Mathf.Lerp (direction, this.target_direction, (Time.time-this.start_time)/duration);
			//Debug.Log("the direction si "+direction+"..."+(Time.time-this.start_time)/duration);
			if(Mathf.Abs(this.direction-this.target_direction)<=0.001)
			{
				this.is_set_target_direction = false;
			}
		}
	}
}
