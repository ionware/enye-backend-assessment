const router = require('express').Router();
const { getRates } = require('../controller/rates');
const adapter = require('../core/express-adapter');

router.get('/', adapter(getRates));

module.exports = router;
