var connection = require('./connection.js')
var entity_js = require('../entities/entity.js')
update_time = 100



function server()
{
	this.entity_client_dict = {}
	// var client_entity_dict = {}
	function start_cb()
	{
		setInterval(loop,update_time)
	}
	this.connect = function(client)
	{
		function create_entity_cb(ent)
		{
			this.entity_client_dict[ent] = client
			entity_js.rpc_create_proxy(ent)
			ent.username = 'yangwxxenlong'
			ent.position = [Math.random()*100,Math.random()*100,0.0]
			console.log("the position is "+ent.position)

		}
		entity_js.create_entity('../defs/Avatar.xml',create_entity_cb)
		entity_js.create_entity('../defs/Monster.xml',create_entity_cb)
		// entity_js.create_entity('../defs/Avatar.xml',create_entity_cb)
	}
	this.modify_property = function(ent)
	{
		var ent_string = JSON.stringify(ent)
		this.entity_client_dict[ent].send_data(client.name,ent_string.length+""+ent_string)
	}
	connection.start_server(this,start_cb)
	
}


function loop()
{
	//同步entity身上的必要属性，比如position之类的
	
	// for(var entid in entity_js.getAllEntities())
	// {

	// 	ent = entity_js.getAllEntities()[entid]
	// 	// console.log("the position is "+ent.position)
	// 	ent.position = [ent.position[0]+1.0,ent.position[1]+0.0,ent.position[2]+0.0]
	// }
}

server()

