const router = require('express').Router();

const baseApi = '/api/v1';

router.use(baseApi, require('./users'))
router.use(baseApi, require('./auth'))
router.use(baseApi, require('./courses'))

module.exports = router;