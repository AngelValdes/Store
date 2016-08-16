// app Repository
const db = require('./db');
// getAll including relations
exports.findAll = (err, success) => {
    db.app.findAll({ include: [db.user, db.artAsset] })
    .then(success).catch(err);
};
// getById including relations
exports.findById = (payload, err, success) => {
    db.app.find({
        where: {
            id: payload.id,
        },
        include: [ // include relations, even deeper multilevel
                { all: true, nested: true },
        ],
    }).then(success).catch(err);
};
// getAll for specific userId including relations
exports.findAllByUserId = (payload, err, success) => {
    db.app.findAll({
        where: {
            userId: payload,
        },
        include: [db.user, db.artAsset],
    }).then(success).catch(err);
};
// insert new
exports.create = (payload, err, success) => {
    db.app.create(payload).then(success).catch(err);
};
// modify existing
exports.update = (payload, err, success) => {
    db.app.find({
        where: {
            id: payload.id,
        },
    }).then((data) => {
        data.updateAttributes(payload).then(success).catch(err);
    }).catch(err);
};
// delete existing
exports.destroy = (payload, err, success) => {
    db.app.destroy({
        where: {
            id: payload.id,
        },
    }).then(success).catch(err);
};
