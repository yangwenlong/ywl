var distance = function(p1,p2)
{
	var x = (p1[0]-p2[0])*(p1[0]-p2[0]) + (p1[1]-p2[1])*(p1[1]-p2[1]) + (p1[2]-p2[2])*(p1[2]-p2[2])
	return Math.sqrt(x)
}

exports.distance = distance