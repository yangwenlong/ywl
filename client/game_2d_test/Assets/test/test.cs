using UnityEngine;
using System.Collections;

public class test : MonoBehaviour {
	
	public Vector3 p1 = new Vector3(0,0,0);
	public Vector3 p2;
	public Vector3 p3;
	public Vector3 p4;

	private int length = 2;
	
	private float a1 = 0.0f;
	private float a2 = 0.0f;
	private float a3 = 0.0f;
	
	// Use this for initialization
	void Start () {
		p2 = get_position_by_joint(p1,a1);
		p3 = get_position_by_joint(p2,a2);
		p4 = get_position_by_joint(p3,a3);
	}
	
	// Update is called once per frame
	void Update () {
		Vector3 target = Camera.main.ScreenToWorldPoint(new Vector3(Input.mousePosition.x,Input.mousePosition.y,100));
		target.z = 0;

		if ((target - p4).magnitude <= 0.01)
			return;

		float d3 = cal_direction (p3, p4, target);
		a3 = d3 + a3;
		p4 = get_position_by_joint (p3, a3);

		float d2 = cal_direction(p2,p4,target);
		a2 = d2 + a2;
		p3 = get_position_by_joint(p2,a2);
		p4 = get_position_by_joint (p3, a3);

		float d1 = cal_direction(p1,p4,target);
		a1 = d1 + a1;
		p2 = get_position_by_joint(p1,a1);
		p3 = get_position_by_joint (p2, a2);
		p4 = get_position_by_joint (p3, a3);

		LineRenderer line = GetComponent<LineRenderer> ();
		line.SetPosition (0, p1);
		line.SetPosition (1, p2);
		line.SetPosition (2, p3);
		line.SetPosition (3, p4);

		//Debug.Log ("the target is " + target+".... and p3 is "+p3+"...."+a2+"...."+d2 +".........direction........"+direction+"....a1......."+a1+"...p2......"+p2);
	}
	
	float cal_direction(Vector3 joint,Vector3 end,Vector3 target)
	{
		Vector3 right = (end - joint).normalized;
		//旋转90度
		right = new Vector3(-right.y,right.x,0);
		Vector3 force = (target - end);
		float direction = right.x*force.x+right.y*force.y;
		direction = direction * 0.1f;
		return direction;
	}
	
	Vector3 get_position_by_joint(Vector3 joint,float direction)
	{
		Vector3 p;
		Vector3 d = new Vector3(Mathf.Cos(direction)*length,Mathf.Sin(direction)*length,0.0f);
		p = joint + d;
		return p;
	}
	
}
