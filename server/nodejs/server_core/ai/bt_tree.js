// var util = require("ai_util.js")
var blackboard = require("./blackboard.js").global_black_board
var Tick = require("./blackboard.js").Tick

var bt_node = require("./bt_node.js")
var util = require("util")
var action = require("./action.js")
var condition = require("./condition.js")

Behavior_Tree = function()
{
	// this.id = createUUID()

	this.load_behavior_tree = function(file_path,cb_func,tree,params)
	{
		
		xml2js = require('xml2js')
	    var parser = new xml2js.Parser()
	   
	    var fs = require("fs")
	    fs.readFile(file_path,'utf-8',function(err,data)
	    {
	        if(err)
	        {
	            console.log("read error "+data)
	            return
	        } 
	        parser.parseString(data,function(errors,response)
	        {
	            if(null !== errors )
	            {  
	                console.log(errors)  
	                return 
	            }
	            // console.log(util.inspect(response.Behavior.RootNode[0]))
	            var bt_root = response.Behavior.RootNode[0]
	            var BTNode = function()
	            {
	            	this.children = []
	            }
	            var dfs = function(node)
	            {
	            	var children = []
	            	for(var n in node)
	            	{
	            		if(n=="$")
	            		{
	            			continue
	            		}
	            		var created_child_node = dfs(node[n])
	            		if(Array.isArray(created_child_node))
	            		{
	            			children = children.concat(created_child_node)
	            		}
	            		else
	            		{
	            			children.push(created_child_node)	
	            		}
	            		
	            	}
	            	var create_node = function(node)
	            	{
	            		node_type = node["Type"]

	            		if(node_type=='Sequence')
	            		{
	            			return new bt_node.SeqNode()
	            		}
	            		else if(node_type=='Condition')
	            		{
	            			var module = node["Module"]
	            			var params = node["params"]
	            			if(module)
	            			{
	            				return new condition[module](params)
	            			}
	            			return new bt_node.ConditionNode()
	            		}
	            		else if(node_type=='Action')
	            		{
	            			var module = node["Module"]
	            			var params = node["params"]
	            			if(module)
	            			{
	            				return new action[module](params)
	            			}
	            			return new bt_node.ActionNode()
	            		}
	            		else if(node_type=='Selector')
	            		{
	            			return new bt_node.SelectNode()
	            		}
	            		else if(node_type=='ParallelNode')
	            		{
	            			return new bt_node.ParallelNode()
	            		}
	            		else if(node_type=="Root")
	            		{
	            			return new bt_node.LinkNode()
	            		}
	            		else if(node_type=='MemLoopSequence')
	            		{
	            			console.log("this is create..MemLoopSequence")
	            			return new bt_node.MemLoopSequence()
	            		}
	            		else if(node_type=='MemSequence')
	            		{
	            			return new bt_node.MemSequence()
	            		}
	            		else
	            		{
	            			return new bt_node.LinkNode()
	            		}
	            	}
	            	//create node
	            	if(node["$"]!=undefined)
	            	{
	            		var created_current_node = create_node(node["$"])
	            		if(created_current_node!=undefined)
	            		{
	            			created_current_node.children = children
		            		return created_current_node	
	            		}
		            	
	            	}
	            	else
	            	{
						//肯定是array导致的
						return children
	            	}
	            	
	            }
	           
	            this.behavior_tree = dfs(bt_root)
	            console.log("this is created_child_node.."+this.behavior_tree)
	            cb_func(tree,params,behavior_tree)
	        })  
	    })

	}

	this.run_bt = function(tree,ent)
	{
	
		// console.log(util.inspect(tree,true,20))

		if(tree)
		{
			var last_open_nodes = global_black_board.get_open_nodes_of_tree(this,ent)
			
			var tick = new Tick(this,ent)
			tree.execute(tick)

			var current_open_nodes = tick.get_open_nodes_of_tree()

			for(var last_open_node_id in last_open_nodes)
			{
				var node = current_open_nodes[last_open_node_id]
				if(!node)
				{
					last_open_nodes[last_open_node_id].close(tick)
				}
			}

		}
	}
}

// Behavior_Tree.prototype


exports.Behavior_Tree = Behavior_Tree

