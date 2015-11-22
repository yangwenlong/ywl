var read_csv = require("./read_csv.js")
var fs = require("fs")
var inspect = require("util").inspect

var read_cdata_folder = function(dir)
{
	var add_to_table = function(path,data)
	{
		var str = path.split("_")
		str.splice(0,1)
		str.splice(str.length-1,1)
		console.log("the str is "+str)
		var function_name = "get"
		for(var s in str)
		{
			s = str[s]
			function_name += s[0].toUpperCase()+s.substring(1)
		}
		console.log(function_name)
		exports[function_name] = function(id)
		{
			return data[id]
		}
	}
	fs.readdir(dir,function (err, files) {
	  	if (err) {
	   		console.log(err);
	    	return;
	 	}

	  	var count = files.length;
	 	var results = {};
	 	files.forEach(function (filename) 
	 	{
		    read_csv.create_table(dir,filename,add_to_table)
		})
 	})
}

read_cdata_folder('../cdata')