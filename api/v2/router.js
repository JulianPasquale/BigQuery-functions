let { Router } = require('express')

// Functions
const samples = require('./functions/samples')

// Handlers.
// const success   = require('./handlers/success')
const error     = require('./handlers/exception')
const not_found = require('./handlers/not_found')

// Middlewares.
// const job_config = require('./middlewares/job_config')

// Routes.
const router = Router()

router.ws('/samples', samples)

// Only debug purpose
router.get('/err', (req, res, next) => next(next(new Error('custom'))))

// Handles 404.
router.use(not_found)

// Handles all errors.
router.use(error)

module.exports = router
