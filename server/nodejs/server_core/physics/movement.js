var Vector3 = require("../util/math.js").Vector3

var entity_physics = function(ent)
{
	this.velocity = new Vector3(0,0,0)
	this.mass = 1.0
	this.max_speed = 1.0
	this.acceleration = new Vector3(0,0,0)
	this.ent = ent

	this.tick = function(delta_time)
	{
		this.ent.position = [this.ent.position[0]+this.velocity.x*delta_time,this.ent.position[1]+this.velocity.y*delta_time,0]
		this.velocity = this.velocity.add(this.acceleration.multi(delta_time))
		var velocity_length = this.velocity.length()
		if(velocity_length>this.max_speed)
		{
			this.velocity.multi(this.max_speed/velocity_length)
		}
	}

	this.add_force = function(f)
	{
		this.acceleration.add(f.div(this.mass))
	}

	this.seek = function(target)
	{
		target = new Vector3(target[0],target[1],target[2])
		position = new Vector3(this.ent.position[0],this.ent.position[1],this.ent.position[2])
		desired_velocity = target.sub(position).normalise().multi(this.max_speed)
		steering = desired_velocity.sub(this.velocity)
		this.add_force(steering)
	}
}


exports.entity_physics = entity_physics