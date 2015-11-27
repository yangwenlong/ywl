var entity_js = require("./entity.js")

function Avatar(id)
{
    entity_js.Entity.call(this,id)
    this._type = 'Avatar'
    
}

Avatar.prototype = new entity_js.Entity()
Avatar.prototype.constructor = Avatar

Object.defineProperty(Avatar.prototype, "position", {
    set: function position(pos) {
        this._position = pos
        entity_js.rpc_others_proxy(this,"set_position",pos)
    },
    get: function position(){
        return this._position
    },
});



exports.Avatar = Avatar