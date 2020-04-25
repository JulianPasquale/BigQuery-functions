/**
 * Get an instance of BigQuery client.
 */
const { BigQuery } = require('@google-cloud/bigquery')
const bigquery     = new BigQuery()

/**
 * Returns a ResourceStream object.
 * This intance could be used for end stream and avoid more API requests.
 * dataHandler callback will be executed for each query result row.
 */
module.exports = (sqlQuery, dataHandler) => (
  bigquery.createQueryStream(sqlQuery)
    .on('data',  dataHandler)
    .on('error', console.error)
)
