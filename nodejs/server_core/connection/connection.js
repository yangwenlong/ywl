var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;

client_list = {}

exports.start_server = function(server,cb_func)
{
    // 创建一个TCP服务器实例，调用listen函数开始监听指定端口
    // 传入net.createServer()的回调函数将作为”connection“事件的处理函数
    // 在每一个“connection”事件中，该回调函数接收到的socket对象是唯一的
    conn = net.createServer();
    conn.on('connection', function(client) {  
      client.name = client.remoteAddress + ':' + client.remotePort;    
      client_list[client.name] = client
      server.connect(client)
      
      client.on('data',function(data){
        data = JSON.parse(data)
        console.log("the data is "+data['id']+'..'+data['function']+'...'+data['params'])
        entid = data['id']
        var ent = require('../entity.js')
        ent.rpc_from_client(entid,data['function'],data['params'])

      })

    });  

    conn.listen(PORT, HOST)
    cb_func()
}

exports.broadcast = function(data)
{
     for(var key in client_list)
     {
         client = client_list[key]
         client.write(data)
     }
}

exports.send_data = function(id,data)
{
    client = client_list[id]
    client.write(data)
}

exports.get_all_connections = function()
{
    return client_list
}