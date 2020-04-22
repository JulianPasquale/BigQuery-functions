const express = require('express')
const repositories  = require('./functions/repositories')
const router  = express.Router()

// Handlers.
const success   = require('./handlers/success')
const error     = require('./handlers/exception')
const not_found = require('./handlers/not_found')

// Routes.
router.get('/repositories', repositories, success)
router.get('/err', (req, res, next) => next(next(new Error('custom'))))

// #####################################################

router.get(
  '/job/:id',
  (req, res, next) => {
    const {BigQuery} = require('@google-cloud/bigquery')
    const bigquery = new BigQuery()

    jobId = req.params.id

    const job = bigquery.job(jobId)

    job.get()
      .then((data) => {
        console.log(data)
        res.locals.data = data[0]
        next()
      })
      .catch(next)
  }, success
)
// #####################################################


// Handles 404.
router.use(not_found)

// Handles all errors.
router.use(error)

module.exports = router
