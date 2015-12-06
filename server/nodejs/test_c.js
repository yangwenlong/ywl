var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;
var sockets = []

var create_socket = function()
{
	var client = new net.Socket();
	client.connect(PORT, HOST, function() {

	    // console.log('CONNECTED TO: ' + HOST + ':' + PORT);
	    sockets.push(client)
	});

	
	// 为客户端添加“close”事件处理函数
	client.on('close', function() {
	   
	});

	client.on('error', function(e) {
	    if(e.code == 'ECONNREFUSED') {
	        console.log('Is the server running at ' + PORT + '?');

	        client.setTimeout(4000, function() {
	            client.connect(PORT, HOST, function(){
	                console.log('CONNECTED TO: ' + HOST + ':' + PORT);
	                // client.write('I am the inner superman');
	            });
	        });

	        console.log('Timeout for 5 seconds before trying port:' + PORT + ' again');

    	}   
	});
}

var test = function()
{
	for(var i=0;i<10000;i++)
	{
		create_socket()
	}
}

test()