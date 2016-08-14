//user routes
const user = require('../../models/user');
const logger = require("../../Services/logger.js");

module.exports = (express) => {
    const router = express.Router();
    router.get('/users', (req, res) => {
        user.findAll(
            (err) => {
                logger.debug('All users read error:' + err.message + '\n', 2);
                res.status(500).send(err.message);
            },
            (data) => {
                logger.debug('All users read:' + JSON.stringify(data) + '\n', 0);
                res.status(200).json(data);
            });
    });
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
    router.put('/users/:id', (req, res) => {
        req.body.id = req.params.id;
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
    router.delete('/users/:id', (req, res) => {
        user.destroy(req.params,
            (err) => {
                logger.debug('Deleting user error:' + err.message + '\n', 2);
                res.status(500).send(err);
            },
            (data) => {
                if (data === 1) {
                    logger.debug("id: " + req.params.id + " deleted!" + '\n', 0);
                    res.status(200).send("id: " + req.params.id + " deleted!");
                } else {
                    logger.debug("id: " + req.params.id + " not found in database!" + '\n', 0);
                    res.status(202).send("id: " + req.params.id + " not found in database!");
                }
  
            });
    });
    return router;
}
