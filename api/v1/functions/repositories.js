const call = require('../big_query/create_query')

module.exports = (_req, res, next) => {
  const sqlQuery = 'SELECT repo_name, watch_count FROM `bigquery-public-data.github_repos.sample_repos`'

  call(sqlQuery, res.locals.paginationConfig, next)
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
