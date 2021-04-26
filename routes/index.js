const router = require('express').Router()

router.use('/api', require('./userRoutes.js'))
router.use('/api', require('./postRoutes.js'))
router.use('/api', require('./addressRoutes.js'))
router.use('/api', require('./cartRoutes.js'))
router.use('/api', require('./orderRoutes.js'))

module.exports = router