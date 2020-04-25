/**
 * Gets an instance of BigQuery client.
 */
const { BigQuery } = require('@google-cloud/bigquery')
const bigquery     = new BigQuery()

/**
 * Documentation for creates query jobs from BigQuery client:
 * https://googleapis.dev/nodejs/bigquery/latest/BigQuery.html#createQueryJob
 */

module.exports = (sqlQuery, paginationConfig, next) => (
  /**
   * createQueryJob method returns a Promise.
   * In case of error, expection will be passed to default error handler.
   */
  bigquery.createQueryJob(sqlQuery)
    .then((data) => {
      const job = data[0]

      console.log(`Job ${job.id} started.`)

      /**
       * Returns object with data and metadata if query results could be retrieved.
       */
      return results(job, paginationConfig, next)
    })
    .catch(next)
)

/**
 * Sets data and metadada from query results or send expection to default error handler.
 * getQueryResults function returns a Promise.
 * Docs: https://googleapis.dev/nodejs/bigquery/latest/Job.html#getQueryResults.
 */
const results = (job, paginationConfig, next) => (
  job.getQueryResults(paginationConfig)
    .then((data) => (
      {
        data:     data[0],
        metadata: {
          pagination: {
            pageToken: (data[1] || {}).pageToken,
            totalRows: data[2].totalRows
          }
        }
      }
    ))
    .catch(next)
)
