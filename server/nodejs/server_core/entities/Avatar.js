var entity_js = require("./entity.js")

function Avatar(id)
{
    entity_js.Entity.call(this,id)
    this._type = 'Avatar'

    
}

Avatar.prototype = new entity_js.Entity()
Avatar.prototype.constructor = Avatar

exports.Avatar = Avatar