
function inspect(o) {
  var out = ''
  for (var p in o) {
  	if(o.hasOwnProperty(p))
  	{
		out += p + ': ' + o[p] + '\n'
  	}
  }
  return out
}

exports.inspect = inspect