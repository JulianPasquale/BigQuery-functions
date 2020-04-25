/**
 * Gets router intance from express.
 */
let { Router } = require('express')
const router   = Router()

/**
 * Functions that works as handlers for a specific route request.
 * If is a web socket route handler, it will receive two parameters: ws and req
 * express-ws documentation: https://github.com/HenningM/express-ws
 * Create a new function and require it like this.
 */
const samples = require('./functions/repositories')

/**
 * Defining routes for /api/v2 scope.
 * To add a new route using web sockets you have to use ws router's method.
 * First parameter refers to the expected path to handle, and the second is the function to execute on every request.
 */
router.ws('/samples', samples)

/**
 * Exports router to app.
 */
module.exports = router
