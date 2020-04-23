const {BigQuery} = require('@google-cloud/bigquery')

module.exports = (jobId) => (
  new BigQuery().job(jobId).get()
)
