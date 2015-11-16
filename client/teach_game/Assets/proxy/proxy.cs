using UnityEngine;
using System.Collections;
using EntityNS;

public class Proxy {
	
	private Entity entity;

	public Proxy(Entity ent)
	{
		this.entity = ent;
	}

	public void cellMethod(string func_name,params object[] parameters)
	{
		string json = "{";
		json += "\"id\":"+this.entity.id+",";
		json += "\"type\":\""+this.entity.GetType().Name+"\",";
		json += "\"function\":\"" + func_name+"\",";
		json += "\"params\":[";
		foreach(var p in parameters)
		{
			json += p.ToString()+",";
		}
		json = json.Substring(0,json.Length-1);
		json += "]";
		json += "}";

        Debug.Log("the json is "+json);
        AsynchronousClient.Send(json.Length+""+json);
    }
}
