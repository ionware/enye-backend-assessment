/**
 * This is where all routes components are bundled together
 * under a generic namespace. (by Resources)
 */
const router = require('express').Router();
const rates = require('./rates');

router.use('/rates', rates);

module.exports = router;
