const { BigQuery } = require('@google-cloud/bigquery')
const bigquery     = new BigQuery()

module.exports = (_req, res, next) => {
  call()
    .then(data => {
      res.locals.data = data
      next()
    })
    .catch(err => {
      res.locals.notification = 'Error al conectarse con BigQuery'
      next(err)
    })
}

call = async () => (
  bigquery.createQueryJob('SELECT repo_name FROM `bigquery-public-data.github_repos.sample_repos` LIMIT 10').then((data) => {
    const job         = data[0]
    const apiResponse = data[1]
    console.log(apiResponse)

    console.log(`Job ${job.id} started.`)
    
    return job.getQueryResults().then((data) => {
      console.log(data)
      return data[0]
    })
  })
)
