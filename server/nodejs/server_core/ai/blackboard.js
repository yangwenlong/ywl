var Blackboard = function() {
    this.initialize();
}
Blackboard.prototype.initialize = function() {
	this._treeid_nodeid_entityid_prop_value = {}
	this._treeid_nodeid_entityid_open = {}
	this._treeid_entid_open = {}
}


//get the node value of a particular entity
Blackboard.prototype.get_node_value = function(tree,node,ent,property_name,default_value)
{
	var value = this._treeid_nodeid_entityid_prop_value[tree.id+"--"+node.id+"--"+ent.id+"--"+property_name]
	if(value)
		return value
	else
		return default_value
}

Blackboard.prototype.get_open_nodes = function(tree,ent,node)
{
	return this._treeid_nodeid_entityid_open[tree.id+"--"+ent.id+"--"+node.id]
}

Blackboard.prototype.set_open_nodes = function(tree,ent,node,is_open)
{
	if(is_open)
	{
		this._treeid_nodeid_entityid_open[tree.id+"--"+ent.id+"--"+node.id] = is_open
	}
	else
	{
		delete this._treeid_nodeid_entityid_open[tree.id+"--"+ent.id+"--"+node.id]
	}
}

Blackboard.prototype.set_open_nodes_of_tree = function(tree,ent,node_ids)
{
	this._treeid_entid_open[tree.id+"--"+ent.id] = node_ids
}

Blackboard.prototype.get_open_nodes_of_tree = function(tree,ent)
{
	return this._treeid_entid_open[tree.id+"--"+ent.id]
}

//set the node value of a particular entity
Blackboard.prototype.set_node_value = function(tree,node,ent,property_name,value)
{
	this._treeid_nodeid_entityid_prop_value[tree.id+"--"+node.id+"--"+ent.id+"--"+property_name] = value
}

var Tick = function(tree,ent){
	this.initialize(tree,ent)
}
Tick.prototype.initialize = function(tree,ent){
	this.tree = tree
	this.ent = ent
	this.open_node_ids = {}
}

Tick.prototype.set_open_nodes_of_tree = function(node)
{
	this.open_node_ids[node.id] = node
}

Tick.prototype.get_open_nodes_of_tree = function()
{
	return this.open_node_ids
}

global.global_black_board = new Blackboard()

exports.Tick = Tick
// exports.Blackboard = Blackboard
exports.global_black_board = global_black_board