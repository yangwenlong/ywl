using UnityEngine;
using System.Collections;
using EntityFactory;

public class Proxy {
	
	private Entity entity;

	public void Proxy(Entity ent)
	{
		this.entity = ent;
	}

	public void cellMethod(String func_name,params object[] parameters)
	{
		String json = "{";
		json += "\"id\":"+this.entity.id+",";
		json += "\"type\":\""+this.entity.type+"\",";
		json += "\"function_name\":\""+func_name+"\",";
		json += "\"parameters\":[";
		forEach(var p in parameters)
		{
			json += p.ToString()+",";
		}
		json = json[0:-1];
		json += "],";
		json += "}";
	}
}
