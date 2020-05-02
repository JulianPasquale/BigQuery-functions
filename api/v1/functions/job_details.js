/**
 * Requires function to get job details from BigQuery API.
 */
const getJob = require('../../../big_query/get_job')

/**
 * Sets data and metadata with relevant info from BigQuery job details.
 */
module.exports = (req, res, next) => (
  getJob(req.params.id)
    .then((data) => {
      const { metadata, ...dataResult } = data[0]

      res.locals.data     = dataResult
      res.locals.metadata = metadata
      next()
    })
    .catch(next)
)
