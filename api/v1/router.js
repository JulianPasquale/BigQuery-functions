const express = require('express')
const search  = require('./functions/search')
const router  = express.Router()

// Handlers.
const success   = require('./handlers/success')
const error     = require('./handlers/exception')
const not_found = require('./handlers/not_found')

// Routes.
router.get('/search', search, success)
router.get('/err', (req, res, next) => next(next(new Error('custom'))))

// Handles 404.
router.use(not_found)

// Handles all errors.
router.use(error)

module.exports = router
