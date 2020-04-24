let { Router } = require('express')

// Functions
const repositories = require('./functions/repositories')

// Handlers.
// const success   = require('./handlers/success')
const error     = require('./handlers/exception')
const not_found = require('./handlers/not_found')

// Middlewares.
// const job_config = require('./middlewares/job_config')

// Routes.
const router = Router()

// router.get('/repositories', job_config, repositories, success)
router.ws('/echo', function(ws, req) {
  ws.send(['mundo'])

  ws.on('message', (msg) => {
    // Broadcast msg from 1 to all clients.
    wss.getWss().clients.forEach((client) => 
      client.send(msg.data)
    )
  })
})

// Only debug purpose
router.get('/err', (req, res, next) => next(next(new Error('custom'))))

// Handles 404.
router.use(not_found)

// Handles all errors.
router.use(error)

module.exports = router
