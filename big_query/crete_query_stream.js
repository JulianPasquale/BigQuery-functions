const { BigQuery } = require('@google-cloud/bigquery')
const bigquery     = new BigQuery()

module.exports = (sqlQuery, dataHandler) => (
  bigquery.createQueryStream(sqlQuery)
    .on('data',  dataHandler)
    .on('error', console.error)
)
