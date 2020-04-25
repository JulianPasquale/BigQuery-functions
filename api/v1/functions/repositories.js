/**
 * Function to create a query job. This job will be resolved by BigQuery and return our query rows.
 */
const call = require('../../../big_query/create_query')

const sqlQuery = 'SELECT repo_name, watch_count FROM `bigquery-public-data.github_repos.sample_repos`'

/**
 * Calls create_query function with sqlQuery.
 * Then sets data and metadata to be formated and returned.
 */
module.exports = (_req, res, next) => {
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
