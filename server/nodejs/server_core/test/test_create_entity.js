var entity_js = require('../entities/entity.js')
function create_entity_cb(ent)
{
	entity_js.rpc_create_proxy(ent)
	ent.username = 'yangwxxenlong'
	ent.position = [Math.random()*100,Math.random()*100,0.0]
	console.log("the position is "+ent.position)

	this.handle = function()
	{
		if(ent.tick)
		{
			ent.tick(100)
		}
	}

	setInterval(this.handle,100)
}

// entity_js.create_entity('../defs/Avatar.xml',create_entity_cb)
entity_js.create_entity('../defs/Monster.xml',create_entity_cb)