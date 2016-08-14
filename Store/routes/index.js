module.exports = (express) => { 
    const router = express.Router();
    //routes
    router.get('/', (req, res) => {
        res.status(200).send("Website running...");
    });
    router.get('/api', (req, res) => {
        res.status(200).send("API running...");
    });
    router.get('/status', (req, res) => {
        res.status(200).json({ "healthy": true });
    });
    router.use('/api/v1', require('./api/user')(express));
    router.use('/api/v1', require('./api/app')(express));
    return router;
}