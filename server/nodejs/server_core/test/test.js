util = require('util')
function socketClient(){
	var net = require('net')  
  
	var HOST = '127.0.0.1' 
	var PORT = 6969
	var client = new net.Socket()  
	var count = 0
	client.connect(PORT, HOST, function() {  
  		console.log("this is connect")
		
	})
	client.on('data',function(data)
	{
		console.log("the data is "+data)
		count += 1
		if(count<=1)
			client.write('{"id":10000000,"function":"username","params":"xxxxxxxx"}')
	})
}

s = socketClient()
