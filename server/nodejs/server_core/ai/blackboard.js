var Blackboard = function() {
    this.initialize();
}
Blackboard.prototype.initialize = function() {
	this._treeid_nodeid_entityid_state = {}
	this._treeid_nodeid_entityid_prop_value = {}
}

//set the node state of a particular entity
Blackboard.prototype.set_entity_state = function(tree,node,ent,state){
	this._treeid_nodeid_entityid_state[tree.id + "--" +node.id + "--" + ent.id] = state
}

//get the node state of a particular entity
Blackboard.prototype.get_entity_state = function(tree,node,ent){
	return this._treeid_nodeid_entityid_state[tree.id + "--" +node.id + "--" + ent.id]
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
}

exports.Tick = Tick
exports.Blackboard = Blackboard