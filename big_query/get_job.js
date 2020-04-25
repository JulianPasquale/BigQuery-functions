/**
 * Get an instance of BigQuery client.
 */
const { BigQuery } = require('@google-cloud/bigquery')
const biquery      = new BigQuery()

/**
 * Returns a job from BigQuery API.
 * Docs: https://googleapis.dev/nodejs/bigquery/latest/Job.html#get
 */
module.exports = (jobId) => biquery.job(jobId).get()
