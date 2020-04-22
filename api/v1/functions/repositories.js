const { BigQuery } = require('@google-cloud/bigquery')
const bigquery     = new BigQuery()

module.exports = (_req, res, next) => {
  call(next)
    .then(response => {
      res.locals.data     = response.data
      res.locals.metadata = response.metadata
      next()
    })
    .catch(err => {
      res.locals.notification = 'Error al conectarse con BigQuery'
      next(err)
    })
}

call = async (next) => (
  bigquery.createQueryJob('SELECT repo_name FROM `bigquery-public-data.github_repos.sample_repos`')
    .then((data) => {
      const job         = data[0]
      const apiResponse = data[1]
      console.log(apiResponse)

      console.log(`Job ${job.id} started.`)
      
      return results(job, next)
    })
    .catch(next)
)

results = (job, next) => (
  job.getQueryResults(
    {
      maxResults: 10,
      pageToken:  'BGXNRONDOEAQAAASA4EAAEEAQCAAKGQEBAFBACRAWCXBK==='
    }
  ).then((data) => {
    console.log(data)

    return {
      data: data[0],
      metadata: {
        pagination: {
          pageToken: data[1].pageToken,
          totalRows: data[2].totalRows
        }
      }
    }
  }).catch(next)
)
