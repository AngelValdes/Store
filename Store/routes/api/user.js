// user routes
const user = require('../../models/user');
const logger = require('../../services/logger');

module.exports = (express) => {
  const router = express.Router();
  // route: select all users
  router.get('/users', (req, res) => {
    user.findAll(
            (err) => { // if error, log and return error status and message
              logger.debug('All users read error:' + err.message + '\n', 2);
              res.status(500).send(err.message);
            },
            (data) => { // if success log and return status and data
              logger.debug('All users read:' + JSON.stringify(data) + '\n', 0);
              res.status(200).json(data);
            });
  });
  // route: select one user by id
  router.get('/users/:id', (req, res) => {
    user.findById(req.params,
            (err) => {
              logger.debug('by id user read error:' + err.message + '\n', 2);
              res.status(500).send(err.message);
            },
            (data) => {
              logger.debug('by id user read:' + JSON.stringify(data) + '\n', 0);
              res.status(200).json(data);
            });
  });
  // route: insert new user
  router.post('/users', (req, res) => {
    user.create(req.body,
            (err) => {
              logger.debug('Creating user error:' + err.message + '\n', 2);
              res.status(500).send(err.message);
            },
            (data) => {
              logger.debug('user created:' + JSON.stringify(data) + '\n', 0);
              res.status(201).json(data);
            });
  });
  // route: update existing user
  router.put('/users/:id', (req, res) => {
    /* eslint no-param-reassign: 0 */
    req.body.id = req.params.id; // recommended by instructor
    user.update(req.body,
            (err) => {
              logger.debug('Updating user error:' + err.message + '\n', 2);
              res.status(500).send(err.message);
            },
            (data) => {
              logger.debug('user updated:' + JSON.stringify(data) + '\n', 0);
              res.status(200).json(data);
            });
  });
  // route: remove existing user
  router.delete('/users/:id', (req, res) => {
    user.destroy(req.params,
            (err) => {
              logger.debug('Deleting user error:' + err.message + '\n', 2);
              res.status(500).send(err);
            },
            (data) => {
                if (data === 1) {
                    logger.debug('{ response: ' + data + ', message:  id ' + req.params.id + ' deleted! }\n', 0);
                res.status(200).send({ response: data, message: 'id ' + req.params.id + ' deleted!' });
                } else {
                    logger.debug('{ response: ' + data + ', message:  id ' + req.params.id + ' not found in database }\n', 0);
                res.status(202).send({ response: data, message: 'id ' + req.params.id + ' not found in database!' });
                }
            });
  });
  return router;
};
