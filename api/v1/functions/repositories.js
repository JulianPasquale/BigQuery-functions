/**
 * Function to create a query job. This job will be resolved by BigQuery and return our query rows.
 */
const call = require('../../../big_query/create_query')

/**
 * Generates SQL query and call create_query function.
 * Then sets data and metadata to be formated and returned.
 */
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
