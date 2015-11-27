var distance = function(p1,p2)
{
	var x = (p1[0]-p2[0])*(p1[0]-p2[0]) + (p1[1]-p2[1])*(p1[1]-p2[1]) + (p1[2]-p2[2])*(p1[2]-p2[2])
	return Math.sqrt(x)
}


var Vector3 = function(x,y,z)
{
	this.x = x
	this.y = y
	this.z = 0

	this.add = function(p)
	{
		this.x += p.x
		this.y += p.y
		this.z += p.z
		return this
	}

	this.sub = function(p)
	{
		this.x -= p.x
		this.y -= p.y
		this.z -= p.z
		return this
	}

	this.multi = function(m)
	{
		this.x *= m
		this.y *= m
		this.z *= m
		return this
	}

	this.div = function(p)
	{
		this.x /= p
		this.y /= p
		this.z /= p
		return this
	}

	this.length_multi_length = function()
	{
		return this.x*this.x+this.y*this.y+this.z*this.z
	}

	this.length = function()
	{
		return Math.sqrt(this.length_multi_length())
	}

	this.normalise = function()
	{
		length = this.length()
		this.div(length)
		return this
	}
}


exports.distance = distance
exports.Vector3 = Vector3