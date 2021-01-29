const router = require('express').Router();

router.get('/', (req, res) => res.json({ result: { base: 'USD' } }));

module.exports = router;
