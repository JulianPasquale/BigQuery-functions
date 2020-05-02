/**
 * Gets router intance from express.
 */
let { Router } = require('express')
const router   = Router()

/**
 * Handlers functions for different status.
 * Their purpose is to format previous middlewares results and build a standard JSON response.
 */
const not_found = require('./handlers/not_found')

/**
 * This is a error handler middleware. It will receive all non catched expections.
 * For more details about error handling check: https://expressjs.com/en/guide/error-handling.html
 */
const error = require('./handlers/exception')

/**
 * Functions that works as handlers for a specific route request.
 * If is a web socket route handler, it will receive two parameters: ws and req
 * express-ws documentation: https://github.com/HenningM/express-ws
 * Create a new function and require it like this.
 */
const repositories = require('./functions/repositories')
const covid_19     = require('./functions/covid_19')

/**
 * Defining routes for /api/v2 scope.
 * To add a new route using web sockets you have to use ws router's method.
 * First parameter refers to the expected path to handle, and the second is the function to execute on every request.
 */
router.ws('/repositories', repositories)
router.ws('/covid_19', covid_19)


/**
 * Handlers for not found routes or errors. Similar than API V1
 */
router.use(not_found)
router.use(error)

/**
 * Exports router to app.
 */
module.exports = router
