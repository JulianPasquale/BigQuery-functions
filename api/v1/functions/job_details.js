module.exports = (req, res, next) => {
  const {BigQuery} = require('@google-cloud/bigquery')
  const bigquery = new BigQuery()

  jobId = req.params.id

  const job = bigquery.job(jobId)

  job.get()
    .then((data) => {
      const { metadata, ...dataResult } = data[0]

      res.locals.data     = dataResult
      res.locals.metadata = metadata
      next()
    })
    .catch(next)
}
