//User Repository
const db = require('./db');

exports.findAll = (err, success) => {
    db.user.findAll({include: [ db.app ]}).then(success).catch(err);
};

exports.find = (payload, err, success) => {
    db.user.find({
        where: {
            id:payload.id,
        },
        include: [ //include relations, even deeper multilevel
            {all: true, nested:true}
        ]
    }).then(success).catch(err);
};
exports.create = (payload, err, success) => {
    db.user.create(payload).then(success).catch(err);
};
exports.update = (payload, err, success) => {
    db.user.find({
        where: {
            id: payload.id,
        },  
    }).then((data) => {
        data.updateAttributes(payload).then(success).catch(err);
    }).catch(err);
};
exports.destroy = (payload, err, success) => {
    db.user.destroy({
        where: {
            id: payload.id,
        }        
    }).then(success).catch(err);
};