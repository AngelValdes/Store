// app Repository
const db = require('./db');

exports.findAll = (err, success) => {
  db.app.findAll({ include: [db.user, db.artAsset] })
  .then(success).catch(err); // { include: [db.User, db.ArtAsset] }
};

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
exports.findAllByUserId = (payload, err, success) => {
  db.app.findAll({
    where: {
      userId: payload,
    },
    include: [db.user, db.artAsset],
  }).then(success).catch(err);
};
exports.create = (payload, err, success) => {
  db.app.create(payload).then(success).catch(err);
};
exports.update = (payload, err, success) => {
  db.app.find({
    where: {
      id: payload.id,
    },
  }).then((data) => {
    data.updateAttributes(payload).then(success).catch(err);
  }).catch(err);
};
exports.destroy = (payload, err, success) => {
  db.app.destroy({
    where: {
      id: payload.id,
    },
  }).then(success).catch(err);
};
