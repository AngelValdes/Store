// user routes
const user = require('../../models/user');

module.exports = (express) => {
    const router = express.Router();
    // route: select all users
    router.get('/users', (req, res) => {
        user.findAll(
                (err) => { // if error, log and return error status and message
                    console.log('All users read error:' + err.message + '\n');
                    res.status(500).send(err.message);
                },
                (data) => { // if success log and return status and data
                    console.log('All users read:' + JSON.stringify(data) + '\n');
                    res.status(200).json(data);
                });
    });
    // route: select one user by id
    router.get('/users/:id', (req, res) => {
        user.findById(req.params,
                (err) => {
                    console.log('by id user read error:' + err.message + '\n');
                    res.status(500).send(err.message);
                },
                (data) => {
                    console.log('by id user read:' + JSON.stringify(data) + '\n');
                    res.status(200).json(data);
                });
    });
    // route: insert new user
    router.post('/users', (req, res) => {
        user.create(req.body,
                (err) => {
                    console.log('Creating user error:' + err.message + '\n');
                    res.status(500).send(err.message);
                },
                (data) => {
                    console.log('user created:' + JSON.stringify(data) + '\n');
                    res.status(201).json(data);
                });
    });
    // route: update existing user
    router.put('/users/:id', (req, res) => {
        /* eslint no-param-reassign: 0 */
        req.body.id = req.params.id; // recommended by instructor
        user.update(req.body,
                (err) => {
                    console.log('Updating user error:' + err.message + '\n');
                    res.status(500).send(err.message);
                },
                (data) => {
                    console.log('user updated:' + JSON.stringify(data) + '\n');
                    res.status(200).json(data);
                });
    });
    // route: remove existing user
    router.delete('/users/:id', (req, res) => {
        user.destroy(req.params,
                (err) => {
                    console.log('Deleting user error:' + err.message + '\n');
                    res.status(500).send(err);
                },
                (data) => {
                    if (data === 1) {
                        console.log('{ response: ' + data + ', message:  id ' + req.params.id + ' deleted! }\n');
                        res.status(200).send({ response: data, message: 'id ' + req.params.id + ' deleted!' });
                    } else {
                        console.log('{ response: ' + data + ', message:  id ' + req.params.id + ' not found in database }\n');
                        res.status(202).send({ response: data, message: 'id ' + req.params.id + ' not found in database!' });
                    }
                });
    });
    return router;
};
