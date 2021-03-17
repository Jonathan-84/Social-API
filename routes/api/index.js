const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtsRoutes = require('./thoughts-routes');

//add prefix of `/user` to routes created in `user-routes.js`
router.use('/user', userRoutes);

//add prefix of `/thoughts` to routes created in `thought-routes.js`
router.use('/thoughts', thoughtsRoutes);

module.exports = router;