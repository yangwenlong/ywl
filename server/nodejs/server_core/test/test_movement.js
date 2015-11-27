var entity_js = require('../entities/entity.js')
function create_entity_cb(ent)
{
	entity_js.rpc_create_proxy(ent)
	ent.username = 'yangwxxenlong'
	ent.position = [10,10,0.0]
	var run_bt = function(ent)
	{
		function handle()
		{

			// console.log("this is run_bt"+util.inspect(ent,true,20))
			console.log("the Monster position is "+ent.position)
			ent.seek([100,20,0])
			ent.movement.tick(0.5)
		}
		
		setInterval(handle,500)
	}
	run_bt(ent)
	console.log("the position is "+ent.position)

}

entity_js.create_entity('../defs/Monster.xml',create_entity_cb)