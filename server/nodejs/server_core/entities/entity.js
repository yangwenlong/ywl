var util = require('util')
var conn = require('../connection/connection.js')
var String = require('string')


function Entity(id)
{
    this.id = id
    this._position = [0.0,0.0,0.0]
}
Entity.prototype = {
    getId : function(){
        return this.id
    },
    enterWorld:function(){

    },
    leaveWorld:function(){

    },
    get position(){
        return this._position
    },
    set position(pos){
        this._position = pos
        rpc_proxy(this,"set_position",pos)
    },
    serialize:function(func,params){
        var rpc_string = '{'
        rpc_string += 'id : '+ entity.getId()+","
        rpc_string += 'type : '+ entity._type+","
        rpc_string += 'function_name : '+ func+","
        rpc_string += 'params : '+ JSON.stringify(params)+","
        rpc_string += '}'
        return rpc_string
    },
    
}


exports.Entity = Entity

var Avatar = require('./Avatar.js')
var Monster = require('./Monster.js')


var sequence_id = 10000000
var entities = {}

exports.create_entity = function(xml_path,cb_func)
{

    xml2js = require('xml2js')
    var parser = new xml2js.Parser()
    // var split_paths = xml_path.split()

    var separators = ['.','/']
    var split_paths = xml_path.split(new RegExp('[' + separators.join('') + ']', 'g'))
    
    var class_name = split_paths[split_paths.length-2]
    // console.log("the split_paths is "+split_paths+"..."+class_name)
    var fs = require("fs")
    fs.readFile(xml_path,'utf-8',function(err,data)
    {
        if(err){
            console.log("read error "+data)
            return
        } 
        parser.parseString(data,function(errors,response)
        {
            if(null !== errors ){  
                console.log(errors)  
                return;  
            }  
            //创建entity
            // entity = new Avatar(sequence_id)
            //console.log("the class_name is "+class_name)
            entity = eval("new "+class_name+"."+class_name+"(sequence_id)")
            sequence_id += 1
            root = response.root
            properties = root.Properties
            var makeProperty = function(entity,property_name,property)
            {
                entity["_"+property_name] = ''
                Object.defineProperty(entity,property_name,{
                    get : function(){
                        return entity[("_"+property_name)]
                    },
                    set : function(val){
                        entity[("_"+property_name)] = val
                        // console.dir(property)
                        // console.log("this is set......"+property_name+String(property[0]['Flags']).trim())
                        if(String(property[0]["Flags"]).trim()=='ALL_CLIENTS')
                        {
                            // console.log("this is ALL_CLIENTS....")
                            rpc_proxy(this,"set_"+property_name,val)
                        }
                        else if(String(property[0]["Flags"]).trim() == 'CELL_PUBLIC')
                        {
                            // console.log("this is CELL_PUBLIC....")
                        }
                    },
                })
            }
            //遍历所有的属性
            for(var property in properties)
            {
                property = properties[property]
                //拿到对应的属性节点
                for(var property_name in property)
                {
                    makeProperty(entity,property_name,property[property_name])
                }
               
            }
            entities[entity.getId()] = entity
            entity.enterWorld()
            if(cb_func)
            {
                cb_func(entity)
            }
        })
    })
}

//function proxy
function rpc_proxy (entity,function_name,params) {
   var rpc_string = '{'
   rpc_string += '"id" : '+ entity.getId()+','
   rpc_string += '"type" : "__set__function"'+ ','
   rpc_string += '"_type" : "'+ entity._type+'",'
   rpc_string += '"function_name" : "'+ function_name+'",'
   rpc_string += '"params" : '+ JSON.stringify(params)+''
   rpc_string += '}'
   console.log("the rpc_proxy...."+rpc_string)
   conn.broadcast(rpc_string.length+rpc_string)
}

//create entity proxy
exports.rpc_create_proxy = function(entity) {
   var rpc_string = '{'
   rpc_string += '"id" : '+ entity.getId()+','
   rpc_string += '"_type" : "'+ entity._type+'",'
   rpc_string += '"type" : "__create_entity"'+ ''
   rpc_string += '}'
   // console.log("the rpc_create_proxy...."+rpc_string)
   conn.broadcast(rpc_string.length+rpc_string)
}



exports.rpc_from_client = function(entid,function_name,params)
{
    ent = entities[entid]
    if(typeof ent[function_name] == 'function'){
        ent[function_name](params)
    }
    else
    {
        ent[function_name] = params
    }
}

exports.getAllEntities = function()
{
    return entities
}
// var e = require('./entity.js')
// x = function(ent)
// {
//     console.dir(ent)
// }
// e.create_entity('./defs/Avatar.xml',x)
// e.create_entity('./defs/Avatar.xml')

