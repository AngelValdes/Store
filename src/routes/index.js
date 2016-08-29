module.exports = (express) => {
  const router = express.Router();
  // main website routes
  router.get('/', (req, res) => {
    res.status(200).send('Website ' + global.package.name + ' running...'
    + process.env.ENV_NAME + ' version ' + global.package.version);
  });
  router.get('/api', (req, res) => {
    res.status(200).send('API running...' + global.package.name + ' running...'
          + process.env.ENV_NAME + ' version ' + global.package.version);
  });
  router.get('/status', (req, res) => {
    res.status(200).json({ healthy: true });
  });
  // add API routes with prefix
  router.use('/api/v1', require('./api/user')(express));
  router.use('/api/v1', require('./api/app')(express));

  return router;
};
