// var util = require("ai_util.js")
var blackboard = require("./blackboard.js")

var bt_node = require("./bt_node.js")
var util = require("util")
var action = require("./action.js")

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
	            			return new bt_node.ConditionNode(node["Operation"],node["params"])
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
	            			return new bt_node.BaseNode()
	            		}
	            		else
	            		{
	            			return new bt_node.BaseNode()
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
		// util = require("util")
		// console.log("the behavior_tree is "+this.behavior_tree+util.inspect(this))	
		if(tree)
		{
			console.log("this is .....behavior_tree")
			var tick = new blackboard.Tick(this,ent)
			tree.execute(tick)
		}
		// var _this = this

		// setTimeout(_this.run_bt(ent),1000)
	}
}

// Behavior_Tree.prototype


exports.Behavior_Tree = Behavior_Tree
