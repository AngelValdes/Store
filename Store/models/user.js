// User Repository
const db = require('./db');
// getAll including relations
exports.findAll = (err, success) => {
    db.user.findAll({ include: [db.app] }).then(success).catch(err);
};
// getById including relations
exports.findById = (payload, err, success) => {
    db.user.find({
        where: {
            id: payload.id,
        },
        include: [ // include relations, even deeper multilevel
                { all: true, nested: true },
        ],
    }).then(success).catch(err);
};
// insert new
exports.create = (payload, err, success) => {
    db.user.create(payload).then(success).catch(err);
};
// modify existing
exports.update = (payload, err, success) => { // investigate Object.assign(entityObject, req.body)
    db.user.find({
        where: {
            id: payload.id,
        },
    }).then((data) => {
        data.updateAttributes(payload).then(success).catch(err);
    }).catch(err);
};
// delete existing
exports.destroy = (payload, err, success) => {
    db.user.destroy({
        where: {
            id: payload.id,
        },
    }).then(success).catch(err);
};
