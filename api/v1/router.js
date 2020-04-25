/**
 * Gets router intance from express.
 */
const { Router } = require('express')
const router     = Router()

/**
 * Functions that works as handlers for a specific route request.
 * If functions handle a regular http request, it will receive req, res and next parameters.
 * For additional documentation check here: https://expressjs.com/en/guide/routing.html
 */
const repositories    = require('./functions/repositories')
const vulnerable_rank = require('./functions/vulnerable_rank')
const job_details     = require('./functions/job_details')

/**
 * Handlers functions for different status.
 * Their purpose is to format previous middlewares results and build a standard JSON response.
 */
const success   = require('./handlers/success')
const not_found = require('./handlers/not_found')

/**
 * This is a error handler middleware. It will receive all non catched expections.
 * For more details about error handling check: https://expressjs.com/en/guide/error-handling.html
 */
const error = require('./handlers/exception')

/**
 * Custom middleware that sets meta information for BigQuery jobs from request parameters, such as pagination data.
 */
const job_config = require('./middlewares/job_config')

/**
 * Application routes, scoped to /api/v1 path.
 * First parameter refers to the scoped route, and the next ones are middlewares that will be executed and set locals for use in next middlewares.
 */
router.get('/repositories', job_config, repositories, success)
router.get('/vulnerable_ranking', job_config, vulnerable_rank, success)

/**
 * Only debug purpose for test handlers format.
 */
router.get('/job/:id', job_details, success)
router.get('/err', (req, res, next) => next(next(new Error('custom'))))

/** 
 * Middleware to handle http 404 errors.
 * If execution reachs this Middleware, it means that previous handlers raises an expection or requested route is not valid.
 * This middleware adds a notification and forward an expection to global handler to be formated.
 */
router.use(not_found)

/**
 * Handles all errors. Receives exceptions and returns a standard JSON format.
 * If none of the handlers returns an http response, this middleware will be executed.
 */
router.use(error)

/**
 * Exports router to app.
 */
module.exports = router
