var fs = require("fs")
var inspect = require("util").inspect

var create_table = function(dir,path,cb_func)
{
	var return_data = {}
	var stream = fs.createReadStream(dir+"/"+path,{encoding: 'utf8'})
	var csv = require("fast-csv")

	csv.fromStream(stream, {headers : true,trim:true}).on("data", function(data){
	     return_data[data['ID']] = data
	})
	.on("end",function(data){
		cb_func(path,return_data)
	})

}

// create_table('../tables/data_ai_text_table.csv')

exports.create_table = create_table
