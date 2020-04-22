const { BigQuery } = require('@google-cloud/bigquery')
const bigquery     = new BigQuery()

module.exports = (_req, res, next) => {
  call(next)
    .then(data => {
      res.locals.data = data
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
      pageToken:  'BH3WSKU7OEAQAAASA4EAAEEAQCAAKGQEBAKBACRAWCXBK==='
    }
  ).then((data) => {
    console.log(data)
    return data[0]
  }).catch(next)
)
