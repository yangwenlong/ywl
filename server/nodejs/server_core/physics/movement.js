var Vector3 = require("../util/math.js").Vector3

var entity_physics = function(ent)
{
	this.velocity = new Vector3(0,0,0)
	this.mass = 1.0
	this.max_speed = 1.0
	this.acceleration = new Vector3(0,0,0)
	this.ent = ent
	this.wander_radius = 10.0
	this.wander_target = new Vector3(ent.position[0],ent.position[1],ent.position[2])
	this.wander_center = new Vector3(ent.position[0],ent.position[1],ent.position[2])

	this.tick = function(delta_time)
	{
		console.log("the velocity is "+this.velocity.x+"xxx"+delta_time+"yy"+this.ent.position[0]+(this.velocity.x*delta_time+this.ent.position[0]))
		this.ent.position = [this.ent.position[0]+this.velocity.x*delta_time,this.ent.position[1]+this.velocity.y*delta_time,0]
		console.log("tick innnnxxxxx....."+this.velocity.x+this.velocity.add(this.acceleration.multi(delta_time)))
		this.velocity.add(this.acceleration.multi(delta_time))
		console.log("tick innnnxxxxx....."+this.velocity.x+this.acceleration.multi(delta_time))
		var velocity_length = this.velocity.length()
		console.log("tick innnn....."+this.velocity.x)
		if(velocity_length>this.max_speed)
		{
			this.velocity.multi(this.max_speed/velocity_length)
		}
		console.log("tick outn....."+this.velocity.x)
	}

	this.add_force = function(f)
	{
		this.acceleration.add(f.div(this.mass))
	}

	this.seek = function(target)
	{
		target = new Vector3(target[0],target[1],target[2])
		position = new Vector3(this.ent.position[0],this.ent.position[1],this.ent.position[2])
		desired_velocity = target.n_sub(position).normalise().multi(this.max_speed)
		steering = desired_velocity.n_sub(this.velocity)
		this.add_force(steering)
	}

	this.wander = function()
	{
		// console.log("the ent is ...."+this.ent)
		var current_pos = new Vector3(this.ent.position[0],this.ent.position[1],this.ent.position[2])
		// console.log("this is current_pos....."+current_pos.x+"--"+current_pos.y+"--"+current_pos.z)
		if(current_pos.n_sub(this.wander_target).length_multi_length()<=0.1)
		{
			this.wander_target = new Vector3(this.wander_center.x+Math.random()*this.wander_radius,this.wander_center.y+Math.random()*this.wander_radius,0)
		}
		// console.log("this is wander....."+current_pos.x+"--"+current_pos.y+"--"+current_pos.z)
		// console.log("this is ..........."+this.wander_target.x+"--"+this.wander_target.y+"--"+this.wander_target.z)
		this.seek(this.wander_target)
	}
}


exports.entity_physics = entity_physics