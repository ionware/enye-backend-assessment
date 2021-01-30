const router = require('express').Router();
const { getRates } = require('../controller');
const adapter = require('../core/express-adapter');

router.get('/', adapter(getRates));

module.exports = router;
