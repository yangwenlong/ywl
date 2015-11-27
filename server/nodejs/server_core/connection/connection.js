var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;

client_list = {}

get_length_of_header = function(data)
{
  num = ""
  i = 0
  while(i<data.length)
  {
    c = data[i]
    if(c!='{')
    {
      num += c
      i+=1
    }
    else
      break
  }
  num = parseInt(num)
  current_data = data.substring(i,num+i)
  data = data.substring(num+i)
  return [num,current_data,data]
}

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
        data = data.toString()
        while(data)
        {
          var parsed_result = get_length_of_header(data)
          var num,current_data,next_data
          num = parsed_result[0]
          current_data = parsed_result[1]
          next_data = parsed_result[2]
          data = next_data

          // console.log("the current_data is "+current_data)
          current_data = JSON.parse(current_data)
          entid = current_data['id']
          var ent = require('../entities/entity.js')
          ent.rpc_from_client(entid,current_data['function'],current_data['params'])

        }

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

exports.tellOthers = function(client,data)
{
    var own_client_name = client.name
    for(var key in client_list)
    {
        current_client = client_list[key]
        if(current_client.name!=own_client_name)
          current_client.write(data)
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