// app routes
const app = require('../../models/app');
const logger = require('../../services/logger');

module.exports = (express) => {
  const router = express.Router();
  // route: select all apps
  router.get('/apps', (req, res) => {
    app.findAll(
            (err) => { // if error, log and return error status and message
              logger.debug('All apps read error:' + err.message + '\n', 2);
              res.status(500).send(err.message);
            },
            (data) => { // if success log and return status and data
              logger.debug('All apps read:' + JSON.stringify(data) + '\n', 0);
              res.status(200).json(data);
            });
  });
  // route: select one app by id
  router.get('/apps/:id', (req, res) => {
    app.findById(req.params,
            (err) => {
              logger.debug('by id app read error:' + err.message + '\n', 2);
              res.status(500).send(err.message);
            },
            (data) => {
              logger.debug('by id app read:' + JSON.stringify(data) + '\n', 0);
              res.status(200).json(data);
            });
  });
  // route: select all apps for a user id
  router.get('/users/:id/apps', (req, res) => {
    app.findAllByUserId(req.params.id,
            (err) => {
              logger.debug('by userId apps read error:' + err.message + '\n', 2);
              res.status(500).send(err.message);
            },
            (data) => {
              logger.debug('by userId apps read:' + JSON.stringify(data) + '\n', 0);
              res.status(200).json(data);
            });
  });
  // route: insert new app
  router.post('/apps', (req, res) => {
    app.create(req.body,
            (err) => {
              logger.debug('Creating app error:' + err.message + '\n', 2);
              res.status(500).send(err.message);
            },
            (data) => {
              logger.debug('app created:' + JSON.stringify(data) + '\n', 0);
              res.status(201).json(data);
            });
  });
  // route: update existing app
  router.put('/apps/:id', (req, res) => {
    /* eslint no-param-reassign: 0 */
    req.body.id = req.params.id; // recommended by instructor
    app.update(req.body,
            (err) => {
              logger.debug('Updating app error:' + err.message + '\n', 2);
              res.status(500).send(err.message);
            },
            (data) => {
              logger.debug('app updated:' + JSON.stringify(data) + '\n', 0);
              res.status(200).json(data);
            });
  });
  // route: remove existing app
  router.delete('/apps/:id', (req, res) => {
    app.destroy(req.params,
            (err) => {
              logger.debug('Deleting app error:' + err.message + '\n', 2);
              res.status(500).send(err);
            },
            (data) => {
              if (data === 1) {
                logger.debug('id: ' + req.params.id + ' deleted!\n', 0);
                res.status(200).send('id: ' + req.params.id + ' deleted!');
              } else {
                logger.debug('id: ' + req.params.id + ' not found in database!\n', 0);
                res.status(202).send('id: ' + req.params.id + ' not found in database!');
              }
            });
  });
  return router;
};
