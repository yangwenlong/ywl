using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class ShowAnimation : MonoBehaviour {

	private float pi = 3.14159f;
	public float t;
	public bool wal_flag = true;

	public List<string> ends = new List<string>();
	private List<Transform> ends_transform = new List<Transform>();
	// Use this for initialization
	void Start () {
		t = Time.time;
		foreach(string end_name in ends)
		{
			//Debug.Log (" the name is "+end_name+"...."+GameObject.Find(end_name));
			ends_transform.Add(GameObject.Find(end_name).transform);
		}

	}
	
	// Update is called once per frame
	void Update () {
		if (Time.time - t > 1.0f) {
			this.Walk(1.0f);
			t = Time.time;
		}
		/*
		//获得鼠标位置
		Vector3 target = Camera.main.ScreenToWorldPoint(new Vector3(Input.mousePosition.x,Input.mousePosition.y,100));
		target.z = 0;
		//查找离position最近的end_transform
		GameObject end = GetNearestEndTransform(target);

		if ((target - end.transform.position).magnitude <= 0.01)
			return;
		//更改该end_transform及父节点
		GameObject joint = end.transform.parent.gameObject;
		GameObject current_joint_next_obj = end;
		while(joint!=null)
		{
			float direction = cal_direction(joint.transform.position,end.transform.position,target);
			Joint j = joint.GetComponent<Joint>();
			current_joint_next_obj.GetComponent<Joint>().direction += direction;
			current_joint_next_obj = joint;
			if(joint.transform.parent!=null)
				joint = joint.transform.parent.gameObject;
			else
				joint = null;
		}
		*/

	}


	public void Walk(float dur)
	{
		if (this.wal_flag) {
			SetJointDirection ("right_up_arm", -pi / 3,dur);
			SetJointDirection ("left_up_arm", -pi * 2 / 3,dur);
			SetJointDirection ("right_up_leg", -pi / 3,dur);
			SetJointDirection ("left_up_leg", -pi * 2 / 3,dur);

			SetJointDirection ("left_down_arm", -pi  / 4,dur);
		} else {
			SetJointDirection ("left_up_arm", -pi / 3,dur);
			SetJointDirection ("right_up_arm", -pi * 2 / 3,dur);
			SetJointDirection ("left_up_leg", -pi / 3,dur);
			SetJointDirection ("right_up_leg", -pi * 2 / 3,dur);

			SetJointDirection ("left_down_arm", -pi * 7 / 4,dur);
		}
		this.wal_flag = !this.wal_flag;
	}

	public void SetJointDirection(string joint_name,float direction,float dur)
	{
		GameObject joint = GameObject.Find(joint_name).transform.gameObject;
		joint.GetComponent<Joint> ().SetTargetDirection (direction, dur);
	}

	public void MoveTo(string name,Vector3 target)
	{
		target.z = 0;
		//查找离position最近的end_transform
		GameObject end = GameObject.Find(name).transform.gameObject;
		
		if ((target - end.transform.position).magnitude <= 0.01)
			return;
		//更改该end_transform及父节点
		GameObject joint = end.transform.parent.gameObject;
		GameObject current_joint_next_obj = end;
		while(joint!=null)
		{
			float direction = cal_direction(joint.transform.position,end.transform.position,target);
			Joint j = joint.GetComponent<Joint>();
			current_joint_next_obj.GetComponent<Joint>().direction += direction;
			current_joint_next_obj = joint;
			if(joint.transform.parent!=null)
				joint = joint.transform.parent.gameObject;
			else
				joint = null;
		}
	}

	GameObject GetNearestEndTransform(Vector3 target)
	{
		float dist = -1.0f;
		GameObject end = null;
		foreach(Transform t in ends_transform)
		{
			if(dist<0)
			{
				dist = (t.position - target).magnitude;
				end = t.gameObject;
				continue;
			}
			float current_dist = (t.position - target).magnitude;
			if(current_dist<dist)
			{
				dist = current_dist;
				end = t.gameObject;
			}
		}
		return end;
	}
	
	float cal_direction(Vector3 joint,Vector3 end,Vector3 target)
	{
		Vector3 right = (end - joint).normalized;
		//旋转90度
		right = new Vector3(-right.y,right.x,0);
		Vector3 force = (target - end);
		float direction = right.x*force.x+right.y*force.y;
		direction = direction * 0.01f;
		return direction;
	}
	
}
