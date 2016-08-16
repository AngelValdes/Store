// app routes
const app = require('../../models/app');

module.exports = (express) => {
    const router = express.Router();
    // route: select all apps
    router.get('/apps', (req, res) => {
        app.findAll(
                (err) => { // if error, log and return error status and message
                    console.log('All apps read error:' + err.message + '\n');
                    res.status(500).send(err.message);
                },
                (data) => { // if success log and return status and data
                    console.log('All apps read:' + JSON.stringify(data) + '\n');
                    res.status(200).json(data);
                });
    });
    // route: select one app by id
    router.get('/apps/:id', (req, res) => {
        app.findById(req.params,
                (err) => {
                    console.log('by id app read error:' + err.message + '\n');
                    res.status(500).send(err.message);
                },
                (data) => {
                    console.log('by id app read:' + JSON.stringify(data) + '\n');
                    res.status(200).json(data);
                });
    });
    // route: select all apps for a user id
    router.get('/users/:id/apps', (req, res) => {
        app.findAllByUserId(req.params.id,
                (err) => {
                    console.log('by userId apps read error:' + err.message + '\n');
                    res.status(500).send(err.message);
                },
                (data) => {
                    console.log('by userId apps read:' + JSON.stringify(data) + '\n');
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
                    console.log('Updating app error:' + err.message + '\n');
                    res.status(500).send(err.message);
                },
                (data) => {
                    console.log('app updated:' + JSON.stringify(data) + '\n');
                    res.status(200).json(data);
                });
    });
    // route: remove existing app
    router.delete('/apps/:id', (req, res) => {
        app.destroy(req.params,
                (err) => {
                    console.log('Deleting app error:' + err.message + '\n');
                    res.status(500).send(err);
                },
                (data) => {
                    if (data === 1) {
                        console.log('{ response: ' + data + ', message:  id ' + req.params.id + ' deleted! }\n');
                        res.status(200).send({ response: data, message: 'id ' + req.params.id + ' deleted!' });
                    } else {
                        console.log('{ response: ' + data + ', message:  id ' + req.params.id + ' not found in database }\n', 0);
                        res.status(202).send({ response: data, message: 'id ' + req.params.id + ' not found in database!' });
                    }
                });
    });
    return router;
};
