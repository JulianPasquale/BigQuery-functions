const { BigQuery } = require('@google-cloud/bigquery')

module.exports = async (sqlQuery, paginationConfig) => (
  new BigQuery().createQueryJob(sqlQuery)
    .then((data) => {
      const job         = data[0]
      const apiResponse = data[1]
      console.log(apiResponse)

      console.log(`Job ${job.id} started.`)
      
      return results(job, paginationConfig, next)
    })
    // .catch(next)
)

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
    // .catch(next)
)
