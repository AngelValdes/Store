module.exports = (express) => {
  const router = express.Router();
  // main website routes
  router.get('/', (req, res) => {
      res.status(200).send('Website running in ... ' + process.env.ENV_NAME);
  });
  router.get('/api', (req, res) => {
      res.status(200).send('API running in ... ' + process.env.ENV_NAME);
  });
  router.get('/status', (req, res) => {
    res.status(200).json({ healthy: true });
  });
  // add API routes with prefix
  router.use('/api/v1', require('./api/user')(express));
  router.use('/api/v1', require('./api/app')(express));

  return router;
};
